import { motion } from "framer-motion";
import { ArrowDown, Store, Users } from "lucide-react";

const HeroSection = ({ onCtaClick }) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#10B981]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1F2937]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Headline */}
          <h1 
            className="font-outfit font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[#1F2937] leading-[1.1] mb-6"
            data-testid="hero-headline"
          >
            Te dijeron que con tener una web{" "}
            <span className="relative inline-block">
              mejorarían tus ventas
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 150 2 298 6" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            ?
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-[#1F2937] mb-8"
            data-testid="hero-subheadline"
          >
            Pues te mintieron.
          </motion.p>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-dm-sans text-lg md:text-xl text-[#4B5563] max-w-3xl mx-auto mb-10 leading-relaxed"
            data-testid="hero-description"
          >
            Una página web sin tráfico es como abrir una tienda en una calle donde no hay personas. 
            Lo ideal sería cambiarse de calle... pero{" "}
            <span className="text-[#10B981] font-semibold">¿y si te traemos a las personas?</span>
          </motion.p>

          {/* Visual metaphor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-4 md:gap-8 mb-12"
            data-testid="hero-visual"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                <Store className="w-8 h-8 md:w-10 md:h-10 text-[#9CA3AF]" />
              </div>
              <span className="text-xs md:text-sm text-[#9CA3AF] mt-2">Tienda vacía</span>
            </div>
            
            <div className="flex items-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl md:text-3xl"
              >
                →
              </motion.div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#10B981]/10 rounded-lg flex items-center justify-center relative">
                <Store className="w-8 h-8 md:w-10 md:h-10 text-[#10B981]" />
                <motion.div 
                  className="absolute -right-2 -top-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]" />
                </motion.div>
              </div>
              <span className="text-xs md:text-sm text-[#10B981] font-medium mt-2">Tienda llena</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button
              onClick={onCtaClick}
              className="group bg-[#1F2937] text-white px-8 py-4 text-lg font-medium hover:bg-[#374151] transition-all duration-300 inline-flex items-center gap-3"
              data-testid="hero-cta-button"
            >
              Quiero mis clientes
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
