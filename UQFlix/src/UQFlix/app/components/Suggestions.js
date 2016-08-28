import React from 'react';
import Movie from './Movie';
import { white } from 'material-ui/styles/colors';

export default class Suggestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestionCount: 10,
            suggestions: []
        };
    }

    componentDidMount() {
        this.update();
    }

    update() {
        var that = this;
        fetch(`api/movies/suggested/${this.state.suggestionCount}`).then(function(response) {
            response.json().then(function(json) {
                that.setState({suggestions: json.map(function(item, index, source) { return item.value })});
            })
        })
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
          <div style={{padding: '20px'}}>
            <h2 style={{color: white, fontSize: '2rem', marginTop: '0px'}}>Suggestions</h2>
            <div style={{overflowX: 'auto', overflowY: 'none', whiteSpace: 'nowrap'}}>
                {this.state.suggestions.map(function(suggestion, index, source) {
                    return <Movie key={suggestion.name} title={suggestion.name} image={suggestion.poster} subtitle={suggestion.year} first={index == 0} url={suggestion.link} last={index == source.length - 1}/>
                }, this)}
            </div>
          </div>
      );
    }
}