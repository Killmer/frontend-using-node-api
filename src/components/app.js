import React, { Component, Fragment } from 'react';
import Card  from './Card';
import { getArtists } from '../utils/artistAPI';

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        artists: null,
      };
  
      this.deleteCard = this.deleteCard.bind(this);
      this.toggleEditing = this.toggleEditing.bind(this);
    }
    componentDidMount() {
      getArtists().then(artists => {
        this.setState(() => ({artists}));
      });
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log('current', this.state);
      console.log('previous', prevState);
    }
  
    deleteCard(id) { 
      deleteArtist(id)
      .then(() => {
          console.log('deleted');
          this.setState((state) => ({
              artists: state.artists.filter((artist) => {
                  return artist._id !== id
              })
          }))
      })
      .catch((e) => {
          console.log(e);
      })
    }
  
    toggleEditing(isEditing) { 
        console.log(isEditing);
      if(isEditing === 'false') {
          isEditing = 'true';
          console.log( 'now is '+ isEditing);
      }
      if(isEditing === 'true') {
          isEditing = 'false';
       console.log( 'now is '+ isEditing);
      }
    }
  
    render() {
      const {artists} = this.state;
      console.log('render');
  
      return (
        <Fragment>
          <h1>Hello React ⚛️</h1>
          {artists ? (
            artists.map((artist, index) => {
              return <Card {...artist} key={index} deleteCard={this.deleteCard} isEditing='false' toggleEditing={this.toggleEditing} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </Fragment>
      );
    }
  }
