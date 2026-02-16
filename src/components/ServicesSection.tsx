import { motion } from "framer-motion";
import { Code2, Cog, Plug, Lightbulb } from "lucide-react";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Nuestros Servicios
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Soluciones que{" "}
            <span className="text-secondary text-glow-green">impulsan resultados</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative rounded-xl bg-card p-6 neon-border neon-border-hover transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                <service.icon size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
