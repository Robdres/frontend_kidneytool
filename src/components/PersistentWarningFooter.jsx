import './PersistentWarningFooter.css'

function PersistentWarningFooter() {
  return (
    <footer className="persistent-warning-footer">
      <div className="warning-footer-content">
        <div className="warning-footer-icon">⚠️</div>
        <div className="warning-footer-text">
          <strong>Aviso Legal:</strong> Esta herramienta es educativa solamente y no ha sido clínicamente validada. 
          Los datos se basan en población ecuatoriana de Loja, Ecuador. Consulte con un profesional de salud calificado para diagnóstico y tratamiento.
        </div>
      </div>
    </footer>
  )
}

export default PersistentWarningFooter
