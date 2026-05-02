import { motion } from "framer-motion";
import { Globe, TrendingDown, Users, X } from "lucide-react";

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
    title: "Intentaste Meta Ads pero 'no funcionó'",
    description: "Gastaste dinero, obtuviste pocos resultados, y no sabes qué salió mal.",
  },
  {
    id: 3,
    icon: Users,
    title: "Dependes del boca a boca o referencias",
    description: "Tus clientes llegan por recomendación, pero es inconsistente e impredecible.",
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

const ProblemsSection = () => {
  return (
    <section 
      className="py-20 md:py-32 px-6 md:px-12 bg-white"
      data-testid="problems-section"
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
            Probablemente uno (o varios) de estos es tu problema actual
          </h2>
          <p className="font-sans text-lg text-[#6B6B6B] max-w-xl mx-auto">
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
                className="relative p-6 md:p-8 bg-[#F6F6F4] rounded-lg border-l-4 border-[#FCA5A5] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                data-testid={`problem-card-${problem.id}`}
              >
                {/* X indicator */}
                <div className="absolute top-5 right-5 w-7 h-7 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6 text-[#241C15]" />
                </div>

                {/* Content */}
                <h3 className="font-serif font-semibold text-xl text-[#241C15] mb-3 pr-8">
                  {problem.title}
                </h3>
                <p className="font-sans text-[#6B6B6B] leading-relaxed">
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
