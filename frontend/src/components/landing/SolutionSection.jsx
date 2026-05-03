import { motion } from "framer-motion";
import { Target, GitBranch, MessageCircle } from "lucide-react";

const solutions = [
  {
    id: 1,
    icon: Target,
    title: "Meta Ads inteligentes",
    description: "Tráfico cualificado dirigido a personas que REALMENTE necesitan tu solución. No desperdicias dinero en clics irrelevantes.",
    color: "#007C89",
  },
  {
    id: 2,
    icon: GitBranch,
    title: "Funnels optimizados",
    description: "Formularios que convierten. Capturamos datos, clasificamos y calificamos leads automáticamente. Sin esfuerzo tuyo.",
    color: "#241C15",
  },
  {
    id: 3,
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
    transition: { staggerChildren: 0.2 },
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#241C15] text-[#FFE01B] text-xs font-semibold font-sans uppercase tracking-widest rounded-full mb-4">
            El metodo
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#241C15] mb-4 leading-tight">
            Entonces, <span className="text-[#007C89]">¿cuál es la solución?</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#241C15]/70">
            Un sistema que trae clientes automáticamente
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-5"
        >
          {/* Row 1: Meta Ads (1/2) + Funnels (1/2) */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* Card 1 — Meta Ads — larger */}
            <motion.div
              variants={cardVariants}
              className="flex-1 md:w-1/2 bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              data-testid="solution-card-1"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${solutions[0].color}12` }}
                >
                  <Target className="w-8 h-8 md:w-10 md:h-10" style={{ color: solutions[0].color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm"
                      style={{ backgroundColor: solutions[0].color, color: "white" }}
                    >
                      1
                    </span>
                    <h3 className="font-serif font-semibold text-xl md:text-2xl text-[#241C15]">
                      {solutions[0].title}
                    </h3>
                  </div>
                  <p className="font-sans text-[#6B6B6B] leading-relaxed text-base md:text-lg">
                    {solutions[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Funnels — smaller */}
            <motion.div
              variants={cardVariants}
              className="md:w-1/2 bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              data-testid="solution-card-2"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${solutions[1].color}12` }}
              >
                <GitBranch className="w-6 h-6" style={{ color: solutions[1].color }} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="w-6 h-6 rounded-md flex items-center justify-center font-serif font-bold text-xs"
                  style={{ backgroundColor: solutions[1].color, color: "white" }}
                >
                  2
                </span>
                <h3 className="font-serif font-semibold text-lg text-[#241C15]">
                  {solutions[1].title}
                </h3>
              </div>
              <p className="font-sans text-[#6B6B6B] leading-relaxed text-sm">
                {solutions[1].description}
              </p>
            </motion.div>
          </div>

          {/* Row 2: WhatsApp — full width */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            data-testid="solution-card-3"
          >
            <div className="flex flex-col md:flex-row items-start gap-5 md:gap-8">
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${solutions[2].color}12` }}
              >
                <MessageCircle className="w-7 h-7 md:w-8 md:h-8" style={{ color: solutions[2].color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-serif font-bold text-xs"
                    style={{ backgroundColor: solutions[2].color, color: "white" }}
                  >
                    3
                  </span>
                  <h3 className="font-serif font-semibold text-xl md:text-2xl text-[#241C15]">
                    {solutions[2].title}
                  </h3>
                </div>
                <p className="font-sans text-[#6B6B6B] leading-relaxed text-base md:text-lg">
                  {solutions[2].description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
