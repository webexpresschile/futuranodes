import { motion } from "framer-motion";
import { Globe, TrendingDown, Users } from "lucide-react";

const problems = [
  {
    id: 1,
    icon: Globe,
    title: "Tienes web pero no trae clientes",
    description: "Tu página existe, pero nadie la encuentra. Es como un cartel en medio del desierto.",
  },
  {
    id: 2,
    icon: TrendingDown,
    title: "Intentaste Meta Ads pero no funcionó",
    description: "Gastaste dinero en publicidad, pero los resultados fueron decepcionantes.",
  },
  {
    id: 3,
    icon: Users,
    title: "Dependes del boca a boca",
    description: "Tus clientes llegan por recomendación, pero el crecimiento es lento e impredecible.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProblemsSection = () => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-white"
      data-testid="problems-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter text-[#1F2937] mb-4"
            data-testid="problems-headline"
          >
            Probablemente uno de estos es tu problema actual:
          </h2>
          <p className="font-dm-sans text-lg text-[#4B5563] max-w-2xl mx-auto">
            No te preocupes, todos tienen solución
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            
            return (
              <motion.div
                key={problem.id}
                variants={cardVariants}
                className="relative p-8 border border-[#1F2937]/10 bg-white group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                data-testid={`problem-card-${problem.id}`}
              >
                {/* X indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold text-lg">✕</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1F2937]/5 transition-colors">
                  <Icon className="w-7 h-7 text-[#1F2937]" />
                </div>

                {/* Content */}
                <h3 className="font-outfit font-semibold text-xl text-[#1F2937] mb-3">
                  {problem.title}
                </h3>
                <p className="font-dm-sans text-[#4B5563] leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
