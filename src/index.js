import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import Cards from './components/Cards';
import AddArtistForm from './components/AddArtistForm';
import {
  getArtists,
  deleteArtist,
  updateArtist,
  addArtist,
} from './utils/artistAPI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      activeCard: null,
      formKey: 'default',
      activeRoute: 'artists',
    };

    this.deleteCard = this.deleteCard.bind(this);
    this.setEditingCard = this.setEditingCard.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.setActiveRoute = this.setActiveRoute.bind(this);
  }
  componentDidMount() {
    getArtists().then(artists => {
      this.setState(() => ({artists}));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('current', this.state);
    // console.log('previous', prevState);
  }

  deleteCard(id) {
    deleteArtist(id)
      .then(() => {
        this.setState(state => ({
          artists: state.artists.filter(artist => {
            return artist._id !== id;
          }),
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveCard({name, description, id}) {
    const updatedArtistData = new FormData();
    updatedArtistData.append('name', name);
    updatedArtistData.append('description', description);

    if (!id) {
      addArtist(updatedArtistData)
        .then((artist) => {
          this.setState(state => ({
            formKey: artist._id,
            artists: [...state.artists, artist]
          }));
        })
        .catch(e => {
          console.log(e);
        });
      return;
    }

    updateArtist(id, updatedArtistData)
      .then(() => {
        this.setState(state => ({
          activeCard: null,
          artists: state.artists.map(artist => {
            if (artist._id !== id) {
              return artist;
            }
            return {
              ...artist,
              name,
              description,
            };
          }),
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  setEditingCard(id) {
    this.setState(state => ({activeCard: id}));
  }

  setActiveRoute(activeRoute) {
    this.setState({
      activeRoute,
    });
  }

  render() {
    const {artists, activeCard, formKey, activeRoute} = this.state;
    return (
      <Fragment>
        <div>
          <Link
            active={activeRoute !== 'addArtist'}
            onClick={() => this.setActiveRoute('addArtist')}
          >
            addArtist
          </Link>
          <br />
          <Link
            active={activeRoute !== 'artists'}
            onClick={() => this.setActiveRoute('artists')}
          >
            artists
          </Link>
        </div>
        {activeRoute === 'addArtist' && (
          <AddArtistForm onSubmit={this.saveCard} key={formKey} />
        )}
        {activeRoute === 'artists' && (
          <Cards
            artists={artists}
            activeCard={activeCard}
            deleteCard={this.deleteCard}
            setEditingCard={this.setEditingCard}
            saveCard={this.saveCard}
          />
        )}
      </Fragment>
    );
  }
}

const Link = ({active, children, onClick}) => {
  if (active) {
    return <a onClick={onClick}>{children}</a>;
  }
  return <span>{children}</span>;
};

ReactDom.render(<App />, document.getElementById('root'));
