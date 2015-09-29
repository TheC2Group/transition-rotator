transition-rotator
==================

> This just relies on CSS for any transition between items. Every item will be able to be identified in CSS as next, previous or active.

*Browsers that don't support CSS transitions still see the end result.* [caniuse](http://caniuse.com/#feat=css-transitions)

ES5 polyfills needed for:

* Array.isArray
* Array.forEach
* Array.map
* Object.keys


To get started
--------------

### CommonJS

```
$ npm install transition-rotator
```

```js
var TransitionRotator = require('transition-rotator');
```

### Browser Global

```html
<script src="transition-rotator.js"></script>
```


Create a TransitionRotator
--------------------------

```js
var arrayOfItems = Array.prototype.slice.call(document.querySelectorAll('.items'), 0);

// this wouldn't be necessary since all these options are the defaults
var options = {
    next: 'next',
    previous: 'previous',
    active: 'active',
    attribute: 'data-position'
};

var rotator = new TransitionRotator(arrayOfItems, options);
```


Change the active index
-----------------------

```js
rotator.activate(0);
```


License
-------

MIT © [The C2 Group](https://c2experience.com)
