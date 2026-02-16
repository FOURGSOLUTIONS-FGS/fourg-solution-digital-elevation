import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TextReveal, { LineReveal, MaskReveal } from "./TextReveal";

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3 + i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="contacto" className="py-24 md:py-32 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <LineReveal>
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Contacto
            </span>
          </LineReveal>
          <TextReveal
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            delay={0.1}
          >
            ¿Listo para transformar tu negocio?
          </TextReveal>
          <LineReveal delay={0.4}>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
            </p>
          </LineReveal>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div custom={0} variants={inputVariants}>
            <Input
              placeholder="Tu nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-card border-border focus:border-primary/50"
            />
          </motion.div>
          <motion.div custom={1} variants={inputVariants}>
            <Input
              type="email"
              placeholder="Tu email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-card border-border focus:border-primary/50"
            />
          </motion.div>
          <motion.div custom={2} variants={inputVariants}>
            <Textarea
              placeholder="Cuéntanos sobre tu proyecto..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="bg-card border-border focus:border-primary/50 resize-none"
            />
          </motion.div>
          <motion.div custom={3} variants={inputVariants}>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-heading text-base"
            >
              Enviar mensaje <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
