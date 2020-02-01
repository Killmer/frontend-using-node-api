import React from 'react';
import classNames from 'classnames';
import {getSlug} from '../utils/getSlug';

export default function Card(props) {
  const {
    description,
    name = 'Default name',
    photo = 'https://bulma.io/images/placeholders/1280x960.png',
    _id: id,
    deleteCard,
    isEditing,
    setEditingCard,
    saveCard,
  } = props;

  const cardClasses = classNames('card', {
    'is-edited': isEditing,
  });

  const nameRef = React.createRef();
  const descriptionRef = React.createRef();

  return (
    <div className={cardClasses}>
      {!isEditing && (
        <div>
          <span className="card-delete" onClick={() => deleteCard(id)}>
            ╳
          </span>
          <span className="card-edit" onClick={() => setEditingCard(id)}>
            ✎
          </span>
        </div>
      )}
      <div className="card-image">
        <figure className="image is-16by9">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            className="js-artist-img"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p
              className="title is-4"
              data-name="name"
              contentEditable={isEditing}
              ref={nameRef}
            >
              {name}
            </p>
            <p className="subtitle is-6">{getSlug(name)}</p>
          </div>
        </div>
        <div
          className="content"
          data-name="description"
          contentEditable={isEditing}
          ref={descriptionRef}
        >
          {description || 'no description'}
        </div>
      </div>
      {isEditing && (
        <div>
          <button
            className="button js-cancel is-light"
            onClick={() => {
              setEditingCard(null);
            }}
          >
            Cancel
          </button>
          <button
            className="button js-save is-link"
            onClick={() =>
              saveCard({
                name: nameRef.current.textContent,
                description: descriptionRef.current.textContent,
                id
              })
            }
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
