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
        let player = (<div>Loading</div>);
        if (this.state.movie != null) {
            player = (
                <div style={{background: grey900, padding: '20px'}}>
                  <video autoplay controls style={{margin: '0 auto', display: 'block'}} src={this.state.movie.link}/>
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