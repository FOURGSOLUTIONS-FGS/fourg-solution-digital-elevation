import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Cog, Plug, Lightbulb } from "lucide-react";
import TextReveal, { LineReveal } from "./TextReveal";
import { useRef } from "react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo de Software a Medida",
    description:
      "Construimos aplicaciones web y móviles adaptadas a las necesidades específicas de tu negocio con tecnologías de vanguardia.",
  },
  {
    icon: Cog,
    title: "Automatización de Procesos",
    description:
      "Eliminamos tareas repetitivas y optimizamos flujos de trabajo para que tu equipo se enfoque en lo que realmente importa.",
  },
  {
    icon: Plug,
    title: "Integraciones & APIs",
    description:
      "Conectamos tus sistemas existentes creando un ecosistema tecnológico unificado y eficiente para tu operación.",
  },
  {
    icon: Lightbulb,
    title: "Consultoría Tecnológica",
    description:
      "Te guiamos en la toma de decisiones tecnológicas con estrategias alineadas a los objetivos de tu empresa.",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-xl bg-card p-6 neon-border neon-border-hover transition-shadow duration-300 cursor-default"
    >
      <div
        className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110"
        style={{ transform: "translateZ(30px)" }}
      >
        <service.icon size={24} />
      </div>
      <h3
        className="font-heading text-lg font-semibold mb-3 text-foreground"
        style={{ transform: "translateZ(20px)" }}
      >
        {service.title}
      </h3>
      <p
        className="text-sm text-muted-foreground leading-relaxed"
        style={{ transform: "translateZ(10px)" }}
      >
        {service.description}
      </p>

      {/* Hover glow follow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <LineReveal>
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Nuestros Servicios
            </span>
          </LineReveal>
          <TextReveal
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            delay={0.1}
          >
            Soluciones que impulsan resultados
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
