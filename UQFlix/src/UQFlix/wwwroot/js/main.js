webpackJsonp([0],{

/***/ 0:
/*!********************!*\
  !*** ./app/App.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 33);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 168);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 229);
	
	var _reduxStore = __webpack_require__(/*! ./store/reduxStore */ 250);
	
	var _reduxStore2 = _interopRequireDefault(_reduxStore);
	
	var _index = __webpack_require__(/*! ./reducers/index */ 255);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _Home = __webpack_require__(/*! ./components/Home */ 558);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Player = __webpack_require__(/*! ./components/Player */ 1019);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _Main = __webpack_require__(/*! ./components/Main */ 1020);
	
	var _Main2 = _interopRequireDefault(_Main);
	
	var _reactTapEventPlugin = __webpack_require__(/*! react-tap-event-plugin */ 658);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	var _MuiThemeProvider = __webpack_require__(/*! material-ui/styles/MuiThemeProvider */ 664);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _getMuiTheme = __webpack_require__(/*! material-ui/styles/getMuiTheme */ 665);
	
	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	var _colorManipulator = __webpack_require__(/*! material-ui/utils/colorManipulator */ 606);
	
	var _spacing = __webpack_require__(/*! material-ui/styles/spacing */ 772);
	
	var _spacing2 = _interopRequireDefault(_spacing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Needed for onTouchTap
	// http://stackoverflow.com/a/34015469/988941
	(0, _reactTapEventPlugin2.default)();
	
	var muiTheme = (0, _getMuiTheme2.default)({
	  spacing: _spacing2.default,
	  fontFamily: 'Roboto, sans-serif',
	  palette: {
	    primary1Color: _colors.blueGrey800,
	    primary2Color: _colors.blueGrey500,
	    primary3Color: _colors.grey400,
	    accent1Color: _colors.orange300,
	    accent2Color: _colors.yellow100,
	    accent3Color: _colors.yellow500,
	    textColor: _colors.white,
	    alternateTextColor: _colors.white,
	    canvasColor: _colors.blueGrey900,
	    borderColor: _colors.grey300,
	    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
	    pickerHeaderColor: _colors.cyan500,
	    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
	    shadowColor: _colors.fullBlack
	  }
	});
	
	(0, _reactDom.render)(_react2.default.createElement(
	  _MuiThemeProvider2.default,
	  { muiTheme: muiTheme },
	  _react2.default.createElement(
	    'div',
	    { style: { backgroundColor: _colors.blueGrey900, width: "100%", height: "100%" } },
	    _react2.default.createElement(
	      _reactRedux.Provider,
	      { store: _reduxStore2.default },
	      _react2.default.createElement(
	        _reactRouter.Router,
	        { history: _reactRouter.browserHistory },
	        _react2.default.createElement(
	          _reactRouter.Route,
	          { path: '/', component: _Home2.default },
	          _react2.default.createElement(_reactRouter.IndexRoute, { component: _Main2.default }),
	          _react2.default.createElement(_reactRouter.Route, { path: 'movie/:movie', component: _Player2.default })
	        )
	      )
	    )
	  )
	), document.getElementById('root'));

/***/ },

/***/ 250:
/*!*********************************!*\
  !*** ./app/store/reduxStore.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 236);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 251);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxThrottle = __webpack_require__(/*! redux-throttle */ 252);
	
	var _reduxThrottle2 = _interopRequireDefault(_reduxThrottle);
	
	var _index = __webpack_require__(/*! ../reducers/index */ 255);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultThrottleOption = { // https://lodash.com/docs#throttle
	  leading: true,
	  trailing: false
	};
	
	var throttleMiddleWare = (0, _reduxThrottle2.default)(500, defaultThrottleOption); //default 500ms, 
	
	var reduxStore = (0, _redux.createStore)(_index2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, throttleMiddleWare));
	
	exports.default = reduxStore;

/***/ },

/***/ 255:
/*!*******************************!*\
  !*** ./app/reducers/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 236);
	
	var _cardReducer = __webpack_require__(/*! ./cardReducer */ 256);
	
	var _cardReducer2 = _interopRequireDefault(_cardReducer);
	
	var _draftCardReducer = __webpack_require__(/*! ./draftCardReducer */ 557);
	
	var _draftCardReducer2 = _interopRequireDefault(_draftCardReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reducers = (0, _redux.combineReducers)({
	  cards: _cardReducer2.default,
	  draftCard: _draftCardReducer2.default
	});
	
	exports.default = reducers;

/***/ },

