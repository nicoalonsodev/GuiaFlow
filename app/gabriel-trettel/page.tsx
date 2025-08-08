"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Plus } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import NeonButton from "@/components/neon-button"
import GlowingCard from "@/components/glowing-card"
import AnimatedBackground from "@/components/animated-background"
import AnimatedText from "@/components/animated-text"
import PhoneFrame from "@/components/phone-frame"

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function ThanksPage() {
  const [_, setScrollY] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: false })
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [__, setShowScrollIndicator] = useState(true)

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const staggeredContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const staggeredItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const videoUrl1 = "https://fast.wistia.net/embed/iframe/uztldyn7zc"
  // const videoUrl2 = "https://fast.wistia.net/embed/iframe/9q1lzwig3x"
  const videoUrl3 = "https://fast.wistia.net/embed/iframe/krunwmloe3"
  const videoUrl4 = "https://fast.wistia.net/embed/iframe/2sdfzg1uts"
  const videoUrl5 = "https://fast.wistia.net/embed/iframe/74c61cfbvk"


  //   const videoUrl = "https://fast.wistia.net/embed/iframe/uztldyn7zc"
  // const videoUrl2 = "https://fast.wistia.net/embed/iframe/krunwmloe3"
  // const videoUrl3 = "https://fast.wistia.net/embed/iframe/2sdfzg1uts"
  // const videoUrl4 = "https://fast.wistia.net/embed/iframe/74c61cfbvk"
  const wpMessage =
    "https://wa.me/+5218139639537?text=Hola%Gabriel%20c%C3%B3mo%20est%C3%A1s%3F%20Confirmo%20mi%20llamada!"

  const renderVideo = (url: string, title: string, customDelay: number = 0) => (
    <motion.div
      className="w-full mx-auto relative mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + customDelay }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-800/30 bg-black/20 backdrop-blur-sm ${"pt-[56.25%]"}`}
      >
        {url.includes("wistia") ? (
          <iframe
            src={url}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title={title}
          ></iframe>
        ) : (
          <iframe
            src={url.replace("/view?usp=drive_link", "/preview")}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title={title}
          ></iframe>
        )}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-green-400/20 shadow-lg shadow-green-400/30"></div>
      </div>
    </motion.div>
  )

  return (
    <div
      className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden"
      style={{ letterSpacing: "0.03em" }}
    >
        {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground mousePosition={mousePosition} />
      </div>

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(135, 206, 250, 0.15), transparent 40%), /* Light blue with 15% opacity */
            radial-gradient(circle at 50% 50%, rgba(135, 206, 250, 0.1), transparent 70%) /* Light blue with 10% opacity */
          `,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="relative z-20 flex justify-center gap-4 sm:gap-8 p-4 sm:p-6 backdrop-blur-md bg-black/30 border-b border-gray-800/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="#preguntas-frecuentes"
          className="group relative text-sm md:text-base font-medium transition-colors hover:text-white"
        >
          <span>Preguntas Frecuentes</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5eff00] transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(94,255,0,0.7)]"></span>
        </Link>
        <Link
          href="#casos-de-exito"
          className="group relative text-sm md:text-base font-medium transition-colors hover:text-white"
        >
          <span>Casos de Éxito</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5eff00] transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(94,255,0,0.7)]"></span>
        </Link>
      </motion.nav>

      {/* Main Content */}
      <main ref={mainRef} className="relative z-10 flex-1 flex flex-col items-center px-4 sm:px-6 py-8">
        {/* Logo Section */}
        <motion.div
          className="mb-16 w-48 md:w-64 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-4 rounded-full bg-[#5A8CC1]/5 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <Image
            src="/LOGO.png"
            alt="Flow IA"
            width={300}
            height={150}
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(90,140,193,0.5)] relative z-10"
          />
        </motion.div>

        {/* CONFIRMAR LLAMADA Section */}
        <div ref={heroRef} className="w-full max-w-4xl mx-auto mb-16">
          <motion.div
            className="relative p-8 rounded-2xl backdrop-blur-xl bg-black/40 border border-gray-800/50 shadow-[0_0_35px_rgba(0,0,0,0.5)]"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggeredContainerVariants}
            style={{ y: y1 }}
          >
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#5A8CC1]/30 rounded-full"></div>

            <motion.div variants={staggeredItemVariants}>
              <AnimatedText
                text="IMPORTANTE:"
                className="text-red-500 font-bold text-xl md:text-3xl lg:text-4xl mb-2"
                once={false}
              />
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 leading-relaxed sm:leading-relaxed tracking-wide"
              variants={staggeredItemVariants}
              style={{ wordSpacing: "0.2em" }}
            >
              Para Confirmar tu llamada haz clic en el botón de abajo que dice
              <span className="relative inline-block">
                <span className="relative z-10 text-[#5A8CC1] font-bold"> "Confirmar llamada" </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>
              para ya estar en contacto con tu asesor.
            </motion.p>


          </motion.div>
        </div>

        {/* New Content Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <motion.h1
            className="w-full text-center text-xl font-bold lg:text-5xl text-balance mb-6 sm:mb-8 leading-relaxed sm:leading-relaxed tracking-wide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            variants={fadeInUpVariants}
          >
            Creamos tu
            <span className="relative z-10 text-[#5A8CC1] font-bold"> Empleado IA </span> 
            listo para vender 24/7
          </motion.h1>

          {/* {renderVideo(videoUrl2, "Video 1: Empleado IA listo para vender 24/7", 0)} */}

          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            variants={fadeInUpVariants}
          >
            <p
              className="text-lg sm:text-xl md:text-3xl mb-6 sm:mb-8 font-light px-2 mt-8 tracking-wide text-red-500 font-bold"
              style={{ wordSpacing: "0.2em" }}
            >
              🚨NO HEMOS TERMINADO🚨
              <br />
              TU LLAMADA PUEDE SER CANCELADA…
            </p>
            <p
              className="text-xl sm:text-2xl md:text-4xl mb-6 sm:mb-8 font-light px-2 tracking-wide"
              style={{ wordSpacing: "0.2em" }}
            >
              ⚠️ Completa Nuestra <span className="text-[#5A8CC1] font-bold">"Guia De Inicio"</span> Para Asegurar Tu Espacio Con Nuestro Equipo & Recibir Un Agente Setter IA De Regalo
              <br />
              En Caso De Trabajar Juntos
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-bold">
              Paso #1: Ve el video de 3 minutos debajo
            </p>
          </motion.div>

          {renderVideo(videoUrl1, "Paso #1: Mira Este Video De 3 Minutos...", 0.2)}

          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-bold">
              Paso #2: Mira Nuestra Guía De Arranque
            </p>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8  px-2 tracking-wide text-[#5A8CC1] font-bold">
              Aumenta Tu Conversión En Un 391% Con La Fórmula De 60 Segundos
            </p>
          </motion.div>

          {renderVideo(videoUrl3, "Paso #2: Mira Nuestra Guía De Arranque", 0.4)}

          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={3}
            variants={fadeInUpVariants}
          >
            {/* Problema Section */}
            <div className="p-4 border-2 border-red-500 rounded-lg mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-bold text-red-500">
                El Problema
              </h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Tu equipo se tarda más de 1 hora en llamar a tus leads y pierdes ventas porque no reciben atención inmediata.
              </p>
            </div>
            {/* Solución Section */}
            <div className="p-4 border-2 border-green-500 rounded-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-bold text-[#5A8CC1]">
                La Solución
              </h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Flow IA atiende a tus clientes en menos de 1 minuto y aumenta tu conversión hasta un 391%.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={4}
            variants={fadeInUpVariants}
          >
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 px-2 tracking-wide text-[#5A8CC1] font-bold">
              Y Si Nunca Más Perdieras un Prospecto?
            </p>
          </motion.div>

          {renderVideo(videoUrl4, "Y Si Nunca Más Perdieras un Prospecto?", 0.6)}

          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={5}
            variants={fadeInUpVariants}
          >
            {/* Problema Section */}
            <div className="p-4 border-2 border-red-500 rounded-lg mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-bold text-red-500">
                El Problema
              </h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Tu equipo no responde a tiempo ni 24/7, tampoco está haciendo los seguimientos correspondientes a tus prospectos o incluso los pierden de vista dejando dinero sobre la mesa
              </p>
            </div>
            {/* Solución Section */}
            <div className="p-4 border-2 border-green-500 rounded-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-bold text-[#5A8CC1]">
                La Solución
              </h2>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Flow AI contacta a tus prospectos de forma automática, inmediata y 24/7, además realiza hasta 10 seguimientos en 72 horas y aumentando tus ventas en un 234%.
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="w-full text-center text-xl font-bold lg:text-5xl text-balance mb-6 sm:mb-8 leading-relaxed sm:leading-relaxed tracking-wide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={6}
            variants={fadeInUpVariants}
          >
            Desbloquea tu regalo 🎁
          </motion.h1>

          {renderVideo(videoUrl5, "Desbloquea tu regalo", 0.8)}
                      {/* Button */}
            <motion.div variants={staggeredItemVariants}>
              <NeonButton href={wpMessage} text="CONFIRMAR LLAMADA" icon={<Check className="mr-2 h-6 w-6" />} />
            </motion.div>
        </div>

      
      </main>
{/* Casos de Éxito Section */}
<div id="casos-de-exito" className="max-w-4xl mx-auto mb-16">
          {/* RG servicios */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={5}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight">
              Sanidad | RG servicios <span className="text-gray-400">🧠</span>
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Chat para servicio de permiso sanitario que pasó de responder manualmente a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  automatizar todo el proceso: informa, asesora y cierra ventas 24/7
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>{" "}
              sin intervención humana ni pérdida de oportunidades.
            </p>
            {/* Video Section */}
            <motion.div
              className="w-full mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Contenedor responsivo */}
              <div
                className={`relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-800/30 bg-black/20 backdrop-blur-sm ${"pt-[56.25%]"}`}
              >
                {/* Iframe del video */}
                <iframe
                  src="https://fast.wistia.net/embed/iframe/3glamsppkn"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  title="Video Flow IA"
                ></iframe>

                {/* Efecto de brillo en los bordes */}
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-blue-400/20 shadow-lg shadow-blue-400/30"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Calmabis - caso con video */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={6}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight">
              Ecommerce | Calmabis <span className="text-gray-400">🌿</span>
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Marca de aceite CBD que{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  automatizó la atención al cliente, la confirmación de pedidos y el soporte postventa
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>
              , logrando reemplazar 2 empleados y escalar sin fricciones usando IA en sus canales digitales.
            </p>

            <div className="grid grid-cols-1  gap-8">
              {/* Video en un contenedor similar al PhoneFrame */}
              <div className="flex justify-center">
                <div
                  className="relative rounded-[30px] overflow-hidden border-[10px] border-black bg-black shadow-xl"
                  style={{ maxWidth: "220px" }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10"></div>
                  {/* Screen */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-[9/19.5]">
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-white z-[1] flex justify-between items-center px-3 text-[8px]">
                      <span className="font-semibold">10:15</span>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-3 relative">
                          <div className="absolute bottom-0 left-0 w-[1px] h-[3px] bg-black rounded-sm"></div>
                          <div className="absolute bottom-0 left-[2px] w-[1px] h-1 bg-black rounded-sm"></div>
                          <div className="absolute bottom-0 left-[4px] w-[1px] h-1.5 bg-black rounded-sm"></div>
                          <div className="absolute bottom-0 left-[6px] w-[1px] h-2 bg-black rounded-sm"></div>
                        </div>
                        <div className="h-2 w-2 relative">
                          <div className="absolute inset-0 border border-black rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1px] h-1 bg-black"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-1 bg-black"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-[1px] bg-black"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-[1px] bg-black"></div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">78%</span>
                          <div className="h-2 w-4 ml-0.5 border border-black rounded-sm relative">
                            <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-black m-[0.5px]"></div>
                            <div className="absolute -right-[2px] top-1/2 transform -translate-y-1/2 h-1.5 w-[1px] bg-black"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video */}
                    <video
                      src="Testimonios/Calmabis.mp4"
                      className="w-full h-full object-cover"
                      controls
                      autoPlay={false}
                      muted
                      playsInline
                      poster="calmavis.jpg"
                    />

                    {/* Bottom bar with home indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-100 flex justify-center items-center">
                      <div className="w-1/3 h-0.5 bg-black rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={4}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight tracking-wide"
              style={{ wordSpacing: "0.2em" }}
            >
              Ecommerce | ITUC <span className="text-gray-400">📱</span>
            </h2>
            <p
              className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed tracking-wide"
              style={{ wordSpacing: "0.2em" }}
            >
              Tienda online de Apple y accesorios que pasó de recibir cientos de mensajes sin responder a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  vender en automático con IA a través de Instagram, WhatsApp y Facebook
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>
              , sin perder oportunidades ni tiempo en atención manual.
            </p>
          </motion.div>

          {/* Plexers */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={5}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight">
              Coaching | Plexers <span className="text-gray-400">🧠</span>
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Negocio de coaching liderado por Samuel Maldonado que{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  reemplazó a sus appointment setters gracias a la IA
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>
              , automatizando todo el proceso de agendamiento y asegurando que cada lead calificado reciba seguimiento
              sin esfuerzo humano.
            </p>

            <div className="grid grid-cols-1  gap-8">
              {/* Replace the old chat mockup with the real WhatsApp chat in a phone frame */}
              <div className="flex justify-center">
                <PhoneFrame
                  imageUrl="/Testimonios/plexer2.png?height=800&width=400"
                  altText="Chat de WhatsApp con Plexers"
                  className="transform md:translate-y-0"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={7}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight">
              Educación | Revolution <span className="text-gray-400">📊</span>
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Academia de trading que{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  transformó su embudo inicial con IA, automatizando la nutrición, el seguimiento y la convocatoria
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>{" "}
              a sus presentaciones en vivo, liberando al equipo comercial para enfocarse en cerrar ventas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <PhoneFrame
                  imageUrl="/Testimonios/Revolution.PNG?height=800&width=400"
                  altText="Chat de WhatsApp con Revolution"
                  className="transform md:translate-y-0"
                />
              </div>
              <div className="flex justify-center">
                <PhoneFrame
                  imageUrl="/Testimonios/Revolution(1).PNG?height=800&width=400"
                  altText="Chat de WhatsApp con Revolution"
                  className="transform md:translate-y-0"
                />
              </div>
            </div>
          </motion.div>

          {/* ECIG - caso con una sola captura */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={8}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(90,140,193,0.9)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Plus className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl text-[#5A8CC1] font-medium">Caso de Éxito</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 font-light leading-tight">
              Ecommerce | ECIG <span className="text-gray-400">💨</span>
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Tienda de vaporizadores que{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#5A8CC1]">
                  integró IA para automatizar atención, pedidos y soporte
                </span>
                <span className="absolute inset-0 bg-[#5A8CC1]/20 blur-md -z-10 rounded-md"></span>
              </span>{" "}
              generando una experiencia fluida 24/7 en WhatsApp e Instagram.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <PhoneFrame
                  imageUrl="/Testimonios/Ecig2.png?height=800&width=400"
                  altText="Chat de WhatsApp con ECIG"
                  className="transform md:translate-y-0"
                />
              </div>

              <GlowingCard className="flex flex-col justify-center p-8 backdrop-blur-xl bg-black/30">
                <h3 className="text-xl md:text-2xl mb-4 font-light">
                  <span className="text-[#5A8CC1] font-medium">Resultados</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-[#5A8CC1]/20 flex items-center justify-center mr-3 mt-1">
                      <Check className="h-3 w-3 text-[#5A8CC1]" />
                    </div>
                    <p className="text-sm md:text-base">Automatización completa del proceso de atención al cliente</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-[#5A8CC1]/20 flex items-center justify-center mr-3 mt-1">
                      <Check className="h-3 w-3 text-[#5A8CC1]" />
                    </div>
                    <p className="text-sm md:text-base">Reducción del 70% en tiempo de respuesta</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-[#5A8CC1]/20 flex items-center justify-center mr-3 mt-1">
                      <Check className="h-3 w-3 text-[#5A8CC1]" />
                    </div>
                    <p className="text-sm md:text-base">Incremento del 35% en conversión de ventas</p>
                  </li>
                </ul>
              </GlowingCard>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={9}
          variants={scaleInVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-800/50 pb-16">
            <GlowingCard className="text-center p-8 backdrop-blur-xl bg-black/30">
              <motion.h2
                className="text-6xl md:text-8xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#5A8CC1] to-white">
                  80+
                </span>
              </motion.h2>
              <p className="text-xl text-gray-400">Clientes satisfechos</p>
            </GlowingCard>
            <GlowingCard className="text-center p-8 backdrop-blur-xl bg-black/30">
              <motion.h2
                className="text-6xl md:text-8xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#5A8CC1] to-white">
                  95%
                </span>
              </motion.h2>
              <p className="text-xl text-gray-400">Tasa de éxito</p>
            </GlowingCard>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-5xl text-center mb-16 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <AnimatedText text="¡Conoce a nuestro equipo!" className="inline" once={false} />
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={10}
            variants={fadeInUpVariants}
          >
            <GlowingCard className="aspect-square overflow-hidden">
              <Image
                src="/closers/hernan.webp?height=500&width=500"
                alt="Co-Fundador portrait"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </GlowingCard>
            <GlowingCard className="flex flex-col justify-center p-8 backdrop-blur-xl bg-black/30">
              <h3 className="text-3xl md:text-4xl mb-4 font-light">
                <span className="text-[#5A8CC1] font-medium">Co-Fundador</span> | Hernán Duarte
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                Hernán Duarte, un apasionado líder con más de 20 años de experiencia en el ámbito empresarial, ha dedicado su carrera a generar impacto positivo en la comunidad. Con una sólida formación académica en Administración Financiera del Tecnológico de Monterrey y un MBA del Tec y Midwestern State University en Texas, Hernán ha desarrollado habilidades excepcionales en finanzas, derecho y marketing digital. 
              </p>
              <p className="text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
                Ahora, con su incursión en la inteligencia artificial, busca aprovechar las últimas tecnologías para impulsar soluciones innovadoras que beneficien a la sociedad. Su compromiso con la comunidad y su pasión por el aprendizaje continuo lo llevan a buscar formas de aplicar sus habilidades para generar un impacto duradero y positivo en la vida de las personas.
              </p>
            </GlowingCard>
          </motion.div>

          {/* Ignacio */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={11}
            variants={fadeInUpVariants}
          >
            <GlowingCard className="aspect-square overflow-hidden">
              <Image
                src="/closers/geraldina.webp?height=500&width=500"
                alt="Co-Fundador portrait"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </GlowingCard>
            <GlowingCard className="flex flex-col justify-center p-8 backdrop-blur-xl bg-black/30">
              <h3 className="text-3xl md:text-4xl mb-4 font-light">
                <span className="text-[#5A8CC1] font-medium">Co-Fundador</span> |  Geraldina Gómez
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
              Geraldina Gómez es una destacada figura en el ámbito editorial y de la comunicación, con una sólida formación académica en Letras Españolas por la Universidad Autónoma de Chihuahua.  
              </p>
               <p className="text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
                Es Directora General de Mundo Editorial, reconocida empresa con más de 28 años de trayectoria en el ramo de la publicidad y edición de revistas. Además, tiene experiencia como locutora de radio, lo que le ha permitido desarrollar habilidades excepcionales en la comunicación y la difusión de información.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
              Ahora, con su incursión en la inteligencia artificial, Geraldina busca aprovechar las últimas tecnologías de innovación y aplicar sus habilidades y conocimiento para generar un impacto positivo en la vida de las personas.
              </p>
             
            </GlowingCard>
          </motion.div>

          {/* closer */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={11}
            variants={fadeInUpVariants}
          >
            <GlowingCard className="aspect-square overflow-hidden">
              <Image
                src="/closers/gabriel.jpeg?height=500&width=500"
                alt="Co-Fundador portrait"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </GlowingCard>
            <GlowingCard className="flex flex-col justify-center p-8 backdrop-blur-xl bg-black/30">
              <h3 className="text-3xl md:text-4xl mb-4 font-light">
                <span className="text-[#5A8CC1] font-medium">Director de admisión</span> | Gabriel Trettel
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
               Soy Gabriel, Argentino de 25 años y desde los 18 estoy inmerso en el mundo del emprendimiento, desarrollandome  en negocios físicos como digitales .




              </p>
              <p className="text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
              A lo largo de estos años  me he especializado en áreas de ventas y me desempeño como director comercial en diversas empresas, liderando equipos de trabajo en toda Latinoamérica.


              </p>
              <p className="text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
               Hoy , junto con Flow IA, una agencia enfocada en marketing digital e inteligencia artificial seguimos potenciando proyectos con visión de crecimiento y tecnología.
              </p>
            </GlowingCard>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={12}
          variants={fadeInUpVariants}
        >
          <div id="preguntas-frecuentes" className="flex items-center mb-4">
            <motion.div
              className="w-8 h-8 rounded-full bg-[#5A8CC1] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(90,140,193,0.7)]"
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 20px rgba(90,140,193,0.9)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Plus className="h-5 w-5 text-white" />
            </motion.div>
            <h3 className="text-xl text-[#5A8CC1] font-medium">FAQs</h3>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-8 font-light">Tenemos las respuestas</h2>

          <GlowingCard className="p-8 backdrop-blur-xl bg-black/30">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-800/50 py-4">
                <AccordionTrigger className="text-lg sm:text-xl hover:text-[#5A8CC1] transition-colors py-2 sm:py-3">
                  ¿Qué vamos a ver en la llamada?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed px-1">
                  En la llamada te vamos a mostrar cómo funciona el sistema y cómo podríamos aplicarlo a tu negocio.
                  Vamos a entender tu situación actual y ver si Flow IA puede ayudarte a escalar sin aumentar
                  estructura. Además como regalo te entregaremos la primera versión de tu agente IA.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-gray-800/50 py-4">
                <AccordionTrigger className="text-lg sm:text-xl hover:text-[#5A8CC1] transition-colors py-2 sm:py-3">
                  ¿Esto es para mi tipo de negocio?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed px-1">
                  Trabajamos con negocios de muchos rubros. Si tenés canales activos como Instagram, WhatsApp o Meta Ads
                  y/o un volumen minimo de 15 mensajes diarios, es muy probable que podamos ayudarte.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-gray-800/50 py-4">
                <AccordionTrigger className="text-lg sm:text-xl hover:text-[#5A8CC1] transition-colors py-2 sm:py-3">
                  ¿Necesito conocimientos técnicos para usar esto?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed px-1">
                  No. Nosotros nos encargamos de toda la implementación y configuración. Vos solo necesitás tener claros
                  tus procesos y objetivos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-gray-800/50 py-4">
                <AccordionTrigger className="text-lg sm:text-xl hover:text-[#5A8CC1] transition-colors py-2 sm:py-3">
                  ¿Cuánto tiempo lleva ver resultados?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed px-1">
                  Depende del punto de partida, pero muchos clientes lanzan su agente en 14 días. En promedio, en menos
                  de 30 días ya tienen un sistema funcionando.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-gray-800/50 py-4">
                <AccordionTrigger className="text-lg sm:text-xl hover:text-[#5A8CC1] transition-colors py-2 sm:py-3">
                  ¿Esto reemplaza a personas de mi equipo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed px-1">
                  Sí, en muchos casos reemplaza tareas repetitivas de atención al cliente, setters, confirmaciones de
                  pedidos y seguimiento. Pero sobre todo, libera tiempo y energía para que vos y tu equipo se enfoquen
                  en lo estratégico.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </GlowingCard>
        </motion.div>
      {/* Footer */}
      <motion.footer
        className="relative z-10 py-6 sm:py-8 border-t border-gray-800/50 backdrop-blur-sm bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex justify-center gap-4 sm:gap-8">
          <Link
            href="#preguntas-frecuentes"
            className="group relative text-sm md:text-base font-medium transition-colors hover:text-white"
          >
            <span>Preguntas Frecuentes</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5A8CC1] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(90,140,193,0.7)]"></span>
          </Link>
          <Link
            href="#casos-de-exito"
            className="group relative text-sm md:text-base font-medium transition-colors hover:text-white"
          >
            <span>Casos de Éxito</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5A8CC1] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(90,140,193,0.7)]"></span>
          </Link>
        </div>
      </motion.footer>
    </div>
  )
}