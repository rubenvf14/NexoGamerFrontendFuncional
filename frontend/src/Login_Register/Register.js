import React, { useState, useRef, useEffect } from "react";
import "./LoginRegister.css";
import logo from "../nexoGamerFinal.png";
import { Link } from "react-router-dom";
import fondo from "./fondo/fondo.mp4";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Register = () => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        contraseña: "",
        telefono: "",
        email: ""
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
        fetch('http://localhost:8000/register', requestOptions)
            .then(response => {
                if (response.ok) {
                    setFormularioEnviado(true);
                    setTimeout(() => setFormularioEnviado(false), 5000); // Después de 5 segundos, vuelve a establecer el formularioEnviado en falso
                    setFormData({
                        nombre: "",
                        apellidos: "",
                        contraseña: "",
                        telefono: "",
                        email: ""
                    }); // Limpiar los campos del formulario
                } else {
                    throw new Error('No se pudo registrar el usuario');
                }
            })
            .catch(error => console.error('Error al registrar usuario:', error));
    };

    useEffect(() => {
        if (formularioEnviado) {
            setTimeout(() => setFormularioEnviado(false), 5000);
        }
    }, [formularioEnviado]);

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
                <div className="formularioRegistro" style={{ position: "relative" }}>
                    {!formularioEnviado && (
                        <>
                            <h1>Regístrate</h1>
                            <form onSubmit={handleSubmit} className="registroForm">
                                <label htmlFor="nombre">Nombre de usuario</label>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Rubén" className="campo"></input>
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} placeholder="Varela" className="campo"></input>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" name="contraseña" value={formData.contraseña} onChange={handleInputChange} placeholder="S€gUr4" className="campo"></input>
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="number" id="telefono" name="telefono" value={formData.telefono} onChange={(e) => {
                                const inputTelefono = e.target.value.slice(0, 9); // Limita la longitud a 9 dígitos
                                    setFormData({
                                        ...formData,
                                        telefono: inputTelefono
                                    });
                                    }} 
                                placeholder="634597141" 
                                className="campo"
                                />
                                <label htmlFor="gmail">Correo electrónico</label>
                                <input type="email" id="gmail" name="email" value={formData.email} onChange={handleInputChange} placeholder="ruben@gmail.com" className="campo"></input>
                                <input type="submit" value="Enviar" className="submitRegister"></input>
                            </form>
                            <p>¿Ya tienes una cuenta? <Link to={"/login"} className="cambiarAzul">Inicia sesión</Link></p>
                        </>
                    )}
                    {formularioEnviado && (<div>
                        <div>
                            <div className="circle"  style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}></div>
                            <div className="check"></div>
                            <h2 className="sendInformation">¡Cuenta creada con éxito!</h2>
                        </div>      
                    </div>)}
                </div>
                <video ref={videoRef} src={fondo} autoPlay loop controls={false}></video>
                {muted ? <FontAwesomeIcon className="muted" icon={icon({ name: 'volume-xmark', family: 'classic', style: 'solid' })} onClick={toggleMute}/> : <FontAwesomeIcon className="no-muted" icon={icon({ name: 'volume-high', family: 'classic', style: 'solid' })} onClick={toggleMute}/>}
            </div>
        </>
    );
}

export default Register;