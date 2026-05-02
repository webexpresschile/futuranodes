import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, RefreshCw, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "56973027813";

const ConfirmationSection = ({ name }) => {
  const whatsappMessage = encodeURIComponent(`Hola ${name}, vi Futura Nodes`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 bg-[#FFE01B]"
      data-testid="confirmation-section"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 400 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-[#007C89] rounded-lg flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#241C15] mb-4"
          data-testid="confirmation-headline"
        >
          Perfecto, {name}!
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="font-sans text-lg md:text-xl text-[#241C15] mb-10"
          data-testid="confirmation-message"
        >
          En 60 segundos recibirás un mensaje en WhatsApp con tu diagnóstico personalizado
        </motion.p>

        {/* WhatsApp button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="space-y-4"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#007C89] text-white px-8 py-4 text-lg font-semibold rounded hover:bg-[#005F69] transition-all duration-200 w-full md:w-auto shadow-md"
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
              className="inline-flex items-center justify-center gap-2 text-[#241C15] hover:text-[#007C89] transition-colors text-sm font-sans"
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
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-12 p-6 bg-white rounded-lg shadow-sm text-left"
        >
          <h3 className="font-serif font-semibold text-[#241C15] mb-4 text-lg">
            ¿Qué sigue?
          </h3>
          <ul className="font-sans text-[#6B6B6B] space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <span>Recibirás tu diagnóstico por WhatsApp</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <span>Analizaremos tu caso específico</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <span>Te enviaremos una propuesta personalizada</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConfirmationSection;
