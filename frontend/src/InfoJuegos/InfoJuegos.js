import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./InfoJuegos.css";
import CabeceraGlobal from '../CabeceraGlobal/CabeceraGlobal';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import logo from "../nexoGamerFinal.png";

const InfoJuegos = () => {
  const parametro = useParams(); 
  const [juego, setJuego] = useState(null);
  const [comentario, setComentario] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [errorAlEnviar, setErrorAlEnviar] = useState(false);

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const response = await fetch('http://localhost:8000/juegos');
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        const data = await response.json();
        const idEntero = parseInt(parametro.id);
        const juegoEncontrado = data.find(juego => juego.id === idEntero);
        if (juegoEncontrado) {
          setJuego(juegoEncontrado);
        } else {
          throw new Error(`No se encontró ningún juego con el ID ${parametro.id}`);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del juego:', error);
      }
    };
  
    fetchJuego();
  }, [parametro.id]);

  const enviarComentario = async () => {
    try {
      const response = await fetch('http://localhost:8000/agregarComentario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comentario: comentario,
          juegoId: parametro.id,
          userId: 1
        })
      });
      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }
      const data = await response.json();
      console.log(data);
      setMostrarExito(true); 
      setTimeout(() => {
        setMostrarExito(false); // Ocultar mensaje de éxito después de 5 segundos
      }, 5000);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      setMostrarExito(false);
      setErrorAlEnviar(true); // Establecer errorEnRespuesta en true si hay un error al obtener los juegos
      setTimeout(() => {
        setErrorAlEnviar(false); // Ocultar mensaje de error después de 5 segundos
      }, 5000);
    }
  };
  

  const handleEnviarComentario = async () => {
    if (comentario.trim() !== '') {
      await enviarComentario();
      setComentario('');
    }
  };


  return (
    <>
      <CabeceraGlobal />
      <div className='generalContainer2'>
        {juego && (
          <div className='information1'>
            <div className='contenedorImagen'>
              <Link to="/inicio"><img src={juego.urlImagen} alt={juego.nombre} /></Link>
              {juego.rebaja !== 0 && <div className='etiquetaNaranja2'>-{juego.rebaja}%</div>}
            </div>
            <div className='texto'>
              <h2 className='nombre2'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</h2>
              {juego.precio === "0.00" ? <h2 className="precio2">Gratuito</h2> : <h2 className="precio2">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</h2>}
            </div>
          </div>
        )}
        {juego && (
          <div className="information2">
            <div>
              <h2>Descripción</h2>
              <p>{juego.descripcion}</p>
              <div className='moreInformation'>
                <div className='gender'>
                  <h2>{juego.genero.includes('/') ? 'Géneros' : 'Género'}</h2>
                  <p className='centrado'>{juego.genero}</p>
                </div>
                <div className='plataforma'>
                  <div className='plataformas-container'>
                    <h2>{juego.consola.includes('/') ? 'Plataformas' : 'Plataforma'}</h2>
                      <div className='plataformas-list'>
                        {juego.consola.split('/').map((consola, index) => (
                          <div key={index} className='plataforma-item'>{consola.trim()}</div>
                        ))}
                      </div>
                    </div>
                </div>
                <div className='compañia'>
                  <div className="companias-container">
                    <h2>{juego.compañia.includes(',') ? 'Compañías' : 'Compañía'}</h2>
                    <div className='companias-list'>
                      {juego.compañia.split(',').map((compania, index) => (
                        <div key={index} className='compania-item'>{compania.trim()}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='estrellas'>
                <h2>Valoración</h2>
                <StarRating rating={juego.valoracion} size={24}></StarRating>
              </div>
              {!mostrarExito && !errorAlEnviar && (
                <div className={`añadirComentario ${mostrarExito ? 'fadeOut' : 'fadeIn'}`}>
                  <h2>¡Añade aquí tu comentario!</h2>
                  <div className='comentarioFinal'>
                    <textarea
                      alt='comentario'
                      className={`comentarioAñadido ${mostrarExito ? 'fadeOut' : 'fadeIn'}`}
                      maxLength={200}
                      placeholder='Pon el mejor comentario que se te ocurra :D'
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleEnviarComentario();
                        }
                      }}
                    ></textarea>
                    <div onClick={handleEnviarComentario}><FontAwesomeIcon className="paper-plane" icon={icon({ name: 'paper-plane', family: 'classic', style: 'solid' })} /></div>
                  </div>
                </div>
              )}
              {mostrarExito && (
                <div className={`exito ${mostrarExito ? 'fadeIn' : 'fadeOut'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="#00FF00" strokeWidth="2" />
                    <path d="M7.5 12.5l3.5 3.5 6-6" strokeWidth="2.5"></path>
                  </svg>
                  <h2>¡Comentario enviado con éxito!</h2>
                </div>
              )}
          {errorAlEnviar && (
            <div className={`error ${errorAlEnviar ? 'fadeIn' : 'fadeOut'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" fill="none" stroke="#FF0000" strokeWidth="2" />
                <line x1="15" y1="9" x2="9" y2="15" stroke="red" strokeWidth="2" style={{ animation: `drawSlash1 1.5s ease-in-out forwards` }} />
                <line x1="9" y1="9" x2="15" y2="15" stroke="red" strokeWidth="2" style={{ animation: `drawSlash2 1.5s ease-in-out forwards` }} />
              </svg>
              <h2>¡Error al enviar el comentario!</h2>
            </div>
            )}
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <div className="leftFooter">
          <Link to="/">Aviso legal</Link>
          <Link to="/">Cookies</Link>
        </div>
        <div className="rightFooter">
          <Link to="/"><img src={logo} alt="logo" className="miniLogo"></img></Link>
          <Link to="/" className="sin-subrayado"><h2>NEXOGAMER</h2></Link>
        </div>
      </div>
    </>
  );
}

export default InfoJuegos;