import React from 'react';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import { white, grey200, grey900, deepOrangeA400, blueGrey200 } from 'material-ui/styles/colors';

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: null
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

    render() {
        console.log("render");
        let player = (<div></div>);
        if (this.state.movie != null) {
            player = (
                <div style={{color: white}}>
                  <div style={{background: grey900, padding: '20px'}}>
                    <video autoplay='true' controls style={{margin: '0 auto', display: 'block', width: `${(window.screen.width < 600 ? '100' : '60')}%`}} src={this.state.movie.link}/>
                  </div>
                  <div style={{color: grey200, padding: '20px'}}>
                    <h1 style={{fontSize: '2rem', marginTop: '0.4rem', marginBottom: '0.4rem', color: white}}>{this.state.movie.name} ({this.state.movie.year})</h1>
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