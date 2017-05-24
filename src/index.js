import beautify from './beautify'
const Vue = require('vue/dist/vue.common')
const Vuex = require('vuex')

class Revue {

  constructor(component, options={}) {
    this._component = component
    this._mounted = this._prepare(options)
    this.$ = this._mounted
  }

  /**
   * Prepare
   * -- Mount a component and pass in optional data
   * @param {Object} data
   * @return {Promise}
   */
  _prepare (options) {
    const defaultOptions = {
      props: {},
      store: null
    }

    options = Object.assign(defaultOptions, options)

    if (options.store) {
      Vue.use(Vuex)
      this._component.store = new Vuex.Store(options.store)
    }

    let C = Vue.extend(this._component)

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

  /**
   * store
   * -- quick access the Vuex store
   * @return {String}
   */
  get $store () {
    return this._mounted.$store
  }
}

module.exports = Revue
