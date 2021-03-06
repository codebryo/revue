import mocks from './mocks';
import Component from './component';

const Revue = require('../dist/index');


describe('Revue', () => {

  test('new Revue allows to acces a Vue component', () => {
    let rv = new Revue(Component)
    expect(rv._component).toEqual(Component)
    expect(typeof rv._mounted).toBe('object')
  })

  test('instantiating with mockData will inject it as propsData', () => {
    let rv = new Revue(Component, {
      props: {
        name: mocks.name
      }
    })
    expect(rv._mounted.$props.name).toBe(mocks.name)
  })

  describe('$', () => {
    let rv;

    beforeEach(() => {
      rv = new Revue(Component)
    })

    test('allows to read values of the Vue instance', () => {
      expect(rv.$.desc).toBe('Default description!')
    })

    test('allows to set values on the Vue instance', () => {
      rv.$.desc = mocks.value
      expect(rv.$.desc).toBe(mocks.value)
    })
  })

  describe('$html', () => {
    let rv;

    beforeEach(() => {
      rv = new Revue(Component, {
        props: {
          name: mocks.name
        }
      })
    })

    test('allows to get the rendered html of the instance', () => {
      expect(rv.$html).toMatchSnapshot()
    })

    test('changed data is reflected in the snapshot', () => {
      rv.$.desc = mocks.value
      rv.$tick(() => {
        expect(rv.$html).toMatchSnapshot()
      })
    })
  })

  describe('with store', () => {
    let rv;

    beforeEach(() => {
      rv = new Revue(Component, {
        store: mocks.store
      })
    })

    test('store is accassable through the instance', () => {
      expect(rv.$store).toBeDefined()
      expect(rv.$store.state).toEqual(mocks.store.state)
    })

    test('store allows expected interactions inside the Vue instance', () => {
      expect(rv.$.love).toBe(1)
      rv.$.increase()
      expect(rv.$.love).toBe(2)
    })
  })
});
