const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-12 px-6 md:px-12 bg-[#F6F6F4] border-t border-[#E5E7EB]"
      data-testid="footer"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a 
              href="/" 
              className="font-serif font-semibold text-xl text-[#241C15] hover:text-[#007C89] transition-colors"
            >
              Futura Nodes
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#" 
              className="font-sans text-[#6B6B6B] hover:text-[#241C15] transition-colors"
            >
              Política de privacidad
            </a>
            <a 
              href="#" 
              className="font-sans text-[#6B6B6B] hover:text-[#241C15] transition-colors"
            >
              Términos de servicio
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-sans text-sm text-[#6B6B6B]">
              © {currentYear} Futura Nodes. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
