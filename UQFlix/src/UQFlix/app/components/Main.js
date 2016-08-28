import React from 'react';
import Suggestions from './Suggestions';
import Genres from './Genres';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
          <div>
            <Suggestions/>
            <Genres/>
          </div>
      );
    }
}