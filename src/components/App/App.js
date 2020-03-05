import React, { Component } from 'react';
import {connect} from 'react-redux'

class App extends Component {

  state={
    queryString:''
  }
  componentDidMount = () => {
    // this.getGifs();
  }

  getGifs = () => {
    this.props.dispatch({type: "POST_SEARCH", payload:this.state.queryString});
    this.setState({queryString:''})
  }
handleChange = (event) =>{
  this.setState({
    queryString:event.target.value
  })
}
  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        <input value={this.state.queryString} placeholder="Query Search" onChange={this.handleChange}></input>
        {/* <p>{JSON.stringify(this.props.reduxState.searchReducer)}</p> */}
        {this.props.reduxState.searchReducer.data &&
        <div>{this.props.reduxState.searchReducer.data.map(gif=><li key={gif.id}><img alt={gif.url} src={gif.images.original.url} height='100px' /></li> )}</div>}
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
