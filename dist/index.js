/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Format
 * -- take a HTML string and correctly indent it
 * @param {String} node
 * @param {Interger} level
 * @return {String}
 */
let format = function(node, level) {
  let indentBefore = new Array(level++ + 1).join('  '),
      indentAfter  = new Array(level - 1).join('  '),
      textNode;

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
}

/**
 * Process
 * -- Take a string and pack it into a generic DOM node to trigger a indentation
 * @param {String} str
 * @return {String}
 */
let process = function(str) {
  let div = document.createElement('div');
  div.innerHTML = str.trim();
  return format(div, 0).innerHTML;
}

// Thanks StackOverflow for the idea - http://stackoverflow.com/a/26361620/1277132
/* harmony default export */ __webpack_exports__["a"] = (function(str) {
  return process(str)
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beautify__ = __webpack_require__(1);


class Revue {

  constructor(component, data={}) {
    this._component = component
    this._mounted = this._prepare(data)
    this.$ = this._mounted
  }

  /**
   * Prepare
   * -- Mount a component and pass in optional data
   * @param {Object} data
   * @return {Promise}
   */
  _prepare (data) {
    let C = Vue.extend(this._component)
    return new C({
      propsData: data
    }).$mount(document.createElement('div'));
  }

  _nextTick() {
    return new Promise((resolve, reject) => {
      Vue.nextTick(() => resolve())
    })
  }

  /**
   * HTML
   * -- get a beautified version of the rendered html
   * @return {String}
   */
  get $html () {
    return new Promise((resolve, reject) => {
      this._nextTick()
        .then(() => {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__beautify__["a" /* default */])(this._mounted.$el.outerHTML)
        })
        .catch((err) => {
          (reject(err))
        })
    })

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__beautify__["a" /* default */])(this._mounted.$el.outerHTML)
  }
}

module.exports = Revue

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)(module)))

/***/ })
/******/ ]);