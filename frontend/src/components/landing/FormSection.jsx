import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

// Validation schema
const baseSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  telefono: z.string().min(8, "Ingresa un número de teléfono válido"),
});

const WEBHOOK_URL = "https://tu-n8n-instance.com/webhook/futura-nodes-lead";

const FormSection = ({ selectedSector, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(baseSchema),
  });

  const handleDynamicFieldChange = (field, value) => {
    setDynamicFields(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (data) => {
    if (!selectedSector) {
      return;
    }

    setIsLoading(true);

    const payload = {
      ...data,
      sector: selectedSector,
      ...dynamicFields,
      timestamp: new Date().toISOString(),
    };

    try {
      // Mock webhook call with timeout (placeholder URL)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful submission
          console.log("Webhook payload:", payload);
          resolve();
        }, 1500);
      });

      // Also try real webhook if available
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
      } catch (e) {
        console.log("Webhook fallback:", e);
      }

      onSubmitSuccess(data.nombre);
      reset();
      setDynamicFields({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic fields based on sector
  const renderDynamicFields = () => {
    if (!selectedSector) return null;

    switch (selectedSector) {
      case "Servicios":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="tipoServicio" className="text-[#1F2937] font-medium mb-2 block">
                Tipo de servicio
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("tipoServicio", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-tipo-servicio">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultoria">Consultoría</SelectItem>
                  <SelectItem value="coaching">Coaching</SelectItem>
                  <SelectItem value="asesoria">Asesoría</SelectItem>
                  <SelectItem value="diseno">Diseño</SelectItem>
                  <SelectItem value="desarrollo">Desarrollo</SelectItem>
                  <SelectItem value="capacitacion">Capacitación</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="clientesNuevos" className="text-[#1F2937] font-medium mb-2 block">
                ¿Cuántos clientes nuevos quieres al mes?
              </Label>
              <Input
                type="number"
                id="clientesNuevos"
                placeholder="Ej: 10"
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)}
                data-testid="input-clientes-nuevos"
              />
            </div>

            <div>
              <Label htmlFor="presupuesto" className="text-[#1F2937] font-medium mb-2 block">
                Presupuesto mensual
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-presupuesto-servicios">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300-500">$300 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "E-commerce":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="tipoProducto" className="text-[#1F2937] font-medium mb-2 block">
                Tipo de producto
              </Label>
              <Input
                type="text"
                id="tipoProducto"
                placeholder="Ej: Ropa, electrónica, artesanías..."
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("tipoProducto", e.target.value)}
                data-testid="input-tipo-producto"
              />
            </div>

            <div>
              <Label htmlFor="ventasMes" className="text-[#1F2937] font-medium mb-2 block">
                Ventas por mes
              </Label>
              <Input
                type="number"
                id="ventasMes"
                placeholder="Número de ventas"
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("ventasMes", e.target.value)}
                data-testid="input-ventas-mes"
              />
            </div>

            <div>
              <Label htmlFor="ticketPromedio" className="text-[#1F2937] font-medium mb-2 block">
                Ticket promedio ($)
              </Label>
              <Input
                type="number"
                id="ticketPromedio"
                placeholder="Ej: 50"
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("ticketPromedio", e.target.value)}
                data-testid="input-ticket-promedio"
              />
            </div>

            <div>
              <Label htmlFor="presupuesto" className="text-[#1F2937] font-medium mb-2 block">
                Presupuesto mensual
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-presupuesto-ecommerce">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                  <SelectItem value="2000+">$2,000+</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "Local":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="tipoNegocio" className="text-[#1F2937] font-medium mb-2 block">
                Tipo de negocio
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("tipoNegocio", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-tipo-negocio">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salon">Salón de belleza</SelectItem>
                  <SelectItem value="gym">Gimnasio</SelectItem>
                  <SelectItem value="restaurante">Restaurante</SelectItem>
                  <SelectItem value="consultorio">Consultorio</SelectItem>
                  <SelectItem value="tienda">Tienda física</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ubicacion" className="text-[#1F2937] font-medium mb-2 block">
                Ubicación (ciudad/zona)
              </Label>
              <Input
                type="text"
                id="ubicacion"
                placeholder="Ej: Santiago Centro, Providencia..."
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("ubicacion", e.target.value)}
                data-testid="input-ubicacion"
              />
            </div>

            <div>
              <Label htmlFor="clientesMes" className="text-[#1F2937] font-medium mb-2 block">
                Clientes por mes
              </Label>
              <Input
                type="number"
                id="clientesMes"
                placeholder="Número de clientes"
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("clientesMes", e.target.value)}
                data-testid="input-clientes-mes"
              />
            </div>

            <div>
              <Label htmlFor="presupuesto" className="text-[#1F2937] font-medium mb-2 block">
                Presupuesto mensual
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-presupuesto-local">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000+">$1,000+</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "Otro":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="descripcion" className="text-[#1F2937] font-medium mb-2 block">
                Describe tu negocio
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Cuéntanos sobre tu negocio, qué haces, a quién ayudas..."
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981] min-h-[100px]"
                onChange={(e) => handleDynamicFieldChange("descripcion", e.target.value)}
                data-testid="textarea-descripcion"
              />
            </div>

            <div>
              <Label htmlFor="clientesVentas" className="text-[#1F2937] font-medium mb-2 block">
                Clientes/ventas por mes
              </Label>
              <Input
                type="number"
                id="clientesVentas"
                placeholder="Número aproximado"
                className="border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]"
                onChange={(e) => handleDynamicFieldChange("clientesVentas", e.target.value)}
                data-testid="input-clientes-ventas"
              />
            </div>

            <div>
              <Label htmlFor="presupuesto" className="text-[#1F2937] font-medium mb-2 block">
                Presupuesto mensual
              </Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981]" data-testid="select-presupuesto-otro">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-definido">No definido</SelectItem>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000+">$1,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="formulario"
      className="py-20 md:py-32 px-6 md:px-12 bg-[#F9FAFB]"
      data-testid="form-section"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 
            className="font-outfit font-bold text-3xl md:text-4xl tracking-tighter text-[#1F2937] mb-4"
            data-testid="form-headline"
          >
            Cuéntame más para crear tu propuesta personalizada
          </h2>
          <p className="font-dm-sans text-[#4B5563]">
            Completa el formulario y recibirás tu diagnóstico en segundos
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 md:p-10 border border-[#1F2937]/10 shadow-xl"
          data-testid="lead-form"
        >
          {/* Base fields */}
          <div className="space-y-6 mb-8">
            <div>
              <Label htmlFor="nombre" className="text-[#1F2937] font-medium mb-2 block">
                Nombre *
              </Label>
              <Input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                className={`border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981] ${
                  errors.nombre ? "border-red-500" : ""
                }`}
                {...register("nombre")}
                data-testid="input-nombre"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1" data-testid="error-nombre">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-[#1F2937] font-medium mb-2 block">
                Email *
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="tu@email.com"
                className={`border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981] ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
                data-testid="input-email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1" data-testid="error-email">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="telefono" className="text-[#1F2937] font-medium mb-2 block">
                Teléfono *
              </Label>
              <Input
                type="tel"
                id="telefono"
                placeholder="+56 9 1234 5678"
                className={`border-[#1F2937]/20 focus:border-[#10B981] focus:ring-[#10B981] ${
                  errors.telefono ? "border-red-500" : ""
                }`}
                {...register("telefono")}
                data-testid="input-telefono"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1" data-testid="error-telefono">
                  {errors.telefono.message}
                </p>
              )}
            </div>
          </div>

          {/* Sector indicator */}
          {selectedSector ? (
            <div className="mb-6 p-4 bg-[#10B981]/5 border border-[#10B981]/20 rounded">
              <p className="text-sm text-[#10B981] font-medium">
                Sector seleccionado: <span className="font-bold">{selectedSector}</span>
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-700" data-testid="sector-warning">
                ⚠️ Por favor, selecciona tu tipo de negocio arriba para continuar
              </p>
            </div>
          )}

          {/* Dynamic fields */}
          <AnimatePresence mode="wait">
            {renderDynamicFields()}
          </AnimatePresence>

          {/* Submit button */}
          <div className="mt-8">
            <Button
              type="submit"
              disabled={isLoading || !selectedSector}
              className="w-full bg-[#1F2937] text-white py-4 text-lg font-medium hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              data-testid="submit-button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </span>
              ) : (
                "Enviar mi información"
              )}
            </Button>
          </div>

          {/* Privacy note */}
          <p className="text-center text-sm text-[#6B7280] mt-4 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Tu información es privada y segura
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default FormSection;
