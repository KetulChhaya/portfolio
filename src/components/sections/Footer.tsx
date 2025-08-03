'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/50 bg-background border-t">
      <div className="container-responsive py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground/80 text-sm lg:text-base">
            © {currentYear} Ketul Chhaya. Crafted with passion and precision.
          </p>
          <motion.div
            className="text-muted-foreground/60 mt-2 text-xs lg:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Built with ❤️ by K2L
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
