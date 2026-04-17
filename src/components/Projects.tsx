import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "AURA Espresso",
    category: "1-комнатная · до 2 гостей",
    location: "Анапа, 5 мин до пляжа",
    price: "от 2 800 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/e0a9a028-7b2e-4e0a-8ee6-827ad67a7e3f.jpg",
  },
  {
    id: 2,
    title: "AURA Cappuccino",
    category: "1-комнатная · до 3 гостей",
    location: "Анапа, ул. Набережная",
    price: "от 3 200 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/3e24d9b9-cd27-4234-97d0-ce4a54f9237e.jpg",
  },
  {
    id: 3,
    title: "AURA Latte",
    category: "1-комнатная · до 3 гостей",
    location: "Анапа, вид на море",
    price: "от 3 600 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/8c660ad5-d0ee-4e0e-b2bb-9855e891724d.jpg",
  },
  {
    id: 4,
    title: "AURA Macchiato",
    category: "1-комнатная · до 4 гостей",
    location: "Анапа, тихий район",
    price: "от 4 000 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/223f57c8-24c8-43d6-aa8d-8d9e651c62f8.jpg",
  },
  {
    id: 5,
    title: "AURA Americano",
    category: "1-комнатная · до 3 гостей",
    location: "Анапа, центр",
    price: "от 3 400 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/84f9dc4b-f7a2-47f9-9372-b511f2412394.jpg",
  },
  {
    id: 6,
    title: "AURA Ristretto",
    category: "1-комнатная · до 2 гостей",
    location: "Анапа, пентхаус",
    price: "от 5 500 ₽/сут",
    image: "https://cdn.poehali.dev/projects/6a050592-ed7b-4f8b-aadb-e063ad28d256/files/db4ffcac-fe18-4d62-b9c4-5aab4c30762f.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">6 апартаментов</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Коллекция AURA</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Забронировать
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-foreground font-medium text-sm whitespace-nowrap">{project.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
