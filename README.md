Revue
=====

Approachable testing for Vue Components.

## What's this?

`Revue` is a helper class that let's you access a Vue Component and provides a small API to interact with the reactive instance. Use it with the test system you like best.

## Installation

TBU

## Getting Started

To get running with `Revue` you first need to instantiate it accordingly.

```js
const Component = {

  props: ['secret'],

  data() {
    return {
      msg: 'Hello Revue!'
    }
  }
  ... // your Vue component
}

let rv = new Revue(Component)
```

You can also pass in data that will be applied to the component using Vue's `propsData` option. If the component has props set it's easy as this:

```js
let rv = new Revue(Component, { secret: 'Revue is awesome' })
```

## The API

**The $ instance**

`$` let's you interact with the instance itself and get or set data as known.

```js
console.log(rv.$.msg) // 'Hello Revue!'
console.log(rv.$.secret) // 'Revue is awesome'

rv.$.msg = 'Interaction happening'

console.log(rv.$.msg) // 'Interaction happening!'
```

**$html**

This let's you get the current rendered markup of the instance as formatted HTML string. (Great for Snapshot testing)

*Caveats:* To stay pragmatic this is not solving the fact that Vue uses `nextTick` to reflect data changes on the markup.

```js
rv.$html // Returns formatted HTML String
```

**$tick**
If you need access to the HTML markup after some changes where applied the `$tick` function will be your friend. The passed callback function will allow to execute code after Vue's `nextTick` has been called.

```js
rv.$.msg = 'New content'
console.log(rv.$html) // Not updated

rv.$tick(() => {
    console.log(rv.$html) // Now updated content
})
```

##WIP

- Extend API to allow interactions (click buttons, etc.)
- Extend Documentation
- Example guide how to use with Jest
