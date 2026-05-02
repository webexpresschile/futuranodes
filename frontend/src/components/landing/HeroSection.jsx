import { motion } from "framer-motion";
import { ArrowDown, Store, Users } from "lucide-react";

const HeroSection = ({ onCtaClick }) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 md:pb-32 px-6 md:px-12 bg-[#FFE01B]"
      data-testid="hero-section"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Headline */}
          <h1 
            className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#241C15] leading-[1.1] mb-6 max-w-4xl mx-auto"
            data-testid="hero-headline"
          >
            Te dijeron que con tener una web mejorarían tus ventas?
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl text-[#241C15] mb-8"
            data-testid="hero-subheadline"
          >
            Pues te mintieron.
          </motion.p>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-sans text-lg md:text-xl text-[#241C15] max-w-2xl mx-auto mb-10 leading-relaxed"
            data-testid="hero-description"
          >
            Una página web sin tráfico es como abrir una tienda en una calle donde no hay personas. 
            Lo ideal sería cambiarse de calle... pero{" "}
            <span className="font-semibold">¿y si te traemos a las personas?</span>
          </motion.p>

          {/* Visual metaphor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-6 md:gap-10 mb-12"
            data-testid="hero-visual"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/60 rounded-lg flex items-center justify-center shadow-sm">
                <Store className="w-10 h-10 md:w-12 md:h-12 text-[#6B6B6B]" />
              </div>
              <span className="text-sm text-[#3D3D3D] mt-3 font-sans">Tienda vacía</span>
            </div>
            
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl md:text-4xl text-[#241C15]"
            >
              <ArrowDown className="w-8 h-8 rotate-[-90deg]" />
            </motion.div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#007C89] rounded-lg flex items-center justify-center shadow-sm relative">
                <Store className="w-10 h-10 md:w-12 md:h-12 text-white" />
                <motion.div 
                  className="absolute -right-2 -top-2 bg-white rounded-full p-1 shadow-sm"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#007C89]" />
                </motion.div>
              </div>
              <span className="text-sm text-[#241C15] font-semibold mt-3 font-sans">Tienda llena</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <button
              onClick={onCtaClick}
              className="group bg-[#241C15] text-white px-8 py-4 text-lg font-semibold rounded hover:bg-[#3D3D3D] transition-all duration-200 inline-flex items-center gap-3"
              data-testid="hero-cta-button"
            >
              Quiero mis clientes
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
