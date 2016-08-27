import React from 'react';
import { white, grey200, grey900 } from 'material-ui/styles/colors';

export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        }
    }

    handleChange(event, index, value) {
        this.setState({[event.target.name]: value});
    }

    handleEnter() {
        this.setState({hovered: true});
    }

    handleLeave() {
        this.setState({hovered: false});
    }

    render() {
        const height = this.props.small ? 230 : 440;
        const width = this.props.small ? 135 : 243;
        const imgHeight = this.props.small ? height - 30 : height - 80;
        const padding = 20;
        const size = this.props.small ? 1.0 : 1.5;
        return (
          <div style={{height: `${height}px`, width: `${width}px`, display: 'inline-block', margin: `0px ${this.props.last ? '0px' : `${padding}px`} 0px ${this.props.first ? '0px' : `${padding}px`}`}}>
            <div style={{position: 'relative', height: `${imgHeight}px`, width: '100%'}} name='hovered' onMouseOver={this.handleEnter.bind(this)} onMouseOut={this.handleLeave.bind(this)}>
                <img style={{position: 'absolute', top: '0px', left: '0px', height: `${imgHeight}px`, width: '100%'}} src={this.props.image}/>
                <div style={{transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', position: 'absolute', top: '0px', left: '0px', height: `${imgHeight}px`, width: '100%', opacity: (this.state.hovered ? '0.75' : '0.0'), backgroundColor: grey900}}>
                </div>
            </div>
            <h3 style={{color: white, fontSize: `${size}rem`, marginBottom: '0.2rem', marginTop: '0.2rem'}}>{this.props.title}</h3>
            <small style={{color: grey200, fontSize: `${size}rem`}}>{this.props.subtitle}</small>
          </div>
      );
}
}