/***/ 256:
/*!*************************************!*\
  !*** ./app/reducers/cardReducer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(/*! ../constants */ 257);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _cardUtils = __webpack_require__(/*! ../cardUtils */ 258);
	
	var _reactAddonsUpdate = __webpack_require__(/*! react-addons-update */ 555);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var initialState = [];
	var initialAction = { type: 'initial state' };
	
	var cards = function cards() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? initialAction : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.FETCH_CARDS_SUCCESS:
	      return action.payload.response;
	    /*
	     * Card Creation
	     */
	    case _constants2.default.CREATE_CARD:
	      return (0, _reactAddonsUpdate2.default)(state, { $push: [action.payload.card] });
	
	    case _constants2.default.CREATE_CARD_SUCCESS:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.card.id);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        id: { $set: action.payload.response.id }
	      }));
	
	    case _constants2.default.CREATE_CARD_ERROR:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.card.id);
	      return (0, _reactAddonsUpdate2.default)(state, { $splice: [[cardIndex, 1]] });
	
	    /*
	     * Card Status Toggle
	     */
	    case _constants2.default.TOGGLE_CARD_DETAILS:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        showDetails: { $apply: function $apply(currentValue) {
	            return currentValue !== false ? false : true;
	          } }
	      }));
	
	    /*
	     * Card Update
	     */
	    case _constants2.default.UPDATE_CARD:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.card.id);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        $set: action.payload.draftCard
	      }));
	
	    case _constants2.default.UPDATE_CARD_ERROR:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.card.id);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        $set: action.payload.card
	      }));
	
	    /*
	     * Card Drag'n Drop
	     */
	    case _constants2.default.UPDATE_CARD_POSITION:
	      if (action.payload.cardId !== action.payload.afterId) {
	        cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	        var card = state[cardIndex];
	        var afterIndex = (0, _cardUtils.getCardIndex)(state, action.payload.afterId);
	        return (0, _reactAddonsUpdate2.default)(state, {
	          $splice: [[cardIndex, 1], [afterIndex, 0, card]]
	        });
	      }
	
	    case _constants2.default.UPDATE_CARD_STATUS:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        status: { $set: action.payload.listId }
	      }));
	
	    case _constants2.default.PERSIST_CARD_DRAG_ERROR:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardProps.id);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        status: { $set: action.cardProps.status }
	      }));
	
	    /*
	     * Task Creation
	     */
	    case _constants2.default.CREATE_TASK:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: { $push: [action.payload.task] }
	      }));
	
	    case _constants2.default.CREATE_TASK_SUCCESS:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      taskIndex = state[cardIndex].tasks.findIndex(function (task) {
	        return task.id == action.payload.task.id;
	      });
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: _defineProperty({}, taskIndex, {
	          id: { $set: action.payload.response.id }
	        })
	      }));
	
	    case _constants2.default.CREATE_TASK_ERROR:
	      var cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      var taskIndex = state[cardIndex].tasks.findIndex(function (task) {
	        return task.id == action.payload.task.id;
	      });
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: {
	          $splice: [[taskIndex, 1]]
	        }
	      }));
	
	    /*
	     * Task Deletion
	     */
	    case _constants2.default.DELETE_TASK:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: { $splice: [[action.payload.taskIndex, 1]] }
	      }));
	
	    case _constants2.default.DELETE_TASK_ERROR:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: { $splice: [[action.payload.taskIndex, 0, action.payload.task]] }
	      }));
	
	    /*
	     * Task Toggling
	     */
	    case _constants2.default.TOGGLE_TASK:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: _defineProperty({}, action.payload.taskIndex, { done: { $apply: function $apply(done) {
	              return !done;
	            } } })
	      }));
	
	    case _constants2.default.TOGGLE_TASK_ERROR:
	      cardIndex = (0, _cardUtils.getCardIndex)(state, action.payload.cardId);
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, cardIndex, {
	        tasks: _defineProperty({}, action.payload.taskIndex, { done: { $apply: function $apply(done) {
	              return !done;
	            } } })
	      }));
	
	    default:
	      return state;
	  }
	};
	
	exports.default = cards;

