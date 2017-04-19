import beautify from './beautify'
import Vue from 'vue'

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
          return beautify(this._mounted.$el.outerHTML)
        })
        .catch((err) => {
          (reject(err))
        })
    })

    return beautify(this._mounted.$el.outerHTML)
  }
}

module.exports = Revue
