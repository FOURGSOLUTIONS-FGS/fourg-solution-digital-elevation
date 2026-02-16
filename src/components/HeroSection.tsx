import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkScene from "./NetworkScene";
import TextReveal, { LineReveal } from "./TextReveal";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <NetworkScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity, y, scale }}
      >
        <LineReveal delay={0.2}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase border rounded-full text-primary border-primary/30 bg-primary/5">
            Software & Automatización
          </span>
        </LineReveal>

        <TextReveal
          as="h1"
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
          delay={0.4}
        >
          Transformamos tu negocio con software inteligente
        </TextReveal>

        <LineReveal delay={0.8}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
            Diseñamos soluciones de software a medida y automatizaciones que impulsan la eficiencia
            operativa de tu empresa. Tu socio estratégico en transformación digital.
          </p>
        </LineReveal>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-heading text-base px-8"
          >
            <a href="#contacto">
              Comenzar proyecto <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/50 font-heading text-base"
          >
            <a href="#servicios">Ver servicios</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
