import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, RefreshCw, Check } from "lucide-react";

const WHATSAPP_NUMBER = "56973027813";

const nextSteps = [
  "Un diagnóstico rápido de tu situación",
  "Las 3 razones por las que NO traes clientes",
  "Tu próximo paso (sin compromiso de nada)",
];

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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="font-sans text-lg text-[#241C15]/80 mb-6"
        >
          Tu información fue recibida.
        </motion.p>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white/50 backdrop-blur-sm p-6 rounded-lg mb-8"
        >
          <p className="font-sans text-[#241C15] mb-4">
            En los próximos 60 segundos recibirás un mensaje en WhatsApp con:
          </p>
          <ul className="space-y-2 text-left max-w-sm mx-auto">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#007C89] rounded flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="font-sans text-[#241C15]">{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

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
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#241C15]/70 hover:text-[#241C15] transition-colors text-sm font-sans"
              data-testid="whatsapp-fallback"
            >
              <RefreshCw className="w-4 h-4" />
              ¿No recibes el mensaje? Presiona aquí para iniciar chat directamente
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConfirmationSection;
