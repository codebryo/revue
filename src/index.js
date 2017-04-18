import beautify from './beautify'

export default class Revue {

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
   * HTML
   * -- get a beautified version of the rendered html
   * @return {String}
   */
  get $html () {
    return beautify(this._mounted.$el.outerHTML)
  }
}
