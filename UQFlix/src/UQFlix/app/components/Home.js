import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Movie from './Movie';
import { white, grey200 } from 'material-ui/styles/colors';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            search: "",
            stamp: 0
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    handleSearch(search) {
        if (search.length > 0) {
            var that = this;
            var stamp = new Date().getTime();
            fetch(`/api/movies/search/${search}`).then(function(response) {
                if (stamp >= that.state.stamp) {
                    response.json().then(function(json) {
                        that.setState({results: json.map(function(item, index, source) { return item.value }), search: search, stamp: stamp});
                    })
                }
            })
        } else {
            this.setState({search: search});
        }
    }

    removeSearch() {
        this.setState({search: ""});
    }

    render() {
        let that = this;
        const search = (
            <div style={{color: white, padding: '20px'}}>
                <h2 style={{color: grey200, fontSize: '2rem', marginTop: '0px'}}>Search results for '{this.state.search}'</h2>
                
                <div style={{overflowX: 'none', overflowY: 'auto', whiteSpace: 'nowrap'}}>
                  {this.state.results.map(function(result, index, source) {
                    return <Movie key={result.name} title={result.name} image={result.poster} subtitle={result.year} first={index == 0} url={result.link} last={index == source.length - 1} search={true} onPlay={function(){that.removeSearch.call(that);}}/>
                  }, this)}
                </div>
            </div>
        );
        return (
          <div>
            <Header onSearch={function(search) {that.handleSearch.call(that, search);}}/>
            <div style={{height: 'calc(100% - 64px)', overflowY: 'auto', display: 'block', position: 'absolute', width: '100%'}}>
                {this.state.search.length > 0 ? search : this.props.children}
            </div>
          </div> 
      );
    }
}