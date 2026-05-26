import { useEffect, useRef, useState } from "react"
import { CarFront, Mail, Heart, Activity } from "lucide-react"

function RideRequest() {
  const [acceptPressed, setAcceptPressed] = useState(false)
  const [declinePulse, setDeclinePulse] = useState(false)
  const acceptTimeout = useRef<number | undefined>(undefined)
  const declineTimeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (acceptTimeout.current) {
        window.clearTimeout(acceptTimeout.current)
      }

      if (declineTimeout.current) {
        window.clearTimeout(declineTimeout.current)
      }
    }
  }, [])

  const handleAccept = () => {
    if (acceptTimeout.current) {
      window.clearTimeout(acceptTimeout.current)
    }

    setAcceptPressed(true)
    acceptTimeout.current = window.setTimeout(() => {
      setAcceptPressed(false)
    }, 1500)
  }

  const handleDecline = () => {
    if (declineTimeout.current) {
      window.clearTimeout(declineTimeout.current)
    }

    setDeclinePulse(true)
    declineTimeout.current = window.setTimeout(() => {
      setDeclinePulse(false)
    }, 600)
  }

  return (
    <main className="ride-request" aria-label="Nova solicitação de corrida">

      <div
        className={`ride-card ${declinePulse ? "is-declined" : ""}`}
        aria-label="Solicitação de Jeck N."
      >
      <h3 className="section-title">New ride request!</h3>
        <div className="ride-card__header">
          <div className="ride-card__badges">
            <div className="badge" aria-label="Elétrico">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon
                  points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                  stroke="var(--blue)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="badge" aria-label="Popular">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7c-1.89 0-3.6-.66-4.94-1.75"
                  stroke="var(--pink)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="ride-card__passenger">
            <div className="ride-card__passenger-info">
              <span className="ride-card__passenger-name">Jeck, N.</span>
              <span className="ride-card__passenger-ratings">158 ratings</span>
            </div>
            <div className="ride-card__passenger-avatar" aria-hidden="true">
              👨
            </div>
          </div>
        </div>

        <div className="ride-card__meta">
          <div>
            <p className="ride-card__date">25 May, 2019</p>
            <p className="ride-card__seat">1 seat</p>
          </div>
          <p className="ride-card__price">50 $</p>
        </div>

        <div className="route" aria-label="Rota da viagem">
          <div className="route__point">
            <div
              className="route__dot route__dot--origin"
              aria-hidden="true"
            ></div>
            <span className="route__city">Chicago</span>
            <time className="route__time">20:00</time>
          </div>
          <div className="route__connector" aria-hidden="true">
            <div className="route__line-wrap">
              <div className="route__line"></div>
            </div>
            <span className="route__distance">Distance &nbsp;15, 8 km</span>
          </div>
          <div className="route__point">
            <div
              className="route__dot route__dot--destination"
              aria-hidden="true"
            ></div>
            <span className="route__city">Oak Park</span>
            <time className="route__time">22:30</time>
          </div>
        </div>
        <div className="ride-actions">
          <button
            className="btn-decline"
            onClick={handleDecline}
            aria-label="Recusar corrida"
            type="button"
          >
            Decline
          </button>
          <button
            className={`btn-accept ${acceptPressed ? "pressed" : ""}`}
            onClick={handleAccept}
            aria-label="Aceitar corrida"
            type="button"
          >
            {acceptPressed ? "Accepted!" : "Accept"}
          </button>
        </div>
      </div>
    </main>
  )
}

const tabs = [
  {
    id: "ride",
    label: "Ride",
    Icon: CarFront,
    content: <RideRequest />,
  },
  {
    id: "message",
    label: "Message",
    Icon: Mail,
    content: (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Solicitar Corrida</h2>
        <input className="input input-bordered" placeholder="Origem" />
        <input className="input input-bordered" placeholder="Destino" />
        <button className="btn btn-primary">Confirmar</button>
      </div>
    ),
  },
  { id: "rating", label: "Rating", Icon: Heart },
  { id: "feed", label: "My Feed", Icon: Activity },
]

export default function MyTabs() {
  const [active, setActive] = useState("ride")

  return (
    <div>
      {/* Barra de tabs */}
      <div className="tabs overflow-x-auto flex-nowrap p-[35px_0px_20px_24px] gap-[16px]">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`tab shrink-0 flex-col h-25 w-25 gap-1 p-0 transition-all duration-300 rounded-2xl
              ${
                active === id
                  ? "bg-magentap tab-active text-primary text-white"
                  : "text-base-content/40 hover:text-base-content/70"
              }`}
          >
            <Icon
              size={28}
              className="transition-transform duration-300 hover:scale-110 "
            />
            <span className="text-xs font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo com fade */}
      {tabs.map(({ id, content }) => {
        const isActive = active === id
        const isRide = id === "ride"

        return (
          <div
            key={id}
            className={`transition-all duration-300
              ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1 hidden"
              }
              ${
                isRide
                  ? "bg-transparent border-0 p-0"
                  : "bg-base-100 border border-base-300 p-6"
              }`}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
