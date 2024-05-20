import React, { useState, useRef } from "react";
import "./LoginRegister.css";
import logo from "../nexoGamerFinal.png";
import { Link } from "react-router-dom";
import fondo from "./fondo/fondo2.mp4";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Login = () => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        contraseña: ""
    });

    const [formularioEnviado, setFormularioEnviado] = useState(false);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(videoRef.current.muted);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construir la solicitud POST con los datos del formulario
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:8000/login', requestOptions)
            .then(response => {
                if (response.status === 201) {
                    setFormularioEnviado(true);
                    setTimeout(() => setFormularioEnviado(false), 5000); // Después de 5 segundos, vuelve a establecer el formularioEnviado en falso
                    setFormData({
                        nombre: "",
                        contraseña: ""
                    }); // Limpiar los campos del formulario
                }
                return response.json();
            })
            .then(data => console.log(data));
        // Aquí podrías manejar la respuesta del servidor como desees
    };

    return (
        <>
            <script src="https://kit.fontawesome.com/19066b4921.js" crossOrigin="anonymous"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
            <div className="cabeceraRegister">
                <Link to={"/"}><img src={logo} alt="logo"></img></Link>
                <Link to={"/"} className="sin-subrayado"><h1>NEXOGAMER</h1></Link>
            </div>
            <div className="videoDerecha">
            <div className="formularioLogin">
                <h1>Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="loginForm">
                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Rubén" className="campo"></input>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="contraseña" value={formData.contraseña} onChange={handleInputChange} placeholder="S€gUr4" className="campo"></input>
                    <input type="submit" value="Enviar" className="submitLogin"></input>
                </form>
                <p>¿No tienes una cuenta? <Link to={"/register"} className="cambiarAzul">Regístrate</Link></p>
            </div>
                <video ref={videoRef} src={fondo} autoPlay loop controls={false}></video>
                    {muted ? <FontAwesomeIcon className="muted" icon={icon({ name: 'volume-xmark', family: 'classic', style: 'solid' })} onClick={toggleMute}/> : <FontAwesomeIcon className="no-muted" icon={icon({ name: 'volume-high', family: 'classic', style: 'solid' })} onClick={toggleMute}/>}
            </div>
        </>
    );
}

export default Login;