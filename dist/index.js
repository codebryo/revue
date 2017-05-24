(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue/dist/vue.common"), require("vuex"));
	else if(typeof define === 'function' && define.amd)
		define(["vue/dist/vue.common", "vuex"], factory);
	else if(typeof exports === 'object')
		exports["Revue"] = factory(require("vue/dist/vue.common"), require("vuex"));
	else
		root["Revue"] = factory(root["vue/dist/vue.common"], root["vuex"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (str) {
    return process(str);
};

/**
 * Format
 * -- take a HTML string and correctly indent it
 * @param {String} node
 * @param {Interger} level
 * @return {String}
 */
var format = function format(node, level) {
    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter = new Array(level - 1).join('  '),
        textNode = void 0;

    for (var i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
};

/**
 * Process
 * -- Take a string and pack it into a generic DOM node to trigger a indentation
 * @param {String} str
 * @return {String}
 */
var process = function process(str) {
    var div = document.createElement('div');
    div.innerHTML = str.trim();
    return format(div, 0).innerHTML;
};

// Thanks StackOverflow for the idea - http://stackoverflow.com/a/26361620/1277132

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beautify = __webpack_require__(0);

var _beautify2 = _interopRequireDefault(_beautify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vue = __webpack_require__(1);
var Vuex = __webpack_require__(2);

var Revue = function () {
  function Revue(component) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Revue);

    this._component = component;
    this._mounted = this._prepare(options);
    this.$ = this._mounted;
  }

  /**
   * Prepare
   * -- Mount a component and pass in optional data
   * @param {Object} data
   * @return {Promise}
   */


  _createClass(Revue, [{
    key: '_prepare',
    value: function _prepare(options) {
      var defaultOptions = {
        props: {},
        store: null
      };

      options = Object.assign(defaultOptions, options);

      if (options.store) {
        Vue.use(Vuex);
        this._component.store = new Vuex.Store(options.store);
      }

      var C = Vue.extend(this._component);

      return new C({
        propsData: options.props
      }).$mount(document.createElement('div'));
    }

    /**
     * $tick
     * -- execute Vue.nextTick and pass in the callback
     * @param {Function} cb
     * @return {Promise}
     */

  }, {
    key: '$tick',
    value: function $tick(cb) {
      Vue.nextTick(cb);
    }

    /**
     * HTML
     * -- get a beautified version of the rendered html
     * @return {String}
     */

  }, {
    key: '$html',
    get: function get() {
      return (0, _beautify2.default)(this._mounted.$el.outerHTML).trim();
    }

    /**
     * store
     * -- quick access the Vuex store
     * @return {String}
     */

  }, {
    key: '$store',
    get: function get() {
      return this._mounted.$store;
    }
  }]);

  return Revue;
}();

module.exports = Revue;

/***/ })
/******/ ]);
});