/***/ },

/***/ 257:
/*!**************************!*\
  !*** ./app/constants.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  //API_URL: 'http://kanbanapi.pro-react.com';    //original value
	
	  API_URL: 'http://localhost:55685/api', //reads from ASP.NET CORE 
	
	  CARD: 'card',
	
	  FETCH_CARDS: 'fetch cards',
	  FETCH_CARDS_SUCCESS: 'fetch cards success',
	  FETCH_CARDS_ERROR: 'fetch cards error',
	
	  TOGGLE_CARD_DETAILS: 'toggle card details',
	
	  CREATE_CARD: 'create card',
	  CREATE_CARD_SUCCESS: 'create card success',
	  CREATE_CARD_ERROR: 'create card error',
	
	  UPDATE_CARD: 'update card',
	  UPDATE_CARD_SUCCESS: 'update card success',
	  UPDATE_CARD_ERROR: 'update card error',
	
	  UPDATE_CARD_STATUS: 'update card status',
	
	  UPDATE_CARD_POSITION: 'update card position',
	
	  PERSIST_CARD_DRAG: 'persist card drag',
	  PERSIST_CARD_DRAG_SUCCESS: 'persist card drag success',
	  PERSIST_CARD_DRAG_ERROR: 'persist card drag error',
	
	  CREATE_DRAFT: 'create draft',
	  UPDATE_DRAFT: 'update draft',
	
	  CREATE_TASK: 'create task',
	  CREATE_TASK_SUCCESS: 'create task success',
	  CREATE_TASK_ERROR: 'create task error',
	
	  DELETE_TASK: 'delete task',
	  DELETE_TASK_SUCCESS: 'delete task success',
	  DELETE_TASK_ERROR: 'delete task error',
	
	  TOGGLE_TASK: 'toggle task',
	  TOGGLE_TASK_SUCCESS: 'toggle task success',
	  TOGGLE_TASK_ERROR: 'toggle task error'
	
	};

/***/ },

/***/ 258:
/*!**************************!*\
  !*** ./app/cardUtils.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCard = getCard;
	exports.getCardIndex = getCardIndex;
	
	var _babelPolyfill = __webpack_require__(/*! babel-polyfill */ 259);
	
	function getCard(cards, id) {
	    if (!Array.isArray(cards)) {
	        throw new Error('cards must be an array.');
	    }
	    return cards.find(function (card) {
	        return card.id == id;
	    });
	};
	
	function getCardIndex(cards, id) {
	    if (!Array.isArray(cards)) {
	        throw new Error('cards must be an array.');
	    }
	    return cards.findIndex(function (card) {
	        return card.id == id;
	    });
	};

/***/ },

/***/ 557:
/*!******************************************!*\
  !*** ./app/reducers/draftCardReducer.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(/*! ../constants */ 257);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _reactAddonsUpdate = __webpack_require__(/*! react-addons-update */ 555);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var initialState = {
	  id: Date.now(),
	  title: '',
	  description: '',
	  status: 'todo',
	  color: '#c9c9c9',
	  tasks: []
	};
	var initialAction = { type: 'initial state' };
	
	var draftCard = function draftCard() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? initialAction : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.CREATE_DRAFT:
	      if (action.payload.card) {
	        return (0, _reactAddonsUpdate2.default)(state, {
	          $set: action.payload.card
	        });
	      } else {
	        return initialState;
	      }
	
	    case _constants2.default.UPDATE_DRAFT:
	      return (0, _reactAddonsUpdate2.default)(state, _defineProperty({}, action.payload.field, {
	        $set: action.payload.value
	      }));
	
	    default:
	      return state;
	  }
	};
	
	exports.default = draftCard;

/***/ },

