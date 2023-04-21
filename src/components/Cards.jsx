import React from 'react';
import './Card.css';
// import cardImage1 from './card-image1.png';
// import cardImage2 from './card-image2.png';
// import cardImage3 from './card-image3.png';
// import cardImage4 from './card-image4.png';
// import cardImage5 from './card-image5.png';

var cardImage1 ="data:image/jpeg;base64,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"

function Card() {
  const cards = [
    { id: 1, title: 'Card 1', image: cardImage1 },
        { id: 2, title: 'Card 2', image: cardImage1 },
        // { id: 3, title: 'Card 3', image: cardImage1 },
        // { id: 4, title: 'Card 4', image: cardImage1 },
        // { id: 5, title: 'Card 5', image: cardImage1 },
        // { id: 6, title: 'Card 6', image: cardImage1 },
        // { id: 7, title: 'Card 2', image: cardImage1 },
        // { id: 8, title: 'Card 3', image: cardImage1 },
        // { id: 9, title: 'Card 4', image: cardImage1 },
        // { id: 10, title: 'Card 5', image: cardImage1 },
        // { id: 11, title: 'Card 6', image: cardImage1 },
  ];

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image} alt={card.title} />
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">Card text goes here.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;