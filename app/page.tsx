"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Plus } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import GlowingCard from "@/components/glowing-card"
import AnimatedBackground from "@/components/animated-background"
import PhoneFrame from "@/components/phone-frame"

export default function HomePage() {
  const isMobile = useMobile()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: false })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

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
  }

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
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(90, 140, 193, 0.15), transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(90, 140, 193, 0.1), transparent 70%)
          `,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="relative z-20 flex justify-center items-center px-6 py-4 sm:py-6 backdrop-blur-md bg-black/30 border-b border-gray-800/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/LOGO.png"
            alt="Flow IA"
            width={120}
            height={40}
            className="h-10 w-auto drop-shadow-[0_0_10px_rgba(90,140,193,0.5)]"
          />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col">
        <div ref={heroRef} className="flex flex-col items-center justify-center px-4 sm:px-6 py-12">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggeredContainerVariants}
          >
            <motion.div variants={staggeredItemVariants} className="mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 leading-tight">
                Mira este video y <span className="text-[#5A8CC1]">adquiere clientes</span> para tu negocio de
                <br />
                Asesoría o Consultoría Fiscal <span className="text-[#5A8CC1]">sin que dependa de ti</span>
              </h1>
            </motion.div>

            <motion.div
              variants={staggeredItemVariants}
              className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-gray-800/50 shadow-[0_0_35px_rgba(0,0,0,0.5)] mb-8"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                <motion.button
                  className="w-16 h-16 bg-[#5A8CC1] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(90,140,193,0.7)]"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(90,140,193,0.9)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-white ml-1"></div>
                </motion.button>
              </div>
              <Image
                src="/confident-consultant-address.png"
                alt="Video thumbnail"
                width={1280}
                height={720}
                className="w-full h-auto"
              />

              {/* Overlay text */}
              <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-sm p-4 rounded-lg max-w-xs">
                <p className="text-white font-medium">"Se presente. Califique. Cierre el cliente ideal."</p>
              </div>
            </motion.div>

            <motion.div variants={staggeredItemVariants} className="mb-16">
              <Link
                href="/thanks"
                className="inline-block bg-[#7BA3D1] text-white font-bold py-3 px-6 rounded-md hover:bg-[#6B93C1] transition-all duration-300 shadow-[0_0_15px_rgba(123,163,209,0.5)]"
              >
                Agenda tu sesión gratuita
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Casos de Éxito Section */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              custom={0}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-2">
                ¡Conoce a nuestros <span className="text-[#5A8CC1]">casos de éxito</span>! 👇
              </h2>
            </motion.div>

            {/* Casos de Éxito - Usando el mismo código de thanks */}
            <div id="casos-de-exito" className="max-w-4xl mx-auto mb-16">
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
                    whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(90,140,193,0.9)" }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlowingCard className="bg-black/40 backdrop-blur-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                      <div>
                        <p className="text-sm">Flow IA & ITUC</p>
                        <p className="text-xs text-gray-400">134</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 mb-3 border border-gray-700/50">
                      <p className="text-sm mb-1 font-bold">ITUC Apple Store</p>
                      <p className="text-sm">
                        Increíble cómo la IA ha transformado nuestra atención al cliente. Ahora respondemos a todos los
                        mensajes al instante y las ventas han aumentado significativamente.
                      </p>
                      <p className="text-xs text-gray-400 text-right">9:44 a. m.</p>
                    </div>
                    <div className="flex items-center">
                      <motion.span
                        className="text-[#5A8CC1] mr-2"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        👍
                      </motion.span>
                      <p className="text-sm">¡Gracias por el gran trabajo!</p>
                      <p className="text-xs text-gray-400 ml-auto">9:44 a. m.</p>
                    </div>
                  </GlowingCard>
                  <GlowingCard className="relative aspect-video bg-black/40 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-[#5A8CC1] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(90,140,193,0.7)]"
                        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(90,140,193,0.9)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-white ml-1"></div>
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-800/50">
                      <p className="text-sm">Testimonio | ITUC</p>
                      <p className="text-xs">Cliente Satisfecho</p>
                    </div>
                  </GlowingCard>
                </div>
              </motion.div>

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
                    whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(90,140,193,0.9)" }}
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
                  , automatizando todo el proceso de agendamiento y asegurando que cada lead calificado reciba
                  seguimiento sin esfuerzo humano.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Replace the old chat mockup with the real WhatsApp chat in a phone frame */}
                  <div className="flex justify-center">
                    <PhoneFrame
                      imageUrl="/Testimonios/Plexers.PNG"
                      altText="Chat de WhatsApp con Plexers"
                      className="transform md:translate-y-0"
                    />
                  </div>

                  <GlowingCard className="relative aspect-video bg-black/40 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-[#5A8CC1] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(90,140,193,0.7)]"
                        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(90,140,193,0.9)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-white ml-1"></div>
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-800/50">
                      <p className="text-sm">Plexers | Testimonio</p>
                      <p className="text-xs">Samuel Maldonado</p>
                    </div>
                  </GlowingCard>
                </div>
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
                    whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(90,140,193,0.9)" }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        />

                        {/* Bottom bar with home indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-100 flex justify-center items-center">
                          <div className="w-1/3 h-0.5 bg-black rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <GlowingCard className="relative aspect-video bg-black/40 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-[#5A8CC1] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(90,140,193,0.7)]"
                        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(90,140,193,0.9)" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-white ml-1"></div>
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-800/50">
                      <p className="text-sm">Calmabis | Testimonio</p>
                      <p className="text-xs">Cliente Satisfecho</p>
                    </div>
                  </GlowingCard>
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
                    whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(90,140,193,0.9)" }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-center">
                    <PhoneFrame
                      imageUrl="/Testimonios/Revolution.PNG"
                      altText="Chat de WhatsApp con Revolution"
                      className="transform md:translate-y-0"
                    />
                  </div>
                  <div className="flex justify-center">
                    <PhoneFrame
                      imageUrl="/Testimonios/Revolution(1).PNG"
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
                    whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(90,140,193,0.9)" }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-center">
                    <PhoneFrame
                      imageUrl="/Testimonios/ECIG.PNG"
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
                        <p className="text-sm md:text-base">
                          Automatización completa del proceso de atención al cliente
                        </p>
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 px-4 sm:px-6 border-t border-gray-800/30">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8">
              <motion.div
                className="mb-8 md:mb-0 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#5A8CC1] to-white">
                    80+
                  </span>
                </h2>
                <p className="text-lg text-gray-400">Clientes satisfechos</p>
              </motion.div>

              <Link
                href="/thanks"
                className="inline-block bg-[#7BA3D1] text-white font-bold py-3 px-6 rounded-md hover:bg-[#6B93C1] transition-all duration-300 shadow-[0_0_15px_rgba(123,163,209,0.5)]"
              >
                Empieza tu proyecto
              </Link>

              <motion.div
                className="mt-8 md:mt-0 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#5A8CC1] to-white">
                    4.9
                  </span>
                </h2>
                <p className="text-lg text-gray-400">Valoración promedio</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          className="relative z-10 py-6 sm:py-8 border-t border-gray-800/50 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Flow IA. Todos los derechos reservados.
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