/***/ 558:
/*!********************************!*\
  !*** ./app/components/Home.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Header = __webpack_require__(/*! ./Header */ 559);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Footer = __webpack_require__(/*! ./Footer */ 647);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Home = function (_React$Component) {
	    _inherits(Home, _React$Component);
	
	    function Home(props) {
	        _classCallCheck(this, Home);
	
	        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
	
	        _this.state = {
	            value: 3
	        };
	        return _this;
	    }
	
	    _createClass(Home, [{
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_Header2.default, null),
	                _react2.default.createElement(
	                    'div',
	                    { style: { height: 'calc(100% - 64px)', overflowY: 'auto', display: 'block', position: 'absolute', width: '100%' } },
	                    this.props.children
	                )
	            );
	        }
	    }]);
	
	    return Home;
	}(_react2.default.Component);
	
	exports.default = Home;

/***/ },

/***/ 559:
/*!**********************************!*\
  !*** ./app/components/Header.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _IconMenu = __webpack_require__(/*! material-ui/IconMenu */ 560);
	
	var _IconMenu2 = _interopRequireDefault(_IconMenu);
	
	var _IconButton = __webpack_require__(/*! material-ui/IconButton */ 619);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _FontIcon = __webpack_require__(/*! material-ui/FontIcon */ 621);
	
	var _FontIcon2 = _interopRequireDefault(_FontIcon);
	
	var _expandMore = __webpack_require__(/*! material-ui/svg-icons/navigation/expand-more */ 625);
	
	var _expandMore2 = _interopRequireDefault(_expandMore);
	
	var _MenuItem = __webpack_require__(/*! material-ui/MenuItem */ 627);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _DropDownMenu = __webpack_require__(/*! material-ui/DropDownMenu */ 628);
	
	var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);
	
	var _RaisedButton = __webpack_require__(/*! material-ui/RaisedButton */ 634);
	
	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
	
	var _TextField = __webpack_require__(/*! material-ui/TextField */ 636);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _AppBar = __webpack_require__(/*! material-ui/AppBar */ 642);
	
	var _AppBar2 = _interopRequireDefault(_AppBar);
	
	var _search = __webpack_require__(/*! material-ui/svg-icons/action/search */ 645);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);
	
	    function Header(props) {
	        _classCallCheck(this, Header);
	
	        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	
	        _this.state = {
	            value: 3
	        };
	        return _this;
	    }
	
	    _createClass(Header, [{
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(_AppBar2.default, { title: 'UQFlix \'n\' Chill', iconStyleLeft: { display: "none" }, iconElementRight: _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(_TextField2.default, { hintStyle: { color: _colors.grey400 }, inputStyle: { width: 'calc(100% - 24px)' }, hintText: 'Search' }),
	                    _react2.default.createElement(
	                        'div',
	                        { style: { marginLeft: '-24px', display: 'inline-block' } },
	                        _react2.default.createElement(
	                            'div',
	                            { style: { top: '18px', position: 'absolute' } },
	                            _react2.default.createElement(_search2.default, null)
	                        )
	                    )
	                ) });
	        }
	    }]);
	
	    return Header;
	}(_react2.default.Component);
	
	exports.default = Header;

/***/ },

/***/ 645:
/*!**************************************************!*\
  !*** ./~/material-ui/svg-icons/action/search.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(/*! recompose/pure */ 594);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(/*! ../../SvgIcon */ 603);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ActionSearch = function ActionSearch(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' })
	  );
	};
	ActionSearch = (0, _pure2.default)(ActionSearch);
	ActionSearch.displayName = 'ActionSearch';
	ActionSearch.muiName = 'SvgIcon';
	
	exports.default = ActionSearch;

/***/ },

/***/ 647:
/*!**********************************!*\
  !*** ./app/components/Footer.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Footer = function (_React$Component) {
	    _inherits(Footer, _React$Component);
	
	    function Footer(props) {
	        _classCallCheck(this, Footer);
	
	        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
	    }
	
	    _createClass(Footer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'span',
	                    { style: { color: _colors.grey200 } },
	                    'Hacked together by '
	                ),
	                _react2.default.createElement(
	                    'a',
	                    { href: 'http://www.mgtlake.com' },
	                    'Matthew Lake'
	                ),
	                _react2.default.createElement(
	                    'span',
	                    { style: { color: _colors.grey200 } },
	                    ' and '
	                ),
	                _react2.default.createElement(
	                    'a',
	                    { href: 'http://www.illogicalbit.com' },
	                    'Joseph Garrone'
	                )
	            );
	        }
	    }]);
	
	    return Footer;
	}(_react2.default.Component);
	
	exports.default = Footer;

/***/ },

