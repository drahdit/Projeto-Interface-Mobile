import { useEffect, useRef, useState } from "react"
import { CarFront, Mail, Heart, Activity, Flame, Zap } from "lucide-react"

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
        <h3 className="text-bold">New ride request!</h3>
        <div className="ride-card__header">
          <div className="ride-card__badges">
            <div
              className="badge w-[25px] h-[30px] flex items-center justify-center"
              aria-label="Elétrico"
            >
              <Zap size={12} stroke="var(--text-mid)" aria-hidden="true" />
            </div>
            <div
              className="badge w-[25px] h-[30px] flex items-center justify-center"
              aria-label="Popular"
            >
              <Flame size={12} stroke="var(--text-mid)" aria-hidden="true" />
            </div>
          </div>
          <div className="ride-card__passenger">
            <div className="ride-card__passenger-info">
              <span className="ride-card__passenger-name">Jeck, N.</span>
              <span className="ride-card__passenger-ratings">158 ratings</span>
            </div>
            <div className="ride-card__passenger-avatar" aria-hidden="true">
              <img src="https://i.pravatar.cc/100?img=56" alt="" />
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

        <div className="ride-route" aria-label="Rota da viagem">
          <div className="ride-route__point">
            <span className="ride-route__dot" aria-hidden="true" />
            <div className="ride-route__content">
              <span className="ride-route__city">Chicago</span>
            </div>
            <span className="ride-route__time">20:00</span>
          </div>

          <div className="ride-route__connector">
            <span className="ride-route__line-wrap" aria-hidden="true">
              <span className="ride-route__line" />
            </span>
            <span className="ride-route__label">Distance &nbsp;15, 8 km</span>
          </div>

          <div className="ride-route__point">
            <span className="ride-route__dot is-end" aria-hidden="true" />
            <div className="ride-route__content">
              <span className="ride-route__city">Oak Park</span>
            </div>
            <span className="ride-route__time">22:30</span>
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
