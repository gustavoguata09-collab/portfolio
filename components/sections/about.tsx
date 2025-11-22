'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance"
        >
          Sobre Mim
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center border-2 border-purple-500/50 group"
          >
            <Image
              src="/images/sobre.png"
              alt="Gustavo Guedes"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/70 text-pretty">
              Olá! Sou um desenvolvedor fassionado por criar soluções web inovadoras e interfaces incríveis. Com experiência em tecnologias modernas como React, Next.js e TypeScript, transformo desafios complexos em produtos simples e elegantes.
            </p>

            <p className="text-lg text-foreground/70 text-pretty">
              Meu objetivo é combinar design impactante com código de alta qualidade, sempre focando na experiência do usuário e nas melhores práticas de desenvolvimento.
            </p>

            <div className="space-y-2 pt-4">
              <p className="text-foreground/60"><span className="text-purple-500 font-semibold">Localização:</span> Belém-Pa</p>
              <p className="text-foreground/60"><span className="text-purple-500 font-semibold">Email:</span> gustavoguata09@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
