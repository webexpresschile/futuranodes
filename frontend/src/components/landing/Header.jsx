import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm" 
          : "bg-[#FFE01B]/90 backdrop-blur-sm"
      }`}
      data-testid="header"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="/" 
            className="font-serif font-semibold text-xl md:text-2xl text-[#241C15] hover:opacity-80 transition-opacity"
            data-testid="logo"
          >
            Futura Nodes
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#segmentacion" 
              className="font-sans text-sm font-medium text-[#241C15] hover:text-[#007C89] transition-colors"
            >
              Servicios
            </a>
            <a 
              href="#formulario" 
              className="font-sans text-sm font-medium text-[#241C15] hover:text-[#007C89] transition-colors"
            >
              Contacto
            </a>
          </nav>

          <button
            onClick={onCtaClick}
            className="bg-[#241C15] text-white px-5 py-2.5 text-sm font-semibold rounded hover:bg-[#3D3D3D] transition-colors"
            data-testid="header-cta"
          >
            Empezar
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