/***/ 648:
/*!***************************************!*\
  !*** ./app/components/Suggestions.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Movie = __webpack_require__(/*! ./Movie */ 649);
	
	var _Movie2 = _interopRequireDefault(_Movie);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Suggestions = function (_React$Component) {
	    _inherits(Suggestions, _React$Component);
	
	    function Suggestions(props) {
	        _classCallCheck(this, Suggestions);
	
	        var _this = _possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call(this, props));
	
	        _this.state = {
	            suggestionCount: 20,
	            suggestions: []
	        };
	        return _this;
	    }
	
	    _createClass(Suggestions, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.update();
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var that = this;
	            fetch('api/movies/suggested/' + this.state.suggestionCount).then(function (response) {
	                response.json().then(function (json) {
	                    that.setState({ suggestions: json.map(function (item, index, source) {
	                            return item.value;
	                        }) });
	                });
	            });
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { style: { padding: '20px' } },
	                _react2.default.createElement(
	                    'h2',
	                    { style: { color: _colors.white, fontSize: '2rem', marginTop: '0px' } },
	                    'Suggestions'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { style: { overflowX: 'auto', overflowY: 'none', whiteSpace: 'nowrap' } },
	                    this.state.suggestions.map(function (suggestion, index, source) {
	                        return _react2.default.createElement(_Movie2.default, { key: suggestion.name, title: suggestion.name, image: suggestion.poster, subtitle: suggestion.year, first: index == 0, url: suggestion.link, last: index == source.length - 1 });
	                    }, this)
	                )
	            );
	        }
	    }]);
	
	    return Suggestions;
	}(_react2.default.Component);
	
	exports.default = Suggestions;

/***/ },

