import { useEffect, useRef } from "react";

const HEX = "#FFE01B";
const RGB = { r: 1, g: 0.878, b: 0.106 };

const vertexSrc = `
  precision highp float;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentSrc = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uNoiseIntensity;
  uniform float uRotation;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // Apply rotation around center
    float angle = uRotation * 3.14159 / 180.0;
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float s = sin(angle);
    float c = cos(angle);
    uv = vec2(delta.x * c - delta.y * s + center.x, delta.x * s + delta.y * c + center.y);

    // Time-based flow
    float t = uTime * uSpeed * 0.08;

    // Two layers of flowing noise for variation
    vec2 p1 = uv * uScale * 2.5 + vec2(t * 0.4, t * 0.3);
    vec2 p2 = uv * uScale * 1.8 + vec2(t * -0.25, t * 0.18) + vec2(10.0);

    float n1 = fbm(p1);
    float n2 = fbm(p2);

    float combined = (n1 * 0.6 + n2 * 0.4);

    // More dramatic contrast with noiseIntensity
    float variation = 0.6 + 0.4 * combined;
    variation = mix(0.7, variation, uNoiseIntensity * 0.6);

    // Color with visible variation
    vec3 color = uColor * variation;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const compileShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

const Silk = ({ speed = 5, scale = 1, color = HEX, noiseIntensity = 1.5, rotation = 0 }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const progRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("Silk: WebGL not available");
      return;
    }
    glRef.current = gl;

    // Compile shaders
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Silk: Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);
    progRef.current = program;

    // Full screen quad (triangle strip)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "uTime");
    const uColor = gl.getUniformLocation(program, "uColor");
    const uSpeed = gl.getUniformLocation(program, "uSpeed");
    const uScale = gl.getUniformLocation(program, "uScale");
    const uNoiseIntensity = gl.getUniformLocation(program, "uNoiseIntensity");
    const uRotation = gl.getUniformLocation(program, "uRotation");

    // Set uniforms once
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    gl.uniform3f(uColor, r, g, b);
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uNoiseIntensity, noiseIntensity);
    gl.uniform1f(uRotation, rotation);

    // Resize using ResizeObserver for reliability
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    // Also call once directly in case ResizeObserver fires late
    resize();

    // Force resize again after a frame to catch any layout edge case
    requestAnimationFrame(() => resize());

    // Animation loop
    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [speed, scale, noiseIntensity, rotation, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Silk;
