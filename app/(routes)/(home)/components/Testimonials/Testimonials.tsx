"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        name: "James Harrington",
        role: "Luxury Collector",
        comment: "The selection of vehicles is unmatched. The Porsche 911 GT3 was in pristine mechanical condition, delivering every bit of its 510 CV on the open road. Truly a five-star experience.",
        avatar: "JH"
    },
    {
        name: "Sofia Rossi",
        role: "Event Directress",
        comment: "We needed a fleet of 10 luxury cars for a gala. The coordination and delivery was flawless. Our guests were impressed by the immaculate state of every Tesla and Mercedes provided.",
        avatar: "SR"
    },
    {
        name: "Marcus Chen",
        role: "Tech Entrepreneur",
        comment: "Seamless digital booking. The performance of the Lamborghini Urus was mind-blowing – the perfect blend of utility and raw power. The best platform in the industry.",
        avatar: "MC"
    },
    {
        name: "Elena Vance",
        role: "Lifestyle Blogger",
        comment: "The most photogenic fleet I've ever seen. The Ferrari Roma was the star of my campaign. Immaculate service and breathtaking performance that exceeds every expectation.",
        avatar: "EV"
    },
    {
        name: "David Sterling",
        role: "Corporate Executive",
        comment: "Reliability meets luxury. My go-to for business travel in Europe. The Audi R8 Performance provided the perfect balance of thrill and prestige for my weekend break.",
        avatar: "DS"
    },
    {
        name: "Isabella Knight",
        role: "Professional Racer",
        comment: "As someone who knows cars, I was impressed by the mechanical calibration of their fleet. The McLaren 720S handled like a dream. Truly a professional outfit.",
        avatar: "IK"
    },
    {
        name: "Robert Fox",
        role: "Luxury Travel Advisor",
        comment: "I recommend Rental Cars to all my high-net-worth clients. Their commitment to Excellence Guaranteed isn't just a slogan, it's a standard evident in every detail.",
        avatar: "RF"
    },
    {
        name: "Anatoly Petrova",
        role: "Formula 3 Driver",
        comment: "Technically superior. The transmission response on their Ferrari F8 is sharper than any other rental I've tried. They really maintain these machines at the limit.",
        avatar: "AP"
    },
    {
        name: "Claire Beaumont",
        role: "Style Consultant",
        comment: "Sophistication in motion. Their selection of limited edition colors for the Porsche fleet is exceptional. If you want to make an entrance, this is the place.",
        avatar: "CB"
    }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function Testimonials() {
  return (
    <section 
      id="testimonials"
      className="w-full bg-zinc-50 dark:bg-zinc-950/30 py-24 lg:py-32 overflow-hidden border-y border-border/50"
    >
        <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 lg:mb-24 space-y-4"
            >
                <p className="text-primary font-black uppercase tracking-[0.4em] text-xs">Testimonials</p>
                <h2 className="text-4xl lg:text-7xl font-black uppercase italic tracking-tighter">
                    Global <span className="text-muted-foreground/30 text-5xl lg:text-6xl">Trust</span>
                </h2>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {testimonials.map((t) => (
                    <motion.article 
                        key={t.name} 
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="testimonial-card relative p-10 rounded-[3rem] bg-white dark:bg-zinc-900/50 border border-border/50 hover:border-primary/20 transition-all group overflow-hidden shadow-xl shadow-black/5"
                    >
                        <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
                        
                        <div className="relative z-10 space-y-6">
                            <p className="text-lg lg:text-xl font-medium leading-relaxed italic text-foreground/80">
                                "{t.comment}"
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-white italic">
                                    {t.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black uppercase italic tracking-tighter text-sm">{t.name}</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    </section>
  );
}
