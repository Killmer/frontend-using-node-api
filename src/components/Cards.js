import React, {Fragment} from 'react';

import CardDeck from './CardDeck';
import Card from './Card';

export default function Cards({artists, activeCard, deleteCard, setEditingCard, saveCard}) {
  return (
    <CardDeck>
      {activeCard !== null && (
        <div
          className="overlay"
          onClick={() => {
            setEditingCard(null);
          }}
        ></div>
      )}
      {artists ? (
        artists.map((artist, index) => {
          return (
            <Card
              {...artist}
              key={index}
              deleteCard={deleteCard}
              isEditing={artist._id === activeCard}
              setEditingCard={setEditingCard}
              saveCard={saveCard}
            />
          );
        })
      ) : (
        <Fragment>
          <h1>Hello React ⚛️</h1>
          <p>Loading...</p>
        </Fragment>
      )}
    </CardDeck>
  );
}
