import React from 'react';
import Movie from './Movie';
import { white } from 'material-ui/styles/colors';

export default class GenreSuggestions extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
        <div style={Object.assign({}, this.props.style)}>
            <h2 style={{color: white}}>{this.props.title}</h2>
            <div style={{overflowX: 'auto', overflowY: 'none', whiteSpace: 'nowrap'}}>
            {this.props.items.map(function(item, index, source) {
                return <Movie key={index} title={item.title} image={item.image} subtitle={item.year} first={index == 0} last={index == source.length - 1} small={true}/>
            }, this)}
            </div>  
        </div>
      );
    }
}