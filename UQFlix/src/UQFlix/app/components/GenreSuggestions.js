import React from 'react';
import Movie from './Movie';
import { white } from 'material-ui/styles/colors';

export default class GenreSuggestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestionCount: 10,
            suggestions: []
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        var that = this;
        fetch(`api/movies/genre/${this.props.title}/${this.state.suggestionCount}`).then(function(response) {
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
        <div style={Object.assign({}, this.props.style)}>
            <h2 style={{color: white}}>{this.props.title}</h2>
            <div style={{overflowX: 'auto', overflowY: 'none', whiteSpace: 'nowrap'}}>
            {this.state.suggestions.map(function(item, index, source) {
                return <Movie key={index} title={item.name} image={item.poster} subtitle={item.year} first={index == 0} last={index == source.length - 1} url={item.link} small={true}/>
            }, this)}
            </div>  
        </div>
      );
    }
}