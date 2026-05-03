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

  // Simple 2D noise
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
    float aspect = 16.0 / 9.0;
    uv.x *= aspect;
    
    // Apply rotation
    float angle = uRotation * 3.14159 / 180.0;
    vec2 center = vec2(aspect * 0.5, 0.5);
    vec2 delta = uv - center;
    float s = sin(angle);
    float c = cos(angle);
    uv = vec2(delta.x * c - delta.y * s + center.x, delta.x * s + delta.y * c + center.y);
    
    // Time-based flow
    float t = uTime * uSpeed * 0.1;
    
    // Two layers of flowing noise
    vec2 p1 = uv * uScale * 2.0 + vec2(t * 0.3, t * 0.2);
    vec2 p2 = uv * uScale * 1.5 + vec2(t * -0.2, t * 0.15) + vec2(10.0);
    
    float n1 = fbm(p1);
    float n2 = fbm(p2);
    
    float combined = (n1 * 0.7 + n2 * 0.3);
    combined = combined * uNoiseIntensity + (1.0 - uNoiseIntensity) * 0.5;
    
    // Color with intensity variation
    vec3 color = uColor * (0.85 + 0.15 * combined);
    
    // Slight darkening at edges
    float edge = 1.0 - length(vUv - 0.5) * 0.4;
    color *= edge;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const Silk = ({ speed = 5, scale = 1, color = HEX, noiseIntensity = 1.5, rotation = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexSrc);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentSrc);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full screen quad
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

    gl.uniform3f(uColor, RGB.r, RGB.g, RGB.b);
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uNoiseIntensity, noiseIntensity);
    gl.uniform1f(uRotation, rotation);

    // Resize handler
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation loop
    let startTime = performance.now();
    let animId;

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
    };
  }, [speed, scale, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Silk;
