import { useState } from 'react'
import './WarningModal.css'

function WarningModal() {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="warning-overlay">
      <div className="warning-modal">
        <div className="warning-header">
          <span className="warning-icon">⚠️</span>
          <h2>Aviso Importante</h2>
        </div>
        
        <div className="warning-content">
          <p>
            <strong>Esta herramienta NO ha sido clínicamente validada.</strong> 
            Es una herramienta educativa solamente y no debe ser utilizada para diagnóstico médico.
          </p>
          
          <p>
            <strong>Datos Base:</strong> Los modelos de predicción se basan en datos de población ecuatoriana de la provincia de Loja, Ecuador. 
            Los resultados pueden no ser aplicables a otras poblaciones.
          </p>
          
          <p>
            Para diagnóstico y tratamiento de enfermedades renales, consulte siempre con un profesional de salud calificado.
          </p>
        </div>

        <button className="warning-close-button" onClick={handleClose}>
          Entendido
        </button>
      </div>
    </div>
  )
}

export default WarningModal
