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
  Check,
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
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu tipo de servicio" /></SelectTrigger>
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
            <Input type="number" min="1" placeholder="Ej: 5" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
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
            <Input type="text" placeholder="Ej: Ropa, electronica, accesorios" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("tipoProducto", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ventas necesarias/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 20" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ventasNecesarias", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Ticket promedio ($)</Label>
            <Input type="number" min="1" placeholder="Ej: 50" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ticketPromedio", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
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
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu tipo de negocio" /></SelectTrigger>
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
            <Input type="text" placeholder="Ej: Santiago Centro" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("ubicacion", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes nuevos/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 10" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesNuevos", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
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
            <Textarea placeholder="Cuentame brevemente que vendes o que servicio ofreces" maxLength={500} className="rounded border-gray-300 min-h-[100px]" onChange={(e) => handleDynamicFieldChange("descripcion", e.target.value)} />
            <p className="text-xs text-[#6B6B6B] mt-1">Maximo 500 caracteres</p>
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Clientes/ventas necesarios/mes</Label>
            <Input type="number" min="1" placeholder="Ej: 8" className="rounded border-gray-300" onChange={(e) => handleDynamicFieldChange("clientesVentas", e.target.value)} />
          </div>
          <div>
            <Label className="text-[#241C15] font-medium mb-2 block font-sans">Presupuesto mensual</Label>
            <Select onValueChange={(v) => handleDynamicFieldChange("presupuesto", v)}>
              <SelectTrigger className="w-full rounded border-gray-300"><SelectValue placeholder="Selecciona tu presupuesto" /></SelectTrigger>
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
    <section id="formulario" className="py-20 md:py-32 px-6 md:px-12 bg-[#F6F6F4]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-[#241C15] mb-4">
            Cuentame mas para crear tu propuesta personalizada
          </h2>
          <p className="font-sans text-[#6B6B6B]">
            Primero selecciona tu tipo de negocio, luego completa tus datos
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 md:p-10 rounded-lg shadow-md"
        >
          {/* SECTOR SELECTION */}
          <div className="mb-8">
            <Label className="text-[#241C15] font-medium mb-4 block font-sans text-base">
              Que describe mejor tu negocio?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectors.map((sector) => {
                const isSelected = selectedSector === sector.id;
                const Icon = sector.icon;
                return (
                  <button
                    type="button"
                    key={sector.id}
                    onClick={() => onSectorSelect(sector.id)}
                    className={[
                      "relative p-4 text-left bg-white border-2 transition-all duration-200 group",
                      isSelected
                        ? "border-[#007C89] bg-[#007C89]/5"
                        : "border-gray-200 hover:border-[#007C89]/40 hover:bg-gray-50"
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className={[
                        "w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors",
                        isSelected ? "bg-[#007C89]" : "bg-[#F6F6F4] group-hover:bg-[#FFE01B]/50"
                      ].join(" ")}>
                        <Icon className={[
                          "w-5 h-5 transition-colors",
                          isSelected ? "text-white" : "text-[#241C15]"
                        ].join(" ")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={[
                            "font-serif font-semibold text-sm transition-colors",
                            isSelected ? "text-[#007C89]" : "text-[#241C15]"
                          ].join(" ")}>
                            {sector.title}
                          </h3>
                          {isSelected && <Check className="w-4 h-4 text-[#007C89] flex-shrink-0 ml-2" />}
                        </div>
                        <p className="text-xs text-[#6B6B6B] mt-0.5">{sector.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BASE FIELDS */}
          <div className="space-y-5 mb-6">
            <div>
              <Label htmlFor="nombre" className="text-[#241C15] font-medium mb-2 block font-sans">Nombre completo</Label>
              <Input type="text" id="nombre" placeholder="Tu nombre completo" className={"rounded border-gray-300" + (errors.nombre ? " border-red-500" : "")} {...register("nombre")} />
              {errors.nombre && <p className="text-red-500 text-sm mt-1 font-sans">{errors.nombre.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-[#241C15] font-medium mb-2 block font-sans">Email</Label>
              <Input type="email" id="email" placeholder="tu@email.com" className={"rounded border-gray-300" + (errors.email ? " border-red-500" : "")} {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1 font-sans">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="telefono" className="text-[#241C15] font-medium mb-2 block font-sans">Telefono</Label>
              <Input type="tel" id="telefono" placeholder="+56 9 1234 5678" className={"rounded border-gray-300" + (errors.telefono ? " border-red-500" : "")} {...register("telefono")} />
              {errors.telefono && <p className="text-red-500 text-sm mt-1 font-sans">{errors.telefono.message}</p>}
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
                  <p className="text-[#007C89] font-medium font-sans text-sm mb-5 uppercase tracking-wide">
                    {selectedSector === "Servicios" && "Sobre tu servicio"}
                    {selectedSector === "E-commerce" && "Sobre tu tienda"}
                    {selectedSector === "Local" && "Sobre tu negocio"}
                    {selectedSector === "Otro" && "Cuentame mas"}
                  </p>
                  {renderDynamicFields()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedSector && (
            <div className="mb-6 p-4 bg-[#FFE01B]/30 border border-[#FFE01B] rounded">
              <p className="text-sm text-[#241C15] font-sans">Selecciona tu tipo de negocio arriba para ver mas campos</p>
            </div>
          )}

          {/* SUBMIT */}
          <div className="mt-8">
            <Button type="submit" disabled={isLoading || !selectedSector}
              className="w-full bg-[#241C15] text-white py-4 text-lg font-semibold rounded hover:bg-[#3D3D3D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </span>
              ) : "Enviar mi informacion"}
            </Button>
          </div>

          <p className="text-center text-sm text-[#6B6B6B] mt-4 flex items-center justify-center gap-2 font-sans">
            <Lock className="w-4 h-4" />
            Tu informacion es privada y segura. No compartimos datos con terceros.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default FormSection;
