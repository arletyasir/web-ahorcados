import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { PALABRAS_CON_PISTAS } from './data/PALABRAS'
// Número máximo de intentos fallidos permitidos
const MAX_INTENTOS = 6

function App() {
  // Palabra actual con su pista
  const [palabraActual, setPalabraActual] = useState({ palabra: '', pista: '' })
  
  // Letras adivinadas por el jugador
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set())
  
  // Letras incorrectas
  const [letrasIncorrectas, setLetrasIncorrectas] = useState<Set<string>>(new Set())
  
  // Estado del juego
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'ganado' | 'perdido'>('jugando')
  
  // Mostrar pista

  // Inicializar el juego
  useEffect(() => {
    reiniciarJuego()
  }, [])

  // Obtener una palabra aleatoria con su pista
  const obtenerPalabraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * PALABRAS_CON_PISTAS.length)
    return PALABRAS_CON_PISTAS[indiceAleatorio]
  }

  // Reiniciar el juego
  const reiniciarJuego = () => {
    const nuevaPalabra = obtenerPalabraAleatoria()
    setPalabraActual(nuevaPalabra)
    setLetrasAdivinadas(new Set())
    setLetrasIncorrectas(new Set())
    setEstadoJuego('jugando')
  }

  // Verificar si el jugador ha ganado
  const verificarVictoria = useCallback(() => {
    if (!palabraActual.palabra) return false
    return [...palabraActual.palabra].every(letra => letrasAdivinadas.has(letra))
  }, [palabraActual.palabra, letrasAdivinadas])
  
  // Verificar si el jugador ha perdido
  const verificarDerrota = useCallback(() => {
    return letrasIncorrectas.size >= MAX_INTENTOS
  }, [letrasIncorrectas])

  // Actualizar el estado del juego cuando cambian las letras adivinadas o incorrectas
  useEffect(() => {
    if (verificarVictoria()) {
      setEstadoJuego('ganado')
    } else if (verificarDerrota()) {
      setEstadoJuego('perdido')
    }
  }, [letrasAdivinadas, letrasIncorrectas, verificarVictoria, verificarDerrota])

  // Manejar el intento de una letra
  const intentarLetra = (letra: string) => {
    if (estadoJuego !== 'jugando' || letrasAdivinadas.has(letra) || letrasIncorrectas.has(letra)) {
      return
    }

    // Convertir la letra a minúscula
    const letraMinuscula = letra.toLowerCase()
    
    if (palabraActual.palabra.includes(letraMinuscula)) {
      setLetrasAdivinadas(new Set([...letrasAdivinadas, letraMinuscula]))
    } else {
      setLetrasIncorrectas(new Set([...letrasIncorrectas, letraMinuscula]))
    }
  }

  // Manejar el evento de teclado
  useEffect(() => {
    const manejarTeclado = (e: KeyboardEvent) => {
      const letra = e.key.toLowerCase()
      if (/^[a-z]$/.test(letra)) {
        intentarLetra(letra)
      }
    }

    window.addEventListener('keydown', manejarTeclado)
    return () => {
      window.removeEventListener('keydown', manejarTeclado)
    }
  }, [intentarLetra, estadoJuego, letrasAdivinadas, letrasIncorrectas])

  // Renderizar la palabra con guiones para las letras no adivinadas
  const renderizarPalabra = () => {
    if (!palabraActual.palabra) return null
    
    return (
      <div className="palabra">
        {[...palabraActual.palabra].map((letra, index) => (
          <span key={index} className="letra">
            {letrasAdivinadas.has(letra) || estadoJuego === 'perdido' ? letra : '_'}
          </span>
        ))}
      </div>
    )
  }

  // Renderizar la pista
  const renderizarPista = () => {
    
    return (
      <div className="pista">
        <strong>Pista:</strong> {palabraActual.pista}
      </div>
    );
  }

  // Renderizar el teclado virtual
  const renderizarTeclado = () => {
    const filas = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ]

    return (
      <div className="teclado">
        {filas.map((fila, rowIndex) => (
          <div key={rowIndex} className="fila-teclado">
            {fila.map(letra => {
              const estaAdivinada = letrasAdivinadas.has(letra)
              const estaIncorrecta = letrasIncorrectas.has(letra)
              
              let className = "tecla"
              if (estaAdivinada) className += " adivinada"
              if (estaIncorrecta) className += " incorrecta"

              return (
                <button
                  key={letra}
                  className={className}
                  onClick={() => intentarLetra(letra)}
                  disabled={estaAdivinada || estaIncorrecta || estadoJuego !== 'jugando'}
                >
                  {letra}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  // Renderizar el dibujo del ahorcado
  const renderizarAhorcado = () => {
    const partes = [
      <circle key="cabeza" cx="200" cy="80" r="20" />,                  // Cabeza
      <line key="cuerpo" x1="200" y1="100" x2="200" y2="150" />,       // Cuerpo
      <line key="brazoIzq" x1="200" y1="120" x2="170" y2="140" />,     // Brazo izquierdo
      <line key="brazoDer" x1="200" y1="120" x2="230" y2="140" />,     // Brazo derecho
      <line key="piernaIzq" x1="200" y1="150" x2="170" y2="180" />,    // Pierna izquierda
      <line key="piernaDer" x1="200" y1="150" x2="230" y2="180" />     // Pierna derecha
    ]

    const numPartes = Math.min(letrasIncorrectas.size, MAX_INTENTOS)

    return (
      <div className="ahorcado-container">
        <svg width="300" height="200">
          {/* Estructura del ahorcado */}
          <line x1="50" y1="20" x2="150" y2="20" />
          <line x1="150" y1="20" x2="150" y2="50" />
          <line x1="50" y1="20" x2="50" y2="180" />
          <line x1="20" y1="180" x2="80" y2="180" />
          
          {/* Partes del cuerpo según los errores */}
          {partes.slice(0, numPartes)}
        </svg>
      </div>
    )
  }

  // Mensaje de estado del juego
  const mensajeEstado = () => {
    if (estadoJuego === 'ganado') {
      return <div className="mensaje ganado">¡Felicidades! Has ganado.</div>
    } else if (estadoJuego === 'perdido') {
      return <div className="mensaje perdido">
        Has perdido. La palabra era: <strong>{palabraActual.palabra}</strong>
      </div>
    }
    return null
  }

  return (
    <div className="App">
      <h1>Juego del Ahorcado</h1>
      
      {renderizarAhorcado()}
      
      <div className="juego-container">
        {renderizarPalabra()}
        
        <div className="intentos">
          Intentos restantes: {MAX_INTENTOS - letrasIncorrectas.size}
        </div>
        
        {renderizarPista()}
        
       
        
        {mensajeEstado()}
        
        {renderizarTeclado()}
        
        <button 
          className="boton-reiniciar" 
          onClick={reiniciarJuego}
        >
          {estadoJuego !== 'jugando' ? 'Jugar de nuevo' : 'Reiniciar juego'}
        </button>
      </div>
    </div>
  )
}

export default App