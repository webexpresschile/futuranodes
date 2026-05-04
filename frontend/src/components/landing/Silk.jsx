const Silk = ({ color = "#FFE01B" }) => {
  // Lighter and darker variations
  const light = "#FFF3A3";
  const dark = "#E6C800";

  return (
    <>
      <style>{`
        @keyframes silkFlow {
          0% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          25% {
            background-position: 100% 0%;
            background-size: 250% 250%;
          }
          50% {
            background-position: 50% 100%;
            background-size: 180% 180%;
          }
          75% {
            background-position: 0% 0%;
            background-size: 220% 220%;
          }
          100% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, ${light} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${dark} 0%, transparent 40%),
            radial-gradient(ellipse at 60% 80%, ${light}88 0%, transparent 50%),
            radial-gradient(ellipse at 40% 30%, ${dark}44 0%, transparent 40%),
            ${color}
          `,
          backgroundSize: "200% 200%",
          animation: "silkFlow 8s ease-in-out infinite alternate",
        }}
      />
    </>
  );
};

export default Silk;
