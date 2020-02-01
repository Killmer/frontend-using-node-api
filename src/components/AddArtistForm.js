import React, {Component, Fragment} from 'react';

export default class AddArtistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value,
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
    const {name, description} = this.state;
    const {onSubmit} = this.props;
    onSubmit({name, description});
  }


  render() {
    const {name, description} = this.state;
    const {handleChange, handleSubmit} = this;
    return (
      <Fragment>
        <div className="container">
          <div className="box">
            <form name="addArtist" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
