import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.04,
  as: Tag = "h2",
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            whileInView={{ y: "0%", rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: LineRevealProps) {
  const initial = {
    up: { y: 60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={initial[direction]}
        whileInView={{ y: 0, x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
