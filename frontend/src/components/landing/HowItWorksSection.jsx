import { motion } from "framer-motion";
import { Smartphone, Target, Bot, MessageSquare, ArrowDown } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Smartphone,
    title: "Tráfico",
    subtitle: "Meta Ads",
    description: "Mostramos tu anuncio a personas de tu target",
    time: "Inmediato",
  },
  {
    id: 2,
    icon: Target,
    title: "Captura",
    subtitle: "Landing",
    description: "Validan su email + teléfono + información",
    time: "5-10 seg",
  },
  {
    id: 3,
    icon: Bot,
    title: "Clasificación",
    subtitle: "IA Deepseek",
    description: "Analiza el lead, asigna score, genera mensaje personalizado",
    time: "2-3 min",
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Conversión",
    subtitle: "WhatsApp",
    description: "Contacto automático + agenda tu llamada de consulta",
    time: "24 horas",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HowItWorksSection = () => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-white"
      data-testid="how-it-works-section"
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
            ¿Cómo funciona exactamente?
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#6B6B6B]">
            Un proceso de 4 pasos que se ejecuta automáticamente
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:flex items-start justify-between relative"
        >
          {/* Connection line */}
          <div className="absolute top-16 left-[12%] right-[12%] h-0.5 bg-[#E5E7EB]" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="flex flex-col items-center text-center w-1/4 relative z-10"
                data-testid={`step-${step.id}`}
              >
                <div className="w-32 h-32 bg-[#F6F6F4] rounded-lg flex flex-col items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-10 h-10 text-[#007C89] mb-2" />
                  <span className="font-sans text-xs text-[#6B6B6B]">{step.subtitle}</span>
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#241C15] mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#6B6B6B] mb-2 px-2">
                  {step.description}
                </p>
                <span className="font-sans text-xs text-[#007C89] font-medium bg-[#007C89]/10 px-3 py-1 rounded-full">
                  {step.time}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile: Vertical flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:hidden space-y-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.id} variants={stepVariants}>
                <div 
                  className="flex items-start gap-4 p-6 bg-[#F6F6F4] rounded-lg"
                  data-testid={`step-mobile-${step.id}`}
                >
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-7 h-7 text-[#007C89]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif font-semibold text-lg text-[#241C15]">
                        {step.title}
                      </h3>
                      <span className="font-sans text-xs text-[#007C89] font-medium bg-[#007C89]/10 px-2 py-0.5 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-[#6B6B6B]">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-5 h-5 text-[#007C89]" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
