const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-12 px-6 md:px-12 bg-[#241C15] text-white"
      data-testid="footer"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a 
              href="/" 
              className="font-serif font-semibold text-xl hover:text-[#FFE01B] transition-colors"
            >
              Futura Nodes
            </a>
            <p className="font-sans text-sm text-gray-400 mt-1">
              Tráfico que convierte
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#segmentacion" 
              className="font-sans text-gray-400 hover:text-white transition-colors"
            >
              Servicios
            </a>
            <a 
              href="#formulario" 
              className="font-sans text-gray-400 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-sans text-sm text-gray-400">
              © {currentYear} Futura Nodes. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
