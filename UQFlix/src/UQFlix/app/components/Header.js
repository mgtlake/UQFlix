import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {
  white, grey400
} from 'material-ui/styles/colors';

export default class Header extends React.Component {

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
          <AppBar title="UQFlix 'n' Chill" iconStyleLeft={{display: "none"}} iconElementRight={
            <div>
              <TextField hintStyle={{color: grey400}} inputStyle={{width: 'calc(100% - 24px)'}} hintText="Search"/>
              <div style={{marginLeft: '-24px', display: 'inline-block'}}>
                <div style={{top: '18px', position: 'absolute'}}>
                    <SearchIcon/>
                </div>
              </div>
            </div>
          }>
            
          </AppBar>
      );
    }
}