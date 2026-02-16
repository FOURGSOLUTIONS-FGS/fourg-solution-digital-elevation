import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import TextReveal, { LineReveal } from "./TextReveal";

const testimonials = [
  {
    name: "María García",
    role: "CEO",
    company: "LogiTech Express",
    quote:
      "Fourg Solution transformó completamente nuestra operación logística. La automatización que implementaron nos ahorró más de 30 horas semanales en procesos manuales.",
    avatar: "MG",
  },
  {
    name: "Carlos Mendoza",
    role: "CTO",
    company: "FinanceFlow",
    quote:
      "El equipo de Fourg Solution entendió nuestras necesidades desde el primer día. La plataforma que desarrollaron superó todas nuestras expectativas.",
    avatar: "CM",
  },
  {
    name: "Ana Rodríguez",
    role: "Directora de Operaciones",
    company: "RetailPro",
    quote:
      "Profesionalismo y calidad de primer nivel. Su consultoría tecnológica nos ayudó a tomar las decisiones correctas para escalar nuestro negocio.",
    avatar: "AR",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="testimonios" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <LineReveal>
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Testimonios
            </span>
          </LineReveal>
          <TextReveal
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            delay={0.1}
          >
            Lo que dicen nuestros clientes
          </TextReveal>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-card rounded-xl p-8 neon-border text-center"
            >
              <Quote className="mx-auto mb-6 text-primary/30" size={40} />
              <p className="text-foreground text-lg mb-8 italic leading-relaxed">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-heading font-semibold text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "bg-primary w-8" : "bg-muted-foreground/30 w-2"
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
