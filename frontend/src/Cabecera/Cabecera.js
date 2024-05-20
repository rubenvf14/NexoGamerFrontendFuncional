import React, { useState, useEffect, useRef } from "react";
import logo from "../nexoGamerFinal.png";
import "./Cabecera.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CabeceraJuegos from "./CabeceraJuegos";

const Cabecera = ({ fondoUrl}) => {
    const { nombre } = useParams();
    const [juego, setJuego] = useState([]);
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrolledUp, setScrolledUp] = useState(false);

    // Ref para la sección Ordenador en CabeceraJuegos
    const ordenadorRef = useRef("ordenador");
    const playstationRef = useRef("playstation");
    const xboxRef = useRef("xbox");
    const nintendoRef = useRef("nintendo");

    const handleMenuClick = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/juegosNombre?nombre=${nombre}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener el juego del backend');
                }
                const data = await response.json();
                setJuego(data);
            } catch (error) {
                console.error('Error al obtener el juego del backend:', error);
            }
        };

        fetchData();
    }, [nombre]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
            setScrolledUp(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBusqueda = () => {
        navigate(`/juegosNombre/${busqueda}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleBusqueda();
        }
    };

    const handleSearchButtonClick = () => {
        handleBusqueda();
    };

    return (
        <>
            <script src="https://kit.fontawesome.com/19066b4921.js" crossOrigin="anonymous"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
            <div className={`cabecera ${isScrolled ? 'scroll' : ''}`}>
                <div>
                    <Link to="/"><img src={logo} alt="logo"></img></Link>
                    <div className={`container ${scrolledUp ? 'hide' : ''}`}>
                        <Link to={"/"} className="sin-subrayado"><h1>NEXOGAMER</h1></Link>
                    </div>
                    <div className={`container ${scrolledUp ? '' : 'hide'}`}>
                        <div className={`buscar ${scrolledUp ? 'movido' : ''}`}>
                            <input type="text" className="buscador" placeholder="GTA V, Stardew Valley..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyDown={handleKeyDown} required />
                            <div className={`btn ${scrolledUp ? 'move' : ''}`} onClick={handleSearchButtonClick}>
                                <FontAwesomeIcon className="lupa" icon={icon({ name: 'magnifying-glass', family: 'classic', style: 'solid' })} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className={`container ${scrolledUp ? 'show' : ''}`}>
                        <div className={`buscar ${scrolledUp ? 'hide' : ''}`}>
                            <input type="text" placeholder="GTA V, Stardew Valley..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyDown={handleKeyDown} required />
                            <div className={`btn ${scrolledUp ? 'move' : ''}`} onClick={handleSearchButtonClick}>
                                <FontAwesomeIcon className="lupa" icon={icon({ name: 'magnifying-glass', family: 'classic', style: 'solid' })} />
                            </div>
                        </div>
                        <ul className={`menu-list ${scrolledUp ? 'scrolled-up' : ''}`}>
                            <li onClick={() => handleMenuClick(ordenadorRef)}>Ordenador</li>
                            <li onClick={() => handleMenuClick(playstationRef)}>PlayStation</li>
                            <li onClick={() => handleMenuClick(xboxRef)}>Xbox</li>
                            <li onClick={() => handleMenuClick(nintendoRef)}>Nintendo Switch</li>
                        </ul>
                    </div>
                </div>
                <div className="iconos">
                <Link to={"/register"} className="sin-subrayado"><div className="registrarse">
                        <FontAwesomeIcon className="right-to-bracket" icon={icon({ name: 'right-to-bracket', family: 'classic', style: 'solid' })} />
                        <p className="texto">Regístrate</p>
                    </div></Link>
                <Link to={"/login"} className="sin-subrayado"><div className="login">
                        <FontAwesomeIcon className="user" icon={icon({ name: 'user', family: 'classic', style: 'solid' })} />
                        <p className="texto">Iniciar sesión</p>
                    </div></Link>
                <Link to={"/carrito"} className="sin-subrayado"><div className="carrito">
                        <FontAwesomeIcon className="cart-shopping" icon={icon({ name: 'cart-shopping', family: 'classic', style: 'solid' })} />
                        <p className="texto">Tus compras</p>
                    </div></Link>
                </div>
            </div>
            {/* Aquí pasamos la función handleMenuClick como prop */}
            <CabeceraJuegos fondoUrl={fondoUrl} ordenadorRef={ordenadorRef} playstationRef={playstationRef} xboxRef={xboxRef} nintendoRef={nintendoRef} handleMenuClick={handleMenuClick}/>
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

export default Cabecera;
