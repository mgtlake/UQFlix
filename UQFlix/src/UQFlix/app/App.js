import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reduxStore from './store/reduxStore';
import reducers from './reducers/index';
import Home from './components/Home';
import Player from './components/Player';
import Main from './components/Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, cyan700,
  orange300, yellow100, yellow500,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, 
  blueGrey900, blueGrey800, blueGrey500,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blueGrey800,
        primary2Color: blueGrey500,
        primary3Color: grey400,
        accent1Color: orange300,
        accent2Color: yellow100,
        accent3Color: yellow500,
        textColor: white,
        alternateTextColor: white,
        canvasColor: blueGrey900,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={{backgroundColor: blueGrey900, width: "100%", height: "100%"}}>
      <Provider store={reduxStore}>
        <Router history={browserHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Main} />
            <Route path="movie/:movie" component={Player} />
          </Route>
        </Router>
      </Provider>
    </div>
  </MuiThemeProvider>
), document.getElementById('root')); 
