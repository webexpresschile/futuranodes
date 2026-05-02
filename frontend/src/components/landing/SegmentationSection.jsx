import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, MapPin, HelpCircle, Check } from "lucide-react";

const sectors = [
  {
    id: "Servicios",
    icon: Briefcase,
    title: "Servicios Profesionales",
    description: "Consultoría, coaching, asesoría, desarrollo",
    emoji: "💼",
  },
  {
    id: "E-commerce",
    icon: ShoppingBag,
    title: "E-commerce / Productos",
    description: "Tienda online, productos físicos o digitales",
    emoji: "🛍️",
  },
  {
    id: "Local",
    icon: MapPin,
    title: "Servicios Locales",
    description: "Negocio con ubicación física",
    emoji: "📍",
  },
  {
    id: "Otro",
    icon: HelpCircle,
    title: "Otro",
    description: "Mi negocio es diferente",
    emoji: "❓",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SegmentationSection = ({ selectedSector, onSectorSelect }) => {
  return (
    <section 
      id="segmentacion"
      className="py-20 md:py-32 px-6 md:px-12 bg-[#F9FAFB]"
      data-testid="segmentation-section"
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
            data-testid="segmentation-headline"
          >
            Primero, cuéntame:
          </h2>
          <p className="font-dm-sans text-lg md:text-xl text-[#4B5563]">
            ¿Qué describe mejor tu negocio?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sectors.map((sector) => {
            const isSelected = selectedSector === sector.id;
            const Icon = sector.icon;
            
            return (
              <motion.button
                key={sector.id}
                variants={cardVariants}
                onClick={() => onSectorSelect(sector.id)}
                className={`relative p-8 text-left border bg-white transition-all duration-300 group ${
                  isSelected 
                    ? "border-[#10B981] ring-2 ring-[#10B981] bg-[#10B981]/5" 
                    : "border-[#1F2937]/10 hover:border-[#10B981]/50 hover:-translate-y-1 hover:shadow-lg"
                }`}
                data-testid={`segment-card-${sector.id.toLowerCase()}`}
              >
                {/* Checkmark indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center"
                    data-testid={`segment-check-${sector.id.toLowerCase()}`}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Emoji/Icon */}
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  isSelected ? "bg-[#10B981]/20" : "bg-[#F3F4F6] group-hover:bg-[#10B981]/10"
                }`}>
                  <span className="text-2xl">{sector.emoji}</span>
                </div>

                {/* Content */}
                <h3 className={`font-outfit font-semibold text-lg mb-2 transition-colors ${
                  isSelected ? "text-[#10B981]" : "text-[#1F2937]"
                }`}>
                  {sector.title}
                </h3>
                <p className="font-dm-sans text-sm text-[#4B5563]">
                  {sector.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {selectedSector && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 font-dm-sans text-[#10B981] font-medium"
          >
            ¡Perfecto! Ahora llena el formulario para tu propuesta personalizada ↓
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default SegmentationSection;
