import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  Lock,
  Briefcase,
  ShoppingBag,
  MapPin,
  HelpCircle,
} from "lucide-react";
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

const sectors = [
  {
    id: "Servicios",
    icon: Briefcase,
    title: "Servicios profesionales",
    description: "Consultoria, coaching, asesoria, desarrollo",
  },
  {
    id: "E-commerce",
    icon: ShoppingBag,
    title: "E-commerce / Productos",
    description: "Tienda online, productos fisicos o digitales",
  },
  {
    id: "Local",
    icon: MapPin,
    title: "Servicios locales",
    description: "Negocio con ubicacion fisica",
  },
  {
    id: "Otro",
    icon: HelpCircle,
    title: "Otro",
    description: "Mi negocio es diferente",
  },
];

const baseSchema = z.object({
  nombre: z.string().min(2, "Por favor ingresa un nombre valido"),
  email: z.string().email("Email invalido"),
  telefono: z.string().min(8, "Telefono invalido"),
});

const WEBHOOK_URL = "https://tu-n8n-instance.com/webhook/futura-nodes-lead";

const FormSection = ({ selectedSector, onSectorSelect, onSubmitSuccess }) => {
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
    setDynamicFields((prev) => ({ ...prev, [field]: value }));
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

  const renderDynamicFields = () => {
    if (!selectedSector) return null;

    const fields = {
      Servicios: (
        <div className="space-y-5">
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de servicio</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("tipoServicio", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu tipo de servicio" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="consultoria">Consultoria</SelectItem>
                <SelectItem value="coaching">Coaching</SelectItem>
                <SelectItem value="asesoria">Asesoria legal/fiscal</SelectItem>
                <SelectItem value="diseno">Diseno</SelectItem>
                <SelectItem value="desarrollo">Desarrollo web</SelectItem>
                <SelectItem value="capacitacion">Capacitacion</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes nuevos/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 5" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="300-500">$300-500</SelectItem>
                <SelectItem value="500-1000">$500-1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000-2,000</SelectItem>
                <SelectItem value="no-se">Aun no se</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      "E-commerce": (
        <div className="space-y-5">
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de producto</Label>
            <Input type="text" placeholder="Ej: Ropa, electronica, accesorios" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("tipoProducto", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ventas necesarias/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 20" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("ventasNecesarias", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ticket promedio ($)</Label>
            <Input type="number" min="1" placeholder="Ej: 50" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("ticketPromedio", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="500-1000">$500-1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000-2,000</SelectItem>
                <SelectItem value="2000+">$2,000+</SelectItem>
                <SelectItem value="no-se">Aun no se</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      Local: (
        <div className="space-y-5">
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Tipo de negocio</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("tipoNegocio", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu tipo de negocio" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="salon">Salon de belleza</SelectItem>
                <SelectItem value="gym">Gym/Academia</SelectItem>
                <SelectItem value="restaurante">Restaurante/Cafe</SelectItem>
                <SelectItem value="consultorio">Consultorio</SelectItem>
                <SelectItem value="tienda">Tienda fisica</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ubicacion (Ciudad/Comuna)</Label>
            <Input type="text" placeholder="Ej: Santiago Centro" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("ubicacion", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes nuevos/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 10" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="200-500">$200-500</SelectItem>
                <SelectItem value="500-1000">$500-1,000</SelectItem>
                <SelectItem value="1000+">$1,000+</SelectItem>
                <SelectItem value="no-se">Aun no se</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      Otro: (
        <div className="space-y-5">
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Describe tu negocio</Label>
            <Textarea placeholder="Cuentame brevemente que vendes o que servicio ofreces" maxLength={500} className="rounded-lg border-gray-200 min-h-[100px]" onChange={(e) => handleDynamicFieldChange("descripcion", e.target.value)} />
            <p className="text-xs text-[#6B6B6B] mt-1">Maximo 500 caracteres</p>
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes/ventas necesarios/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 8" className="rounded-lg border-gray-200" onChange={(e) => handleDynamicFieldChange("clientesVentas", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="no-definido">No definido</SelectItem>
                <SelectItem value="200-500">$200-500</SelectItem>
                <SelectItem value="500-1000">$500-1,000</SelectItem>
                <SelectItem value="1000+">$1,000+</SelectItem>
                <SelectItem value="5000+">$5,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    };

    return fields[selectedSector] || null;
  };

  return (
    <section id="formulario" className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#FFE01B] text-[#241C15] text-xs font-semibold font-sans uppercase tracking-widest rounded-full mb-4">
            Formulario
          </span>
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-[#241C15] mb-4 leading-tight">
            Cuentame mas para crear tu <span className="text-[#007C89]">propuesta personalizada</span>
          </h2>
          <p className="font-sans text-[#6B6B6B] text-lg">
            Selecciona tu tipo de negocio y completa tus datos
          </p>
        </motion.div>

        {/* Bento Grid: Sector Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
          {sectors.map((sector) => {
            const isSelected = selectedSector === sector.id;
            const Icon = sector.icon;
            return (
              <button
                type="button"
                key={sector.id}
                onClick={() => onSectorSelect(sector.id)}
                className={[
                  "relative text-left transition-all duration-300 group",
                  "p-6 rounded-2xl",
                  "border-2",
                  isSelected
                    ? "bg-[#1A1A1A] border-[#FFE01B] shadow-lg scale-[1.02] ring-2 ring-[#FFE01B]/30"
                    : "bg-[#1A1A1A] border-[#333333] hover:border-[#FFE01B]/50 hover:shadow-lg hover:scale-[1.01]"
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className={[
                    "w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300",
                    isSelected
                      ? "bg-[#FFE01B] text-[#1A1A1A]"
                      : "bg-[#FFE01B]/20 text-[#FFE01B] group-hover:bg-[#FFE01B]/30"
                  ].join(" ")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={[
                      "font-serif font-semibold text-base transition-colors",
                      isSelected ? "text-white" : "text-white"
                    ].join(" ")}>
                      {sector.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-1 group-hover:text-white/70 transition-colors">{sector.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[#FFE01B] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#F8F8F6] rounded-2xl p-8 md:p-10 border border-gray-100"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* BASE FIELDS */}
            <div className="space-y-6 mb-6">
              <div>
                <Label htmlFor="nombre" className="text-[#241C15] font-medium mb-2 block font-sans">Nombre completo</Label>
                <Input type="text" id="nombre" placeholder="Tu nombre completo" className={"rounded-xl border-gray-200 bg-white " + (errors.nombre ? " border-red-400" : "")} {...register("nombre")} />
                {errors.nombre && <p className="text-red-500 text-sm mt-1 font-sans">{errors.nombre.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email" className="text-[#241C15] font-medium mb-2 block font-sans">Email</Label>
                  <Input type="email" id="email" placeholder="tu@email.com" className={"rounded-xl border-gray-200 bg-white " + (errors.email ? " border-red-400" : "")} {...register("email")} />
                  {errors.email && <p className="text-red-500 text-sm mt-1 font-sans">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="telefono" className="text-[#241C15] font-medium mb-2 block font-sans">Telefono</Label>
                  <Input type="tel" id="telefono" placeholder="+56 9 1234 5678" className={"rounded-xl border-gray-200 bg-white " + (errors.telefono ? " border-red-400" : "")} {...register("telefono")} />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1 font-sans">{errors.telefono.message}</p>}
                </div>
              </div>
            </div>

            {/* DYNAMIC FIELDS */}
            <AnimatePresence mode="wait">
              {selectedSector && (
                <motion.div
                  key={selectedSector}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#007C89]" />
                      <p className="text-[#007C89] font-medium font-sans text-sm uppercase tracking-wide">
                        {selectedSector === "Servicios" && "Sobre tu servicio"}
                        {selectedSector === "E-commerce" && "Sobre tu tienda"}
                        {selectedSector === "Local" && "Sobre tu negocio"}
                        {selectedSector === "Otro" && "Cuentame mas"}
                      </p>
                    </div>
                    {renderDynamicFields()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedSector && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-5 bg-[#FFE01B]/20 border border-[#FFE01B]/50 rounded-xl"
              >
                <p className="text-sm text-[#241C15] font-sans">
                  Selecciona tu tipo de negocio arriba para ver mas campos
                </p>
              </motion.div>
            )}

            {/* SUBMIT */}
            <div className="mt-8">
              <Button type="submit" disabled={isLoading || !selectedSector}
                className="w-full bg-[#241C15] text-white py-4 text-lg font-semibold rounded-xl hover:bg-[#3D3D3D] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </span>
                ) : "Enviar mi informacion"}
              </Button>
            </div>

            <p className="text-center text-sm text-[#6B6B6B] mt-5 flex items-center justify-center gap-2 font-sans">
              <Lock className="w-4 h-4" />
              Tu informacion es privada y segura. No compartimos datos con terceros.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FormSection;
