import { motion } from "framer-motion";
import { Users, MessageCircle, Clock } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: Users,
    number: "15+",
    metric: "Leads/mes",
    description: "Con presupuesto bajo ($30-50)",
    detail: "Costo promedio: $2-3 por lead",
    color: "#007C89",
  },
  {
    id: 2,
    icon: MessageCircle,
    number: "40%",
    metric: "Tasa de respuesta WhatsApp",
    description: "Vs 5% de industria promedio",
    detail: "Leads que abren el mensaje automático",
    color: "#241C15",
  },
  {
    id: 3,
    icon: Clock,
    number: "6-8h",
    metric: "Desde lead hasta primer contacto",
    description: "100% automático, sin intervención manual",
    detail: "Respuesta inmediata vía WhatsApp",
    color: "#007C89",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SocialProofSection = () => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-[#F6F6F4]"
      data-testid="social-proof-section"
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
            Esto ya está funcionando
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#6B6B6B]">
            Aquí van los números reales
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-t-4"
                style={{ borderTopColor: metric.color }}
                data-testid={`metric-card-${metric.id}`}
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <p 
                    className="font-serif font-bold text-5xl md:text-6xl mb-2"
                    style={{ color: metric.color }}
                  >
                    {metric.number}
                  </p>
                  <h3 className="font-serif font-semibold text-lg text-[#241C15] mb-2">
                    {metric.metric}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B] mb-3">
                    {metric.description}
                  </p>
                  <span className="font-sans text-xs text-[#6B6B6B] bg-[#F6F6F4] px-3 py-1 rounded-full">
                    {metric.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
