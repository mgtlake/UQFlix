import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default class Home extends React.Component {

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
            <Header/>
            <div style={{height: 'calc(100% - 64px)', overflowY: 'auto', display: 'block', position: 'absolute', width: '100%'}}>
                {this.props.children}
            </div>
          </div> 
      );
    }
}