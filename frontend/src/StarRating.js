import React from 'react';

const StarRating = ({ rating, size }) => {
  const starStyle = {
    width: size,
    height: size,
    display: 'inline-block',
    color: '#FFD700',
  };

  // Redondea la puntuación al entero más cercano
  const roundedRating = Math.round(rating);

  // Crea una lista de estrellas
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<span key={i} style={starStyle}>&#9733;</span>); // Estrella rellena si i es menor que la puntuación redondeada
    } else if (i === roundedRating && rating % 1 !== 0) {
      stars.push(<span key={i} style={starStyle}>&#9734;</span>); // Estrella media si i es igual a la puntuación redondeada y la puntuación no es entera
    } else {
      stars.push(<span key={i} style={{...starStyle, color: '#C0C0C0'}}>&#9734;</span>); // Estrella vacía en otro caso
    }
  }

  return (
    <div style={{ fontSize: size }}>
      {stars}
    </div>
  );
}

export default StarRating;