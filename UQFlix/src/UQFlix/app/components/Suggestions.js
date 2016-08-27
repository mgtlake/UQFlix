import React from 'react';
import Movie from './Movie';
import { white } from 'material-ui/styles/colors';

export default class Suggestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [
                {
                    title: "Hurt Locker",
                    year: "2009",
                    description: "Shooty shooty pew pew!",
                    image: "https://upload.wikimedia.org/wikipedia/en/6/6c/HLposterUSA2.jpg"
                },
                {
                    title: "Iron Man",
                    year: "2008",
                    description: "OMG its Robert Downey Jr.!",
                    image: "https://upload.wikimedia.org/wikipedia/en/7/70/Ironmanposter.JPG"
                },
                {
                    title: "Inception",
                    year: "2010",
                    description: "Movie in a movie, wot?!?",
                    image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
                }
            ]
        };
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
                    return <Movie key={index} title={suggestion.title} image={suggestion.image} subtitle={suggestion.year} first={index == 0} last={index == source.length - 1}/>
                }, this)}
            </div>
          </div>
      );
    }
}