/***/ 649:
/*!*********************************!*\
  !*** ./app/components/Movie.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _playArrow = __webpack_require__(/*! material-ui/svg-icons/av/play-arrow */ 1018);
	
	var _playArrow2 = _interopRequireDefault(_playArrow);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 168);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Movie = function (_React$Component) {
	    _inherits(Movie, _React$Component);
	
	    function Movie(props) {
	        _classCallCheck(this, Movie);
	
	        var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this, props));
	
	        _this.state = {
	            hovered: false
	        };
	        return _this;
	    }
	
	    _createClass(Movie, [{
	        key: 'getTruncatedTitle',
	        value: function getTruncatedTitle() {
	            var lower = this.props.small ? 14 : 17;
	            var upper = this.props.small ? 17 : 20;
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
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState(_defineProperty({}, event.target.name, value));
	        }
	    }, {
	        key: 'handleEnter',
	        value: function handleEnter() {
	            this.setState({ hovered: true });
	        }
	    }, {
	        key: 'handleLeave',
	        value: function handleLeave() {
	            this.setState({ hovered: false });
	        }
	    }, {
	        key: 'handlePlay',
	        value: function handlePlay() {
	            _reactRouter.browserHistory.push('/movie/' + this.props.title);
	            //window.location.href = `${window.location.href}${window.location.href[window.location.href.length - 1] == '/' ? '' : '/'}movie/${this.props.title}`;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var height = this.props.small ? 230 : 440;
	            var width = this.props.small ? 135 : 243;
	            var imgHeight = this.props.small ? height - 30 : height - 80;
	            var padding = 20;
	            var size = this.props.small ? 1.0 : 1.5;
	            var img = this.props.image ? _react2.default.createElement(
	                'div',
	                { style: { transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', position: 'absolute', top: '0px', left: '0px', height: imgHeight + 'px', width: '100%' } },
	                _react2.default.createElement('img', { style: { position: 'absolute', top: '0px', left: '0px', height: imgHeight + 'px', width: '100%' }, src: this.props.image })
	            ) : _react2.default.createElement(
	                'div',
	                { style: { position: 'absolute', top: 'calc(50% - 34px)', left: 'calc(50% - 55px)', color: _colors.white } },
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    'No Image'
	                )
	            );
	            return _react2.default.createElement(
	                'div',
	                { style: { height: height + 'px', width: width + 'px', display: 'inline-block', margin: '0px ' + (this.props.last ? '0px' : padding + 'px') + ' 0px ' + (this.props.first ? '0px' : padding + 'px') } },
	                _react2.default.createElement(
	                    'div',
	                    { style: { position: 'relative', height: imgHeight + 'px', width: '100%' }, name: 'hovered', onMouseOver: this.handleEnter.bind(this), onMouseOut: this.handleLeave.bind(this) },
	                    this.props.image == null ? null : img,
	                    _react2.default.createElement(
	                        'div',
	                        { style: { transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', position: 'absolute', top: '0px', left: '0px', height: imgHeight + 'px', width: '100%', backgroundColor: this.props.image ? 'rgba(33, 33, 33, ' + (this.state.hovered ? '0.75' : '0.0') + ')' : _colors.blueGrey200 } },
	                        this.props.image == null ? img : null,
	                        _react2.default.createElement(
	                            'div',
	                            { style: { position: 'absolute', top: 'calc(50% - ' + (width - 40) / 2 + 'px)', left: 'calc(50% - ' + (width - 40) / 2 + 'px)' } },
	                            _react2.default.createElement(_playArrow2.default, { style: { opacity: this.state.hovered ? 1.0 : 0.0, width: width - 40, height: width - 40, color: _colors.deepOrangeA400, cursor: 'pointer' }, onClick: this.handlePlay.bind(this) })
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'h3',
	                    { style: { color: _colors.white, fontSize: size + 'rem', marginBottom: '0.2rem', marginTop: '0.2rem' } },
	                    this.getTruncatedTitle()
	                ),
	                _react2.default.createElement(
	                    'small',
	                    { style: { color: _colors.grey200, fontSize: size + 'rem' } },
	                    this.props.subtitle
	                )
	            );
	        }
	    }]);
	
	    return Movie;
	}(_react2.default.Component);
	
	exports.default = Movie;

/***/ },

/***/ 650:
/*!**********************************!*\
  !*** ./app/components/Genres.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _GenreSuggestions = __webpack_require__(/*! ./GenreSuggestions */ 651);
	
	var _GenreSuggestions2 = _interopRequireDefault(_GenreSuggestions);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Genres = function (_React$Component) {
	    _inherits(Genres, _React$Component);
	
	    function Genres(props) {
	        _classCallCheck(this, Genres);
	
	        var _this = _possibleConstructorReturn(this, (Genres.__proto__ || Object.getPrototypeOf(Genres)).call(this, props));
	
	        _this.state = {
	            genres: []
	        };
	        return _this;
	    }
	
	    _createClass(Genres, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.update();
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var that = this;
	            fetch('api/movies/genres').then(function (response) {
	                response.json().then(function (json) {
	                    that.setState({ genres: json });
	                });
	            });
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { style: { padding: '20px' } },
	                _react2.default.createElement(
	                    'h2',
	                    { style: { color: _colors.white, fontSize: '2rem', marginTop: '0px' } },
	                    'Genres'
	                ),
	                this.state.genres.map(function (item, index, source) {
	                    return _react2.default.createElement(_GenreSuggestions2.default, { style: { padding: (index == 0 ? '0px' : '20px') + ' 0px ' + (index == source.length - 1 ? '0px' : '20px') + ' 0px' }, key: index, title: item.genre });
	                }, this)
	            );
	        }
	    }]);
	
	    return Genres;
	}(_react2.default.Component);
	
	exports.default = Genres;

/***/ },

