import { useState } from 'react';
import logo from "../nexoGamerFinal.png";
import CabeceraGlobal from '../CabeceraGlobal/CabeceraGlobal';
import JuegoConTrailer from '../JuegoConTrailer/JuegoConTrailer';
import { Link } from 'react-router-dom';
import "./JuegosNombre.css";

const JuegosNombre = () => {

    const [juego, setJuego] = useState([]);

  return (
    <div className='generalContainer'>
        <CabeceraGlobal></CabeceraGlobal>
        <div className='carteleraJuegos'>
            {juego.map((juego) => (
                <div key={juego.id}>
                    <JuegoConTrailer juego={juego} id={juego.id} />
                </div>
                ))}
            </div>
            {/* <div className="footer">
                <div className="leftFooter">
                    <Link to="/">Aviso legal</Link>
                    <Link to="/">Cookies</Link>
                </div>
                <div className="rightFooter">
                    <Link to="/"><img src={logo} alt="logo" className="miniLogo"></img></Link>
                    <Link to="/" className="sin-subrayado"><h2>NEXOGAMER</h2></Link>
                </div>
            </div> */}
        </div>
    );
};

export default JuegosNombre;