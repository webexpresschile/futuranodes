import { motion } from "framer-motion";
import { Check, DollarSign, ShieldCheck } from "lucide-react";

const features = [
  "Setup completo Meta Ads",
  "Creación landing + funnel",
  "Integración WhatsApp con IA",
  "Google Sheets CRM",
  "Calendario + Calendly integrado",
  "Soporte vía WhatsApp",
  "Reportes semanales de resultados",
  "Optimizaciones primeras 2 semanas",
];

const requirements = [
  "Vende servicios o productos",
  "Tiene presupuesto para invertir",
  "Quiere un sistema, no 'suerte'",
];

const PricingSection = ({ onCtaClick }) => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-white"
      data-testid="pricing-section"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#241C15] mb-4">
            Un precio justo para resultados reales
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#6B6B6B]">
            Mira exactamente qué incluye
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#F6F6F4] rounded-lg p-8 md:p-10 border-2 border-[#007C89]"
            data-testid="pricing-card"
          >
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-8 h-8 text-[#007C89]" />
                <span className="font-serif font-bold text-5xl md:text-6xl text-[#241C15]">
                  545
                </span>
                <span className="font-sans text-lg text-[#6B6B6B]">USD / mes</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <p className="font-sans font-semibold text-[#241C15] mb-4">INCLUYE:</p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-sans text-[#241C15]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra costs */}
            <div className="mb-8 p-4 bg-white rounded-lg">
              <p className="font-sans font-semibold text-[#241C15] mb-2">GASTOS EXTRAS:</p>
              <p className="font-sans text-sm text-[#6B6B6B]">
                + Meta Ads (mínimo recomendado)
              </p>
              <p className="font-sans text-[#241C15] font-medium">
                $300-500/mes (tú controlas)
              </p>
            </div>

            {/* Guarantee */}
            <div className="mb-8 p-4 bg-[#007C89]/10 rounded-lg flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#007C89] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-sans font-semibold text-[#241C15] mb-1">GARANTÍA:</p>
                <p className="font-sans text-sm text-[#6B6B6B]">
                  Si en 30 días no tienes leads de calidad, ajustamos la estrategia SIN COSTO ADICIONAL
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onCtaClick}
              className="w-full bg-[#FFE01B] text-[#241C15] py-4 text-lg font-semibold rounded hover:bg-[#F5D000] transition-colors duration-200"
              data-testid="pricing-cta"
            >
              Quiero comenzar
            </button>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <p className="font-serif font-semibold text-xl text-[#007C89] mb-6">
              "Pagar $545 es GRATIS si cierras 1 cliente"
            </p>

            <div className="bg-[#F6F6F4] p-6 rounded-lg text-left">
              <p className="font-sans font-semibold text-[#241C15] mb-3">
                Esto es para empresarios serios. Si tu negocio:
              </p>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#007C89]" />
                    <span className="font-sans text-[#6B6B6B]">{req}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[#241C15] font-medium mt-4">
                Entonces podemos hablar.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