/***/ 651:
/*!********************************************!*\
  !*** ./app/components/GenreSuggestions.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Movie = __webpack_require__(/*! ./Movie */ 649);
	
	var _Movie2 = _interopRequireDefault(_Movie);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GenreSuggestions = function (_React$Component) {
	    _inherits(GenreSuggestions, _React$Component);
	
	    function GenreSuggestions(props) {
	        _classCallCheck(this, GenreSuggestions);
	
	        var _this = _possibleConstructorReturn(this, (GenreSuggestions.__proto__ || Object.getPrototypeOf(GenreSuggestions)).call(this, props));
	
	        _this.state = {
	            suggestionCount: 20,
	            suggestions: []
	        };
	        return _this;
	    }
	
	    _createClass(GenreSuggestions, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.update();
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var that = this;
	            fetch('api/movies/genre/' + this.props.title + '/' + this.state.suggestionCount).then(function (response) {
	                response.json().then(function (json) {
	                    that.setState({ suggestions: json.map(function (item, index, source) {
	                            return item.value;
	                        }) });
	                });
	            });
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { style: Object.assign({}, this.props.style) },
	                _react2.default.createElement(
	                    'h2',
	                    { style: { color: _colors.white } },
	                    this.props.title
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { style: { overflowX: 'auto', overflowY: 'none', whiteSpace: 'nowrap' } },
	                    this.state.suggestions.map(function (item, index, source) {
	                        return _react2.default.createElement(_Movie2.default, { key: index, title: item.name, image: item.poster, subtitle: item.year, first: index == 0, last: index == source.length - 1, url: item.link, small: true });
	                    }, this)
	                )
	            );
	        }
	    }]);
	
	    return GenreSuggestions;
	}(_react2.default.Component);
	
	exports.default = GenreSuggestions;

/***/ },

/***/ 1018:
/*!**************************************************!*\
  !*** ./~/material-ui/svg-icons/av/play-arrow.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(/*! recompose/pure */ 594);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(/*! ../../SvgIcon */ 603);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AvPlayArrow = function AvPlayArrow(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M8 5v14l11-7z' })
	  );
	};
	AvPlayArrow = (0, _pure2.default)(AvPlayArrow);
	AvPlayArrow.displayName = 'AvPlayArrow';
	AvPlayArrow.muiName = 'SvgIcon';
	
	exports.default = AvPlayArrow;

/***/ },

/***/ 1019:
/*!**********************************!*\
  !*** ./app/components/Player.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _playArrow = __webpack_require__(/*! material-ui/svg-icons/av/play-arrow */ 1018);
	
	var _playArrow2 = _interopRequireDefault(_playArrow);
	
	var _colors = __webpack_require__(/*! material-ui/styles/colors */ 646);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Player = function (_React$Component) {
	    _inherits(Player, _React$Component);
	
	    function Player(props) {
	        _classCallCheck(this, Player);
	
	        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));
	
	        _this.state = {
	            movie: null
	        };
	        return _this;
	    }
	
	    _createClass(Player, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.update();
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var that = this;
	            fetch('/api/movies/movie/' + this.props.params.movie).then(function (response) {
	                response.json().then(function (json) {
	                    that.setState({ movie: json });
	                });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log("render");
	            var player = _react2.default.createElement(
	                'div',
	                null,
	                'Loading'
	            );
	            if (this.state.movie != null) {
	                player = _react2.default.createElement(
	                    'div',
	                    { style: { background: _colors.grey900, padding: '20px' } },
	                    _react2.default.createElement('video', { autoplay: true, controls: true, style: { margin: '0 auto', display: 'block' }, src: this.state.movie.link })
	                );
	            }
	            return _react2.default.createElement(
	                'div',
	                null,
	                player
	            );
	        }
	    }]);
	
	    return Player;
	}(_react2.default.Component);
	
	exports.default = Player;

/***/ },

/***/ 1020:
/*!********************************!*\
  !*** ./app/components/Main.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Suggestions = __webpack_require__(/*! ./Suggestions */ 648);
	
	var _Suggestions2 = _interopRequireDefault(_Suggestions);
	
	var _Genres = __webpack_require__(/*! ./Genres */ 650);
	
	var _Genres2 = _interopRequireDefault(_Genres);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Main = function (_React$Component) {
	    _inherits(Main, _React$Component);
	
	    function Main(props) {
	        _classCallCheck(this, Main);
	
	        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));
	
	        _this.state = {
	            value: 3
	        };
	        return _this;
	    }
	
	    _createClass(Main, [{
	        key: 'handleChange',
	        value: function handleChange(event, index, value) {
	            this.setState({ value: value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_Suggestions2.default, null),
	                _react2.default.createElement(_Genres2.default, null)
	            );
	        }
	    }]);
	
	    return Main;
	}(_react2.default.Component);
	
	exports.default = Main;

/***/ }

});
//# sourceMappingURL=main.js.map