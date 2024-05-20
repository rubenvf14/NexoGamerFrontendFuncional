import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Cabecera/Cabecera';
import JuegosNombre from './JuegosNombre/JuegosNombre';
import Carrito from './Carrito/Carrito';

function App() {
  return (
    <div className="NexoGamer">
      <BrowserRouter>
        <Routes>
          <Route index element={<Inicio></Inicio>}></Route>
          <Route path="/inicio" element={<Inicio></Inicio>}></Route>
          <Route path="juegosNombre/:juego" element={<JuegosNombre></JuegosNombre>}></Route>
          <Route path='carrito' element={<Carrito></Carrito>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
