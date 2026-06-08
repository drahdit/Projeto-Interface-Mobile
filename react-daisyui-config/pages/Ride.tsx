import { useState, type JSX } from "react"
import { useNavigate } from "react-router-dom"

type RideIcon = "wifi" | "briefcase" | "bolt"
type RideFilterKey = "wifi" | "luggage" | "electric"

type RideCard = {
  id: string
  dateDay: string
  icons: RideIcon[]
  avatars: string[]
  start: {
    city: string
    time: string
  }
  end: {
    city: string
    time: string
  }
  distance: string
}

const rideDays = [
  { day: "26", month: "May" },
  { day: "27", month: "May" },
  { day: "28", month: "May" },
  { day: "29", month: "May" },
  { day: "30", month: "May" },
]

const currentDayIndex = rideDays.findIndex(
  (date) => date.day === "28" && date.month === "May",
)

const rideCards: RideCard[] = [
  {
    id: "seattle",
    dateDay: "26",
    icons: ["briefcase"],
    avatars: ["https://i.pravatar.cc/100?img=1"],
    start: { city: "Seattle", time: "14:00" },
    end: { city: "Portland", time: "17:30" },
    distance: "Distance 279 km",
  },
  {
    id: "austin",
    dateDay: "27",
    icons: ["wifi"],
    avatars: ["https://i.pravatar.cc/100?img=2"],
    start: { city: "Austin", time: "09:00" },
    end: { city: "Houston", time: "11:00" },
    distance: "Distance 192 km",
  },
  {
    id: "chicago",
    dateDay: "28",
    icons: ["wifi", "briefcase", "bolt"],
    avatars: [
      "https://i.pravatar.cc/100?img=32",
      "https://i.pravatar.cc/100?img=47",
    ],
    start: { city: "Chicago", time: "20:00" },
    end: { city: "Oak Park", time: "22:30" },
    distance: "Distance 15,8 km",
  },
  {
    id: "new-york",
    dateDay: "28",
    icons: ["wifi", "briefcase"],
    avatars: [
      "https://i.pravatar.cc/100?img=15",
      "https://i.pravatar.cc/100?img=56",
    ],
    start: { city: "New York", time: "21:45" },
    end: { city: "Park Avenue", time: "22:40" },
    distance: "Distance 19,3 km",
  },
  {
    id: "sf",
    dateDay: "29",
    icons: ["wifi", "bolt"],
    avatars: ["https://i.pravatar.cc/100?img=12"],
    start: { city: "San Francisco", time: "08:00" },
    end: { city: "San Jose", time: "09:30" },
    distance: "Distance 76,5 km",
  },
  {
    id: "miami",
    dateDay: "30",
    icons: ["bolt"],
    avatars: ["https://i.pravatar.cc/100?img=33"],
    start: { city: "Miami", time: "10:15" },
    end: { city: "Fort Lauderdale", time: "11:20" },
    distance: "Distance 45 km",
  },
]

const iconMap: Record<RideIcon, JSX.Element> = {
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 8c5.3-5.3 14.7-5.3 20 0" />
      <path d="M5 11c3.7-3.7 9.3-3.7 13 0" />
      <path d="M8 14c2-2 6-2 8 0" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <path d="M3 12h18" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
}

