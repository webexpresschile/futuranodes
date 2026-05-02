import { motion } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";

const benefits = [
  "Podemos ayudarte",
  "Tu negocio es un buen fit para nosotros",
  "Tiene sentido que hablemos",
];

const CtaFinalSection = ({ onCtaClick }) => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-[#FFE01B]"
      data-testid="cta-final-section"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#241C15] mb-4">
            ¿Listo para traer clientes automáticamente?
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#241C15]/80 mb-8">
            Sin depender del boca a boca, sin estrés
          </p>

          <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-lg mb-8">
            <p className="font-sans text-[#241C15] mb-4">
              Abajo va un formulario corto. En 60 segundos vamos a saber si:
            </p>
            <ul className="space-y-2 mb-6 text-left max-w-xs mx-auto">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-sans text-[#241C15]">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="font-sans text-sm text-[#241C15]/70 italic">
              "Si eres dueño de un negocio que genera dinero, pero nadie sabe que existe... entonces sigue leyendo."
            </p>
          </div>

          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-[#241C15] text-white px-10 py-5 text-xl font-semibold rounded hover:bg-[#3D3D3D] transition-all duration-200 inline-flex items-center gap-3 shadow-lg"
            data-testid="cta-final-button"
          >
            Sí, quiero mis clientes
            <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaFinalSection;
