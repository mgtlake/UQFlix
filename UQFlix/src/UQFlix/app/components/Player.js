import React from 'react';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import StarEmpty from 'material-ui/svg-icons/toggle/star-border';
import StarSelected from 'material-ui/svg-icons/toggle/star';
import { white, grey200, grey900, deepOrangeA400, blueGrey200, yellow300 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            rating: 0
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        var that = this;
        fetch(`/api/movies/movie/${this.props.params.movie}`).then(function(response) {
            response.json().then(function(json) {
                that.setState({movie: json});
            })
        })
    }

    setRating(rating) {
        var that = this;
        this.setState({rating: rating});
        fetch(`/api/movies/rate/${this.props.params.movie}/${rating * 2}`).then(function(response) {
            console.log("Rated");
        })
    }

    render() {
        var that = this;
        let player = (<div></div>);
        let starStyle = {color: yellow300, width: '24px', height: '24px', padding: '0px', margin: '12px'}
        let ratings = (
            <span style={{marginLeft: '40px'}}>
                <IconButton onClick={function() {that.setRating.call(that, 1)}} iconStyle={{color: yellow300}} style={starStyle}>{this.state.rating >= 1 ? <StarSelected/> : <StarEmpty/>}</IconButton>
                <IconButton onClick={function() {that.setRating.call(that, 2)}} iconStyle={{color: yellow300}} style={starStyle}>{this.state.rating >= 2 ? <StarSelected/> : <StarEmpty/>}</IconButton>
                <IconButton onClick={function() {that.setRating.call(that, 3)}} iconStyle={{color: yellow300}} style={starStyle}>{this.state.rating >= 3 ? <StarSelected/> : <StarEmpty/>}</IconButton>
                <IconButton onClick={function() {that.setRating.call(that, 4)}} iconStyle={{color: yellow300}} style={starStyle}>{this.state.rating >= 4 ? <StarSelected/> : <StarEmpty/>}</IconButton>
                <IconButton onClick={function() {that.setRating.call(that, 5)}} iconStyle={{color: yellow300}} style={starStyle}>{this.state.rating >= 5 ? <StarSelected/> : <StarEmpty/>}</IconButton>
            </span>
        );
        if (this.state.movie != null) {
            player = (
                <div style={{color: white}}>
                  <div style={{background: grey900, padding: '20px'}}>
                    <video autoplay='true' controls style={{margin: '0 auto', display: 'block', width: `${(window.screen.width < 600 ? '100' : '60')}%`}} src={this.state.movie.link}/>
                  </div>
                  <div style={{color: grey200, padding: '20px'}}>
                    <h1 style={{fontSize: '2rem', marginTop: '0.4rem', marginBottom: '0.4rem', color: white}}>{this.state.movie.name} ({this.state.movie.year}){ratings}</h1>
                    <h1 style={{fontSize: '1.25rem', marginTop: '0.4rem', marginBottom: '0.4rem', color: white}}>Directed by {this.state.movie.director}</h1>
                    <small style={{marginTop: '0.4rem', marginBottom: '0.4rem'}}>{this.state.movie.genre.split('|').join(', ')}</small>
                    <p style={{marginTop: '0.4rem', marginBottom: '0.4rem'}}>{this.state.movie.description}</p>
                  </div>
                </div>
            );
        }
        return (
          <div>
            {player}
          </div>
      );
    }
}