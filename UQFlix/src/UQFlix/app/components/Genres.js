import React from 'react';
import GenreSuggestions from './GenreSuggestions';
import { white } from 'material-ui/styles/colors';

export default class Genres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [
                {
                    title: "Action",
                    items: [
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
                },
                {
                    title: "Drama",
                    items: [
                        {
                            title: "Pulp Fiction",
                            year: "1994",
                            description: "Two mob hitmen",
                            image: "https://upload.wikimedia.org/wikipedia/en/8/82/Pulp_Fiction_cover.jpg"
                        },
                        {
                            title: "Gladiator",
                            year: "2000",
                            description: "Pretty much the Roman empire",
                            image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg"
                        },
                        {
                            title: "Titanic",
                            year: "1997",
                            description: "Shit, we hit an iceberg!",
                            image: "https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg"
                        }
                    ]
                },
            ]
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
          <div style={{padding: '20px'}}>
            <h2 style={{color: white, fontSize: '2rem', marginTop: '0px'}}>Genres</h2>
            {this.state.genres.map(function(genre, index, source) {
                return <GenreSuggestions style={{padding: `${index == 0 ? '0px' : '20px'} 0px ${index == source.length - 1 ? '0px' : '20px'} 0px`}} key={index} title={genre.title} items={genre.items}/>
            }, this)}
          </div>
      );
    }
}