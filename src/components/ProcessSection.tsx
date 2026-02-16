import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import TextReveal, { LineReveal, MaskReveal } from "./TextReveal";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico",
    description: "Analizamos tus procesos actuales e identificamos oportunidades de mejora.",
  },
  {
    icon: PenTool,
    title: "Diseño",
    description: "Diseñamos la arquitectura y UX de la solución ideal para tu caso.",
  },
  {
    icon: Code,
    title: "Desarrollo",
    description: "Construimos tu solución con metodologías ágiles y entregas iterativas.",
  },
  {
    icon: Rocket,
    title: "Entrega",
    description: "Desplegamos, capacitamos a tu equipo y brindamos soporte continuo.",
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <LineReveal>
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Nuestro Proceso
            </span>
          </LineReveal>
          <TextReveal
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            delay={0.1}
          >
            Del concepto a la realidad
          </TextReveal>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Connector Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden md:block origin-top"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), hsl(var(--primary) / 0.5))",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Content */}
                <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"} pl-16 md:pl-0`}>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-card neon-border flex items-center justify-center text-primary"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15 + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <step.icon size={20} />
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
