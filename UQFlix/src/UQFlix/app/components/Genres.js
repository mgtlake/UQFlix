import React from 'react';
import GenreSuggestions from './GenreSuggestions';
import { white } from 'material-ui/styles/colors';

export default class Genres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: []
        };
    }

    componentDidMount() {
        this.update();
    }

    update() {
        var that = this;
        fetch(`api/movies/genres`).then(function(response) {
            response.json().then(function(json) {
                that.setState({genres: json});
            })
        })
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
          <div style={{padding: '20px'}}>
            <h2 style={{color: white, fontSize: '2rem', marginTop: '0px'}}>Genres</h2>
            {this.state.genres.map(function(item, index, source) {
                return <GenreSuggestions style={{padding: `${index == 0 ? '0px' : '20px'} 0px ${index == source.length - 1 ? '0px' : '20px'} 0px`}} key={index} title={item.genre}/>
            }, this)}
          </div>
      );
    }
}