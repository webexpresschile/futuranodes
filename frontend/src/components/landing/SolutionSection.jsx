import { motion } from "framer-motion";
import { Target, GitBranch, MessageCircle } from "lucide-react";

const solutions = [
  {
    id: 1,
    number: "1",
    icon: Target,
    title: "Meta Ads inteligentes",
    description: "Tráfico cualificado dirigido a personas que REALMENTE necesitan tu solución. No desperdicias dinero en clics irrelevantes.",
    color: "#007C89",
  },
  {
    id: 2,
    number: "2",
    icon: GitBranch,
    title: "Funnels optimizados",
    description: "Formularios que convierten. Capturamos datos, clasificamos y calificamos leads automáticamente. Sin esfuerzo tuyo.",
    color: "#241C15",
  },
  {
    id: 3,
    number: "3",
    icon: MessageCircle,
    title: "WhatsApp automático",
    description: "Respuestas instantáneas. IA que dialoga con tus leads mientras tú duermes. Contacto 24/7 sin que hagas nada.",
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

const SolutionSection = () => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-[#FFE01B]"
      data-testid="solution-section"
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
            Entonces, ¿cuál es la solución?
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#241C15]/80">
            Un sistema que trae clientes automáticamente
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                variants={cardVariants}
                className="bg-white p-8 rounded-lg shadow-md text-center"
                data-testid={`solution-card-${solution.id}`}
              >
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${solution.color}15` }}
                >
                  <span 
                    className="font-serif font-bold text-3xl"
                    style={{ color: solution.color }}
                  >
                    {solution.number}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#241C15] mb-3">
                  {solution.title}
                </h3>
                <p className="font-sans text-[#6B6B6B] leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
