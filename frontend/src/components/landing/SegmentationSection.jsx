import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, MapPin, HelpCircle, Check } from "lucide-react";

const sectors = [
  {
    id: "Servicios",
    icon: Briefcase,
    title: "Servicios profesionales",
    description: "Consultoría, coaching, asesoría, desarrollo",
  },
  {
    id: "E-commerce",
    icon: ShoppingBag,
    title: "E-commerce / Productos",
    description: "Tienda online, productos físicos o digitales",
  },
  {
    id: "Local",
    icon: MapPin,
    title: "Servicios locales",
    description: "Negocio con ubicación física",
  },
  {
    id: "Otro",
    icon: HelpCircle,
    title: "Otro",
    description: "Mi negocio es diferente",
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
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const SegmentationSection = ({ selectedSector, onSectorSelect }) => {
  return (
    <section 
      id="segmentacion"
      className="py-20 md:py-32 px-6 md:px-12 bg-[#F6F6F4]"
      data-testid="segmentation-section"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#241C15] mb-4"
            data-testid="segmentation-headline"
          >
            Primero, cuéntame
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#6B6B6B]">
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
                className={`relative p-6 md:p-8 text-left bg-white rounded-lg transition-all duration-200 group ${
                  isSelected 
                    ? "ring-2 ring-[#007C89] shadow-md" 
                    : "shadow-sm hover:shadow-md hover:-translate-y-1"
                }`}
                data-testid={`segment-card-${sector.id.toLowerCase()}`}
              >
                {/* Checkmark indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-[#007C89] rounded-full flex items-center justify-center"
                    data-testid={`segment-check-${sector.id.toLowerCase()}`}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200 ${
                  isSelected ? "bg-[#007C89]" : "bg-[#F6F6F4] group-hover:bg-[#FFE01B]"
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-200 ${
                    isSelected ? "text-white" : "text-[#241C15]"
                  }`} />
                </div>

                {/* Content */}
                <h3 className={`font-serif font-semibold text-lg mb-2 transition-colors duration-200 ${
                  isSelected ? "text-[#007C89]" : "text-[#241C15]"
                }`}>
                  {sector.title}
                </h3>
                <p className="font-sans text-sm text-[#6B6B6B]">
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
            className="text-center mt-8 font-sans text-[#007C89] font-medium"
          >
            Perfecto, ahora llena el formulario para tu propuesta personalizada
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default SegmentationSection;
