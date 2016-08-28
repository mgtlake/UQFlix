import React from 'react';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import { browserHistory } from 'react-router';
import { white, grey200, grey900, deepOrangeA400, blueGrey200 } from 'material-ui/styles/colors';

export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        }
    }

    getTruncatedTitle() {
        const lower = this.props.small ? 14 : 17;
        const upper = this.props.small ? 17 : 20;
        if (this.props.title.length > lower) {
            if (this.props.title.length < upper) {
                return this.props.title;
            } else {
                return this.props.title.substring(0, lower) + '...';
            }
        } else {
            return this.props.title;
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

    handlePlay() {
        this.props.onPlay();
        browserHistory.push(`/movie/${this.props.title}`)
        //window.location.href = `${window.location.href}${window.location.href[window.location.href.length - 1] == '/' ? '' : '/'}movie/${this.props.title}`;
    }

    render() {
        const height = this.props.small ? 230 : 440;
        const width = this.props.small ? 135 : 243;
        const imgHeight = this.props.small ? height - 30 : height - 80;
        const padding = 20;
        const size = this.props.small ? 1.0 : 1.5;
        const img = this.props.image ?
                <div style={{transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', position: 'absolute', top: '0px', left: '0px', height: `${imgHeight}px`, width: '100%'}}>
                  <img style={{position: 'absolute', top: '0px', left: '0px', height: `${imgHeight}px`, width: '100%'}} src={this.props.image}/>
                </div>
                :
                <div style={{position: 'absolute', top: 'calc(50% - 34px)', left: 'calc(50% - 55px)', color: grey200}}>
                    <h2>No Image</h2>
                </div>
        return (
          <div style={{height: `${height}px`, width: `${width}px`, display: 'inline-block', margin: `0px ${this.props.last ? '0px' : `${padding}px`} 0px ${this.props.first ? '0px' : `${padding}px`}`}}>
            <div style={{position: 'relative', height: `${imgHeight}px`, width: '100%'}} name='hovered' onMouseOver={this.handleEnter.bind(this)} onMouseOut={this.handleLeave.bind(this)}>
                {this.props.image == null ? null : img}
                <div style={{transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', position: 'absolute', top: '0px', left: '0px', height: `${imgHeight}px`, width: '100%', backgroundColor: this.props.image ? `rgba(33, 33, 33, ${(this.state.hovered ? '0.75' : '0.0')})` : blueGrey200}}>
                  {this.props.image == null ? img : null}
                  <div style={{position: 'absolute', top: `calc(50% - ${(width - 40) / 2}px)`, left: `calc(50% - ${(width - 40) / 2}px)`}}>
                    <PlayIcon style={{opacity: (this.state.hovered ? 1.0 : 0.0), width: width - 40, height: width - 40, color: deepOrangeA400, cursor: 'pointer'}} onClick={this.handlePlay.bind(this)}/>
                  </div>
                </div>
            </div>
            <h3 style={{color: grey200, fontSize: `${size}rem`, marginBottom: '0.2rem', marginTop: '0.2rem'}}>{this.getTruncatedTitle()}</h3>
            <small style={{color: grey200, fontSize: `${size}rem`}}>{this.props.subtitle}</small>
          </div>
      );
    }
}