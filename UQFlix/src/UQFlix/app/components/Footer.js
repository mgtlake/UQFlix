import React from 'react';
import {
  white, grey200
} from 'material-ui/styles/colors';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <span style={{color: grey200}}>Hacked together by </span><a href="http://www.mgtlake.com">Matthew Lake</a><span style={{color: grey200}}> and </span><a href="http://www.illogicalbit.com">Joseph Garrone</a>
          </div>
      );
    }
}