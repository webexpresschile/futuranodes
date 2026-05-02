import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, AlertCircle } from "lucide-react";
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

const baseSchema = z.object({
  nombre: z.string().min(2, "Por favor ingresa un nombre válido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(8, "Teléfono inválido"),
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
    if (!selectedSector) return;

    setIsLoading(true);

    const payload = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      sector: selectedSector,
      ...dynamicFields,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Webhook payload:", payload);

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

  const fieldVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  const renderDynamicFields = () => {
    if (!selectedSector) return null;

    switch (selectedSector) {
      case "Servicios":
        return (
          <motion.div key="servicios" variants={fieldVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de servicio</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("tipoServicio", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-tipo-servicio">
                  <SelectValue placeholder="Selecciona tu tipo de servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultoria">Consultoría</SelectItem>
                  <SelectItem value="coaching">Coaching</SelectItem>
                  <SelectItem value="asesoria">Asesoría legal/fiscal</SelectItem>
                  <SelectItem value="diseno">Diseño</SelectItem>
                  <SelectItem value="desarrollo">Desarrollo web</SelectItem>
                  <SelectItem value="capacitacion">Capacitación</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes nuevos que necesitas/mes</Label>
              <Input type="number" min="1" placeholder="Ej: 5" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} data-testid="input-clientes-nuevos" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-presupuesto">
                  <SelectValue placeholder="Selecciona tu presupuesto aproximado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300-500">$300-500</SelectItem>
                  <SelectItem value="500-1000">$500-1,000</SelectItem>
                  <SelectItem value="1000-2000">$1,000-2,000</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "E-commerce":
        return (
          <motion.div key="ecommerce" variants={fieldVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de producto</Label>
              <Input type="text" placeholder="Ej: Ropa, electrónica, accesorios, etc" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("tipoProducto", e.target.value)} data-testid="input-tipo-producto" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ventas necesarias/mes</Label>
              <Input type="number" min="1" placeholder="Ej: 20" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ventasNecesarias", e.target.value)} data-testid="input-ventas" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ticket promedio ($)</Label>
              <Input type="number" min="1" placeholder="Ej: 50" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ticketPromedio", e.target.value)} data-testid="input-ticket" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-presupuesto">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">$500-1,000</SelectItem>
                  <SelectItem value="1000-2000">$1,000-2,000</SelectItem>
                  <SelectItem value="2000+">$2,000+</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "Local":
        return (
          <motion.div key="local" variants={fieldVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de negocio</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("tipoNegocio", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-tipo-negocio">
                  <SelectValue placeholder="Selecciona tu tipo de negocio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salon">Salón de belleza</SelectItem>
                  <SelectItem value="gym">Gym/Academia</SelectItem>
                  <SelectItem value="restaurante">Restaurante/Café</SelectItem>
                  <SelectItem value="consultorio">Consultorio</SelectItem>
                  <SelectItem value="tienda">Tienda física</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ubicación (Ciudad/Comuna)</Label>
              <Input type="text" placeholder="Ej: Santiago Centro" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ubicacion", e.target.value)} data-testid="input-ubicacion" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes nuevos que necesitas/mes</Label>
              <Input type="number" min="1" placeholder="Ej: 10" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} data-testid="input-clientes" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-presupuesto">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200-500">$200-500</SelectItem>
                  <SelectItem value="500-1000">$500-1,000</SelectItem>
                  <SelectItem value="1000+">$1,000+</SelectItem>
                  <SelectItem value="no-se">Aún no sé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case "Otro":
        return (
          <motion.div key="otro" variants={fieldVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Describe tu negocio</Label>
              <Textarea placeholder="Cuéntame brevemente qué vendes o qué servicio ofreces" maxLength={500} className="rounded border-gray-300 min-h-[100px]" onChange={(e) => handleDynamicFieldChange("descripcion", e.target.value)} data-testid="textarea-descripcion" />
              <p className="text-xs text-[#6B6B6B] mt-1">Máximo 500 caracteres</p>
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes/ventas necesarios/mes</Label>
              <Input type="number" min="1" placeholder="Ej: 8" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesVentas", e.target.value)} data-testid="input-clientes-ventas" />
            </div>
            <div>
              <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
              <Select onValueChange={(value) => handleDynamicFieldChange("presupuesto", value)}>
                <SelectTrigger className="w-full rounded border-gray-300" data-testid="select-presupuesto">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-definido">No definido</SelectItem>
                  <SelectItem value="200-500">$200-500</SelectItem>
                  <SelectItem value="500-1000">$500-1,000</SelectItem>
                  <SelectItem value="1000+">$1,000+</SelectItem>
                  <SelectItem value="5000+">$5,000+</SelectItem>
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
    <section id="formulario" className="py-20 md:py-32 px-6 md:px-12 bg-[#F6F6F4]" data-testid="form-section">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-[#241C15] mb-4">
            Cuéntame más para crear tu propuesta personalizada
          </h2>
          <p className="font-sans text-[#6B6B6B]">
            Solo llena esto y te contactamos en las próximas 24 horas
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 md:p-10 rounded-lg shadow-md"
          data-testid="lead-form"
        >
          {/* Base fields */}
          <div className="space-y-5 mb-6">
            <div>
              <Label htmlFor="nombre" className="text-[#241C15] font-medium mb-2 block font-sans">
                Nombre completo
              </Label>
              <Input
                type="text"
                id="nombre"
                placeholder="Tu nombre completo"
                className={`rounded border-gray-300 ${errors.nombre ? "border-red-500" : ""}`}
                {...register("nombre")}
                data-testid="input-nombre"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1 font-sans">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-[#241C15] font-medium mb-2 block font-sans">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="tu@email.com"
                className={`rounded border-gray-300 ${errors.email ? "border-red-500" : ""}`}
                {...register("email")}
                data-testid="input-email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-sans">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telefono" className="text-[#241C15] font-medium mb-2 block font-sans">
                Teléfono
              </Label>
              <Input
                type="tel"
                id="telefono"
                placeholder="+56 9 1234 5678"
                className={`rounded border-gray-300 ${errors.telefono ? "border-red-500" : ""}`}
                {...register("telefono")}
                data-testid="input-telefono"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1 font-sans">{errors.telefono.message}</p>
              )}
            </div>
          </div>

          {/* Sector indicator */}
          {selectedSector ? (
            <div className="mb-6 p-4 bg-[#007C89]/10 border border-[#007C89]/20 rounded">
              <p className="text-sm text-[#007C89] font-medium font-sans">
                Sector seleccionado: <span className="font-bold">{selectedSector}</span>
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-[#FFE01B]/30 border border-[#FFE01B] rounded flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#241C15] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#241C15] font-sans" data-testid="sector-warning">
                Por favor, selecciona tu tipo de negocio arriba para continuar
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
              className="w-full bg-[#241C15] text-white py-4 text-lg font-semibold rounded hover:bg-[#3D3D3D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              data-testid="submit-button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </span>
              ) : (
                "Enviar mi información"
              )}
            </Button>
          </div>

          {/* Privacy note */}
          <p className="text-center text-sm text-[#6B6B6B] mt-4 flex items-center justify-center gap-2 font-sans">
            <Lock className="w-4 h-4" />
            Tu información es privada y segura. No compartimos datos con terceros.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default FormSection;
