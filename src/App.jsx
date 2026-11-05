import { useEffect, useState } from 'react'

const workouts = [
  { title: 'Upper Body', focus: 'Strength · 6 movements' },
  { title: 'Lower Body', focus: 'Power · 6 movements' },
  { title: 'Core Strength', focus: 'Stability · 5 movements' },
  { title: 'Cardio Burn', focus: 'Endurance · 20 minutes' },
  { title: 'Full Body', focus: 'Total strength · 7 movements' },
  { title: 'Active Recovery', focus: 'Mobility · 15 minutes' },
]

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isChatOpen && !isMenuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsChatOpen(false)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isChatOpen, isMenuOpen])

  return (
    <>
      <button
        className="menu-button"
        type="button"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="workout-menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div
        className="menu-backdrop"
        aria-hidden="true"
        hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />
      <aside
        id="workout-menu"
        className={`workout-menu${isMenuOpen ? ' workout-menu--open' : ''}`}
        aria-label="Workout menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="workout-menu-header">
          <span>WORKOUT MENU</span>
          <span className="menu-login-icon" role="img" aria-label="Login">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.5-3.4 3.2-5.5 7-5.5s6.5 2.1 7 5.5" />
            </svg>
          </span>
        </div>
      </aside>
      <section className="workouts-section" aria-labelledby="workouts-heading">
        <h2 id="workouts-heading">Workouts</h2>
        <div className="workout-cards" aria-label="Workout programs">
          {workouts.map((workout, index) => (
            <article className="workout-card" key={workout.title}>
              <span className="workout-card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{workout.title}</h3>
              <p>{workout.focus}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="phone-footer">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="8" />
          <path d="M10 9v5M10 6.2v.2" />
        </svg>
        <span>Hus&apos;L Verse.io all rights reserved 2026.</span>
      </footer>
      <div
        className="prophecii-dismiss-backdrop"
        aria-hidden="true"
        hidden={!isChatOpen}
        onClick={() => setIsChatOpen(false)}
      />
      <aside
        id="prophecii-chat-popup"
        className="prophecii-chat-popup"
        aria-labelledby="prophecii-chat-message"
        hidden={!isChatOpen}
      >
        <button
          className="prophecii-chat-close"
          type="button"
          aria-label="Close assistant message"
          onClick={() => setIsChatOpen(false)}
        >
          &times;
        </button>
        <p id="prophecii-chat-message">
          Hi! I am Prophecii, your Hus&apos;L Verse assistant, more features coming soon.
        </p>
      </aside>
      <button
        className="prophecii-chat-button"
        type="button"
        aria-label="Open Prophecii assistant"
        aria-controls="prophecii-chat-popup"
        aria-expanded={isChatOpen}
        onClick={() => setIsChatOpen((open) => !open)}
      >
        <img src="/prophecii_bubble.png" alt="" />
      </button>
    </>
  )
}