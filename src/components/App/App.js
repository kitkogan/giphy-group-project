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
    this.props.dispatch({type: "GET_SEARCH", payload:this.state.queryString});
    this.setState({queryString:''})
  }
handleChange = (event) =>{
  this.setState({
    queryString:event.target.value
  })
}

showFavorite = () =>{
  this.props.dispatch({
    type: "SHOW_FAVORITE"
  })
}

favoriteButton = (event) => {
  console.log(event.target.name)
  this.props.dispatch({
    type: 'FAVORITE',
    payload: event.target.name
  })
}

deleteFavoriteButton = (event) => {
  console.log(event.target.name)
  this.props.dispatch({
    type: 'DELETE',
    payload: event.target.name
  })
}

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        
        <input value={this.state.queryString} placeholder="Query Search" onChange={this.handleChange}></input>
        <button onClick={this.getGifs}>NEW GIF</button>
        <button onClick={this.showFavorite}>Show YO FAVS</button>
        {/* <p>{JSON.stringify(this.props.reduxState.searchReducer)}</p> */}

        {this.props.reduxState.searchReducer.data &&
        <div>{this.props.reduxState.searchReducer.data.map(gif=><li key={gif.id}><img alt={gif.url} src={gif.images.original.url} height='100px' /><button className='favoriteButton' name={gif.images.original.url} onClick={this.favoriteButton}>Add to Favs</button></li> )}</div>}
        <h2> FAVORITES </h2>
        {this.props.reduxState.favoriteReducer &&
        <div>{this.props.reduxState.favoriteReducer.map(gif=><li key={gif.id}><img alt={gif.url} src={gif.url} height='100px' />
        <button className='deleteFavoriteButton' type="submit" name={gif.id} onClick={this.deleteFavoriteButton}>Delete from Favz</button></li> )}</div>}
        
        <br></br>
        <br></br>
        
        {/* <button>Get New Gif</button> */}
      </div>
    );
  }
  
}
const mapReduxStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapReduxStateToProps)(App);
