import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-12 px-6 md:px-12 bg-[#1F2937] text-white"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a 
              href="/" 
              className="font-outfit font-bold text-xl tracking-tight hover:text-[#10B981] transition-colors"
            >
              FUTURA NODES
            </a>
            <p className="font-dm-sans text-sm text-gray-400 mt-1">
              Tráfico que convierte
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#segmentacion" 
              className="font-dm-sans text-gray-400 hover:text-white transition-colors"
            >
              Servicios
            </a>
            <a 
              href="#formulario" 
              className="font-dm-sans text-gray-400 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-dm-sans text-sm text-gray-400">
              © {currentYear} Futura Nodes. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
