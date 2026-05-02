import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import SegmentationSection from "../components/landing/SegmentationSection";
import ProblemsSection from "../components/landing/ProblemsSection";
import FormSection from "../components/landing/FormSection";
import ConfirmationSection from "../components/landing/ConfirmationSection";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
    // Scroll to form after short delay
    setTimeout(() => {
      scrollToForm();
    }, 300);
  };

  const handleFormSubmit = (name) => {
    setSubmittedName(name);
    setIsSubmitted(true);
    toast.success("Formulario enviado correctamente");
    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Header />
      
      <main>
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ConfirmationSection name={submittedName} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSection onCtaClick={scrollToForm} />
              <SegmentationSection 
                selectedSector={selectedSector} 
                onSectorSelect={handleSectorSelect} 
              />
              <ProblemsSection />
              <div ref={formRef}>
                <FormSection 
                  selectedSector={selectedSector}
                  onSubmitSuccess={handleFormSubmit}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
