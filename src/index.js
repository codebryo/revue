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

  /**
   * $tick
   * -- execute Vue.nextTick and pass in the callback
   * @param {Function} cb
   * @return {Promise}
   */
  $tick(cb) {
    Vue.nextTick(cb)
  }

  /**
   * HTML
   * -- get a beautified version of the rendered html
   * @return {String}
   */
  get $html () {
    return beautify(this._mounted.$el.outerHTML).trim()
  }
}

module.exports = Revue
