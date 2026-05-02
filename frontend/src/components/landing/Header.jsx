import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-[#1F2937]/5 shadow-sm" 
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="/" 
            className="font-outfit font-bold text-xl md:text-2xl tracking-tight text-[#1F2937] hover:text-[#10B981] transition-colors"
            data-testid="logo"
          >
            FUTURA NODES
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#segmentacion" 
              className="font-dm-sans text-sm text-[#4B5563] hover:text-[#1F2937] transition-colors"
            >
              Servicios
            </a>
            <a 
              href="#formulario" 
              className="font-dm-sans text-sm text-[#4B5563] hover:text-[#1F2937] transition-colors"
            >
              Contacto
            </a>
          </nav>

          <a
            href="#formulario"
            className="bg-[#10B981] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#059669] transition-colors"
            data-testid="header-cta"
          >
            Empezar
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