export default function Ride() {
  const initialSelectedDayIndex = currentDayIndex === -1 ? 0 : currentDayIndex
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    initialSelectedDayIndex,
  )
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Record<RideFilterKey, boolean>>({
    wifi: true,
    luggage: false,
    electric: false,
  })

  const navigate = useNavigate()
  const selectedDay = rideDays[selectedDayIndex] ?? rideDays[0]

  const visibleCards = rideCards.filter((card) => {
    if (card.dateDay !== selectedDay.day) {
      return false
    }

    return (
      (!filters.wifi || card.icons.includes("wifi")) &&
      (!filters.luggage || card.icons.includes("briefcase")) &&
      (!filters.electric || card.icons.includes("bolt"))
    )
  })

  const toggleCard = (id: string) => {
    setExpandedCardId((current) => (current === id ? null : id))
  }

  const toggleFilter = (key: RideFilterKey) => {
    setFilters((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="ride-ui">
      <div className="ride-ui__frame">
        <header className="ride-header">
          <div className="ride-header__bar">
            <button
              type="button"
              className="ride-icon-button"
              aria-label="Voltar"
              onClick={() => navigate("/")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="ride-icon-button"
              aria-label="Filtros"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <circle cx="8" cy="6" r="2" fill="currentColor" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <circle cx="16" cy="12" r="2" fill="currentColor" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="10" cy="18" r="2" fill="currentColor" />
              </svg>
            </button>
          </div>
          <h1 className="ride-header__title">Ride</h1>
          <div className="ride-dates">
            {rideDays.map((date, index) => {
              const isCurrent = index === initialSelectedDayIndex
              const isSelected = index === selectedDayIndex

              return (
                <button
                  key={`${date.day}-${date.month}`}
                  type="button"
                  className={`ride-date${isSelected ? " is-selected" : ""}${
                    isCurrent ? " is-current" : ""
                  }`}
                  onClick={() => setSelectedDayIndex(index)}
                  aria-pressed={isSelected}
                  aria-current={isCurrent ? "date" : undefined}
                >
                  {isCurrent && isSelected && (
                    <span className="ride-date__badge" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="3" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                  )}
                  <span className="ride-date__day">{date.day}</span>
                  <span className="ride-date__month">{date.month}</span>
                </button>
              )
            })}
          </div>
        </header>

        <main className="ride-list">
          {visibleCards.length === 0 && (
            <p className="mt-5 text-center text-[#a2a6c9]">
              Nenhuma rota para este dia.
            </p>
          )}

          {visibleCards.map((card) => {
            const isExpanded = expandedCardId === card.id

            return (
              <article
                key={card.id}
                className={`ride-item${isExpanded ? " is-expanded" : ""}`}
              >
                <div className="ride-item__header">
                  <div className="ride-item__icons">
                    {card.icons.map((icon) => (
                      <span key={icon} className="ride-item__icon">
                        {iconMap[icon]}
                      </span>
                    ))}
                  </div>
                  <div className="ride-item__avatars">
                    {card.avatars.map((avatar, index) => (
                      <img
                        key={avatar}
                        className="ride-item__avatar object-cover"
                        src={avatar}
                        alt={`Passenger ${index + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>

                <div className="ride-route">
                  <div className="ride-route__point">
                    <span className="ride-route__dot" aria-hidden="true" />
                    <div className="ride-route__content">
                      <span className="ride-route__city">
                        {card.start.city}
                      </span>
                    </div>
                    <span className="ride-route__time">{card.start.time}</span>
                  </div>

                  <div className="ride-route__connector">
                    <span className="ride-route__line-wrap" aria-hidden="true">
                      <span className="ride-route__line" />
                    </span>
                    <span className="ride-route__label">{card.distance}</span>
                  </div>

                  <div className="ride-route__point">
                    <span
                      className="ride-route__dot is-end"
                      aria-hidden="true"
                    />
                    <div className="ride-route__content">
                      <span className="ride-route__city">{card.end.city}</span>
                    </div>
                    <span className="ride-route__time">{card.end.time}</span>
                  </div>
                </div>

                <div
                  className={`ride-item__details${isExpanded ? " is-open" : ""}`}
                >
                  <div className="ride-item__detail-grid">
                    <div>
                      <span className="ride-item__detail-label">Driver</span>
                      <span className="ride-item__detail-value">4.9 (218)</span>
                    </div>
                    <div>
                      <span className="ride-item__detail-label">Pickup</span>
                      <span className="ride-item__detail-value">10 min</span>
                    </div>
                    <div>
                      <span className="ride-item__detail-label">Seats</span>
                      <span className="ride-item__detail-value">2 left</span>
                    </div>
                  </div>
                  <div className="ride-item__actions">
                    <button
                      type="button"
                      className="ride-item__ghost"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Ver perfil
                    </button>
                    <button
                      type="button"
                      className="ride-item__primary"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Reservar
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="ride-item__toggle"
                  aria-expanded={isExpanded}
                  onClick={() => toggleCard(card.id)}
                >
                  {isExpanded ? "Ocultar" : "Detalhes"}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={isExpanded ? "is-rotated" : ""}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </article>
            )
          })}
        </main>
      </div>

      {isFilterOpen && (
        <div
          className="ride-filter"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
        >
          <button
            type="button"
            className="ride-filter__backdrop"
            aria-label="Fechar filtros"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="ride-filter__panel">
            <div className="ride-filter__header">
              <h2>Filtros</h2>
              <button
                type="button"
                className="ride-filter__close"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Fechar"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="ride-filter__options">
              <label className="ride-filter__option">
                <input
                  type="checkbox"
                  checked={filters.wifi}
                  onChange={() => toggleFilter("wifi")}
                />
                Wi-Fi a bordo
              </label>
              <label className="ride-filter__option">
                <input
                  type="checkbox"
                  checked={filters.luggage}
                  onChange={() => toggleFilter("luggage")}
                />
                Bagagem permitida
              </label>
              <label className="ride-filter__option">
                <input
                  type="checkbox"
                  checked={filters.electric}
                  onChange={() => toggleFilter("electric")}
                />
                Carro elétrico
              </label>
            </div>
            <button
              type="button"
              className="ride-filter__apply"
              onClick={() => setIsFilterOpen(false)}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
