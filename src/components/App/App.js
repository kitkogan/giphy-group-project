import React, { Component } from 'react';
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount = () => {
    this.getGifs();
  }

  getGifs() {
    this.props.dispatch({type: "GET_SEARCH"})
  }

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        <p>{JSON.stringify(this.props.reduxState.searchReducer)}</p>
        <button>Get New Gif</button>
      </div>
    );
  }
  
}
const mapStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapStateToProps)(App);
