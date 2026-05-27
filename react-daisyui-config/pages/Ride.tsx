import { useState, type JSX } from "react"

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
const defaultDayIndex = currentDayIndex === -1 ? 0 : currentDayIndex

const rideCards = [
  {
    id: "chicago",
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
    icons: ["wifi", "briefcase"],
    avatars: [
      "https://i.pravatar.cc/100?img=15",
      "https://i.pravatar.cc/100?img=56",
    ],
    start: { city: "New York", time: "21:45" },
    end: { city: "Park Avenue", time: "22:40" },
    distance: "Distance 19,3 km",
  },
]

const iconMap: Record<string, JSX.Element> = {
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
  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    wifi: true,
    luggage: false,
    electric: false,
  })

  const toggleCard = (id: string) => {
    setExpandedCardId((current) => (current === id ? null : id))
  }

  const toggleFilter = (key: keyof typeof filters) => {
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
              aria-label="Go back"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="ride-icon-button"
              aria-label="Filters"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              const isCurrent = index === currentDayIndex
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
                  {isCurrent && (
                    <span className="ride-date__badge" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
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
          {rideCards.map((card) => {
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
                        className="ride-item__avatar"
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
          aria-label="Filters"
        >
          <button
            type="button"
            className="ride-filter__backdrop"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="ride-filter__panel">
            <div className="ride-filter__header">
              <h2>Filters</h2>
              <button
                type="button"
                className="ride-filter__close"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
                Wi-Fi onboard
              </label>
              <label className="ride-filter__option">
                <input
                  type="checkbox"
                  checked={filters.luggage}
                  onChange={() => toggleFilter("luggage")}
                />
                Luggage allowed
              </label>
              <label className="ride-filter__option">
                <input
                  type="checkbox"
                  checked={filters.electric}
                  onChange={() => toggleFilter("electric")}
                />
                Electric car
              </label>
            </div>
            <button
              type="button"
              className="ride-filter__apply"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
