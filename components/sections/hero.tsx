"use client"

import { motion } from "framer-motion"
import { useTypewriter } from "@/hooks/use-typewriter"
import { Instagram, MessageCircle } from "lucide-react"

export default function Hero() {
  const displayedText = useTypewriter("GuedesBuilds", 80)

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 bg-black relative overflow-hidden"
    >
      <div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        style={{
          backgroundImage: "url(/images/guedes-logo.png)",
          backgroundSize: "600px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance min-h-[80px] md:min-h-[100px] flex items-center justify-center">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <span className="text-purple-500">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-balance">Full Stack Developer</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/80 max-w-2xl mx-auto text-balance"
        >
          Transformo ideias em soluções digitais inovadoras com React, Next.js e design responsivo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-6 justify-center pt-6"
        >
          <a
            href="https://instagram.com/Guhzin7x"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-8 h-8 text-white" />
          </a>
          <a
            href="https://wa.me/5591986136199"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
