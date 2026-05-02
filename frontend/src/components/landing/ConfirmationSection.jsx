import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const WHATSAPP_NUMBER = "56973027813";

const ConfirmationSection = ({ name }) => {
  const whatsappMessage = encodeURIComponent(`Hola ${name}, vi Futura Nodes`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20"
      data-testid="confirmation-section"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-14 h-14 text-[#10B981]" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter text-[#1F2937] mb-4"
          data-testid="confirmation-headline"
        >
          ¡Perfecto, {name}!
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-dm-sans text-lg md:text-xl text-[#4B5563] mb-10"
          data-testid="confirmation-message"
        >
          En 60 segundos recibirás un mensaje en WhatsApp con tu diagnóstico personalizado
        </motion.p>

        {/* WhatsApp button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 text-lg font-medium hover:bg-[#128C7E] transition-all duration-300 w-full md:w-auto"
            data-testid="whatsapp-button"
          >
            <MessageCircle className="w-6 h-6" />
            Abrir WhatsApp
          </a>

          {/* Fallback */}
          <div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#4B5563] hover:text-[#1F2937] transition-colors text-sm"
              data-testid="whatsapp-fallback"
            >
              <RefreshCw className="w-4 h-4" />
              ¿No recibes? Presiona aquí
            </a>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 p-6 bg-[#F9FAFB] border border-[#1F2937]/5"
        >
          <h3 className="font-outfit font-semibold text-[#1F2937] mb-2">
            ¿Qué sigue?
          </h3>
          <ul className="font-dm-sans text-[#4B5563] text-sm space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold">1.</span>
              Recibirás tu diagnóstico por WhatsApp
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold">2.</span>
              Analizaremos tu caso específico
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold">3.</span>
              Te enviaremos una propuesta personalizada
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConfirmationSection;
