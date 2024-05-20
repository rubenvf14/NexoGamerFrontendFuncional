import React, { useState, useEffect } from 'react';
import './CabeceraJuegos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import JuegoConTrailer from '../JuegoConTrailer/JuegoConTrailer';
import { useNavigate } from 'react-router-dom';

function filtrarPorConsola(juegos, consola) {
  return juegos.filter(juego => juego.consola.toLowerCase().includes(consola.toLowerCase()));
}

function CabeceraJuegos(props) {
  const [fondoUrl, setFondoUrl] = useState('');
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [juegos, setJuegos] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [primerComentarioIndex, setPrimerComentarioIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/juegos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los juegos del backend');
        }
        const data = await response.json();
        setJuegos(data);
        if (data.length > 0 && !fondoUrl) {
          setFondoUrl(data[0].urlImagen);
        }
      } catch (error) {
        console.error('Error al obtener los juegos del backend:', error);
      }
    };

    fetchData();
  }, [fondoUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (juegos.length > 0) {
        const nextIndex = (indiceImagen + 1) % juegos.length;
        setIndiceImagen(nextIndex);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [indiceImagen, juegos]);

  useEffect(() => {
    if (juegos.length > 0) {
      setOpacity(0);
      setTimeout(() => {
        setFondoUrl(juegos[indiceImagen].urlImagen);
        setTimeout(() => {
          setOpacity(1);
        }, 100);
      }, 500);
    }
  }, [indiceImagen, juegos]);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch('http://localhost:8000/comentariosJuegos');
        if (!response.ok) {
          throw new Error('Error al obtener los comentarios del backend');
        }
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Error al obtener los comentarios del backend:', error);
      }
    };

    fetchComentarios();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPrimerComentarioIndex(prevIndex => {
        const nextIndex = (prevIndex + 5) % comentarios.length;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [comentarios]);

  const navigate = useNavigate();

  const juegosOrdenador = filtrarPorConsola(juegos, "Ordenador");
  const juegosPlayStation = filtrarPorConsola(juegos, "PlayStation");
  const juegosXbox = filtrarPorConsola(juegos, "Xbox");
  const juegosNintendo = filtrarPorConsola(juegos, "Nintendo Switch");

  const handleBackgroundClick = () => {
    if (juegos.length > 0) {
      const juegoActual = juegos[indiceImagen];
      navigate(`/juego/${juegoActual.id}`);
    }
  };

  const handleGameImageClick = (id) => {
    navigate(`/juego/${id}`);
  };

  return (
    <>
      <div className='cabeceraJuegos'>
        <div className='fondo-container' onClick={handleBackgroundClick}>
          <img
            src={fondoUrl}
            alt='imagen'
            className='fondo-imagen'
            style={{ opacity: opacity }}
            width='100%'
          />
          <div className='botones-container'>
            {juegos.map((juego, index) => (
              <button
                key={juego.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndiceImagen(index);
                }}
                className={indiceImagen === index ? 'boton-activo' : 'boton-inactivo'}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="generalBody">
        <h1 className='tendencias'>Tendencias <FontAwesomeIcon className="flecha" icon={icon({ name: 'chevron-right', family: 'classic', style: 'solid' })} /></h1>
        <div className="carteleraJuegos">
          {juegos.map((juego, key) => (
            <div className='juego' key={key}>
              <div className='miniCartelera' onMouseEnter={() => setReproduciendo(true)} onMouseLeave={() => setReproduciendo(false)}>
                {reproduciendo && <JuegoConTrailer juego={juego} />}
                <div className='contenedorImagen' onClick={() => handleGameImageClick(juego.id)}>
                  <img src={juego.urlImagen} alt='foto' className='miniCarteleras'></img>
                  {juego.rebaja !== 0 && <div className='etiquetaNaranja'>-{juego.rebaja}%</div>}
                </div>
              </div>
              <div className='texto'>
                <p className='nombre'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</p>
                {juego.precio === "0.00" ? <p className="precio">Gratuito</p> : <p className="precio">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='comentarios' ref={props.ordenadorRef}>
        {comentarios.slice(primerComentarioIndex, primerComentarioIndex + 5).map((comentario, index) => (
          <div key={index} className={`comentario`}>
            <div className='infoComentarios'>
              <div className='circulo'>
                <FontAwesomeIcon className="user2" icon={icon({ name: 'user', family: 'classic', style: 'solid' })} />
              </div>
              <h3 className='tituloJuego'>{comentario.juegoNombre.length > 21 ? comentario.juegoNombre.substring(0, 21) + '...' : comentario.juegoNombre}</h3>
            </div>
            <p className='textoComentario'>{comentario.comentario}</p>
          </div>
        ))}
      </div>
      <div className='generalBody'>
        <h1 className='tendencias'>Ordenador <FontAwesomeIcon className="flecha" icon={icon({ name: 'chevron-right', family: 'classic', style: 'solid' })} /></h1>
        <div className="carteleraJuegos">
          {juegosOrdenador.map((juego, key) => (
            <div className='juego' key={key}>
              <div className='miniCartelera' onMouseEnter={() => setReproduciendo(true)} onMouseLeave={() => setReproduciendo(false)}>
                {reproduciendo && <JuegoConTrailer juego={juego} />}
                <div className='contenedorImagen' onClick={() => handleGameImageClick(juego.id)}>
                  <img src={juego.urlImagen} alt='foto' className='miniCarteleras'></img>
                  {juego.rebaja !== 0 && <div className='etiquetaNaranja'>-{juego.rebaja}%</div>}
                </div>
              </div>
              <div className='texto'>
                <p className='nombre'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</p>
                {juego.precio === "0.00" ? <p className="precio">Gratuito</p> : <p className="precio">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='generalBody' ref={props.playstationRef}>
        <h1 className='tendencias'>PlayStation <FontAwesomeIcon className="flecha" icon={icon({ name: 'chevron-right', family: 'classic', style: 'solid' })} /></h1>
        <div className="carteleraJuegos">
          {juegosPlayStation.map((juego, key) => (
            <div className='juego' key={key}>
              <div className='miniCartelera' onMouseEnter={() => setReproduciendo(true)} onMouseLeave={() => setReproduciendo(false)}>
                {reproduciendo && <JuegoConTrailer juego={juego} />}
                <div className='contenedorImagen' onClick={() => handleGameImageClick(juego.id)}>
                  <img src={juego.urlImagen} alt='foto' className='miniCarteleras'></img>
                  {juego.rebaja !== 0 && <div className='etiquetaNaranja'>-{juego.rebaja}%</div>}
                </div>
              </div>
              <div className='texto'>
                <p className='nombre'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</p>
                {juego.precio === "0.00" ? <p className="precio">Gratuito</p> : <p className="precio">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='generalBody'  ref={props.xboxRef}>
        <h1 className='tendencias'>Xbox <FontAwesomeIcon className="flecha" icon={icon({ name: 'chevron-right', family: 'classic', style: 'solid' })} /></h1>
        <div className="carteleraJuegos">
          {juegosXbox.map((juego, key) => (
            <div className='juego' key={key}>
              <div className='miniCartelera' onMouseEnter={() => setReproduciendo(true)} onMouseLeave={() => setReproduciendo(false)}>
                {reproduciendo && <JuegoConTrailer juego={juego} />}
                <div className='contenedorImagen' onClick={() => handleGameImageClick(juego.id)}>
                  <img src={juego.urlImagen} alt='foto' className='miniCarteleras'></img>
                  {juego.rebaja !== 0 && <div className='etiquetaNaranja'>-{juego.rebaja}%</div>}
                </div>
              </div>
              <div className='texto'>
                <p className='nombre'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</p>
                {juego.precio === "0.00" ? <p className="precio">Gratuito</p> : <p className="precio">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='generalBody' ref={props.nintendoRef}>
        <h1 className='tendencias'>Nintendo Switch <FontAwesomeIcon className="flecha" icon={icon({ name: 'chevron-right', family: 'classic', style: 'solid' })} /></h1>
        <div className="carteleraJuegos">
          {juegosNintendo.map((juego, key) => (
            <div className='juego' key={key}>
              <div className='miniCartelera' onMouseEnter={() => setReproduciendo(true)} onMouseLeave={() => setReproduciendo(false)}>
                {reproduciendo && <JuegoConTrailer juego={juego} />}
                <div className='contenedorImagen' onClick={() => handleGameImageClick(juego.id)}>
                  <img src={juego.urlImagen} alt='foto' className='miniCarteleras'></img>
                  {juego.rebaja !== 0 && <div className='etiquetaNaranja'>-{juego.rebaja}%</div>}
                </div>
              </div>
              <div className='texto'>
                <p className='nombre'>{juego.nombre.length > 20 ? juego.nombre.substring(0, 20) + '...' : juego.nombre}</p>
                {juego.precio === "0.00" ? <p className="precio">Gratuito</p> : <p className="precio">{(juego.precio - (juego.precio * (juego.rebaja / 100))).toFixed(2)}€</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CabeceraJuegos;