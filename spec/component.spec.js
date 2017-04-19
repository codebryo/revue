import Component from './component';
const Vue = require('vue')
const Revue = require('../dist/index');

describe('Component', () => {
  let vm;

  beforeEach(() => {
    vm = new Revue(Component)
  })

  test('default values are provided', () => {
    expect(vm.$.desc).toBe('Default description!')
    expect(vm.$.allcaps).toBeFalsy()
  })

});
