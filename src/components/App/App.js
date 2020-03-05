import React, { Component } from 'react';
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount = () => {
    // this.getGifs();
  }

  getGifs = () => {
    this.props.dispatch({type: "GET_SEARCH"})
  }

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        <p>{JSON.stringify(this.props.reduxState.searchReducer)}</p>
        {this.props.reduxState.searchReducer.data &&
        <img alt='gif' src={this.props.reduxState.searchReducer.data.image_url} height='400px'/>}
        <br></br>
        <br></br>
        <button onClick={this.getGifs}>NEW GIF</button>
        {/* <button>Get New Gif</button> */}
      </div>
    );
  }
  
}
const mapReduxStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(App);
