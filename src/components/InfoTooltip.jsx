import { useState } from 'react'
import './InfoTooltip.css'

function InfoTooltip({ content, link, linkText }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTooltip = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('tooltip-overlay')) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="info-button"
        onClick={toggleTooltip}
        aria-label="Más información"
      >
        ℹ️
      </button>

      {isOpen && (
        <div className="tooltip-overlay" onClick={handleClickOutside}>
          <div className="tooltip-modal">
            <div className="tooltip-header">
              <h4>Información</h4>
              <button
                type="button"
                className="tooltip-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="tooltip-content">
              <p>{content}</p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tooltip-link"
                >
                  {linkText || 'Más información →'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoTooltip
