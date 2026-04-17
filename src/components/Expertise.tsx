import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const amenities = [
  {
    title: "Спальное место",
    description: "Двуспальная кровать с ортопедическим матрасом, чистое постельное бельё и подушки включены.",
    icon: "BedDouble",
  },
  {
    title: "Кухня",
    description: "Холодильник, микроволновка, электрочайник, плита, посуда и столовые приборы — всё для самостоятельного питания.",
    icon: "UtensilsCrossed",
  },
  {
    title: "Ванная комната",
    description: "Душевая кабина или ванна, полотенца, фен, туалетные принадлежности.",
    icon: "ShowerHead",
  },
  {
    title: "Климат и комфорт",
    description: "Кондиционер, Wi-Fi, телевизор. В каждом апартаменте всегда прохладно и уютно.",
    icon: "Wind",
  },
  {
    title: "Чистота",
    description: "Апартаменты убираются перед каждым заездом. По запросу — смена белья и уборка в процессе проживания.",
    icon: "Sparkles",
  },
  {
    title: "Парковка и удобства",
    description: "Бесплатная парковка во дворе, стиральная машина, утюг и гладильная доска.",
    icon: "Car",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что включено</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Всё необходимое</HighlightedText>
            <br />
            уже есть
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {amenities.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Icon name={area.icon} className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
