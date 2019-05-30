(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * transition-rotator
 * https://github.com/TheC2Group/transition-rotator
 * @version 1.3.1
 * @license MIT (c) The C2 Group (c2experience.com)
 */
'use strict';

var defaults = {
  next: 'next',
  previous: 'previous',
  active: 'active',
  attribute: 'data-position'
};

function Item(el, attribute) {
  this.el = el;
  this.attribute = attribute;
  this.position = el.getAttribute(attribute) || '';
}

Item.prototype.setPosition = function (position) {
  if (this.position === position) return;
  this.el.setAttribute(this.attribute, position);
  this.position = position;
}; // context should be an instance of Rotator


var getPosition = function getPosition(itemIndex) {
  if (typeof this.activeIndex !== 'number') {
    return this.opts.next;
  }

  if (itemIndex < this.activeIndex) {
    return this.opts.previous;
  }

  if (itemIndex === this.activeIndex) {
    return this.opts.active;
  }

  return this.opts.next;
}; // context should be an instance of Rotator


var getInitialIndex = function getInitialIndex() {
  for (var x = 0, xlen = this.items.length; x < xlen; x += 1) {
    if (this.items[x].position === this.opts.active) return x;
  }

  return null;
};

function Rotator(set, options) {
  if (!Array.isArray(set)) {
    return new Error('The first parameter must be an array of elements.');
  }

  this.opts = {};

  if (typeof options === 'object') {
    Object.keys(defaults).forEach(function (key) {
      this.opts[key] = typeof options[key] === 'undefined' ? defaults[key] : options[key];
    }, this);
  } else {
    Object.keys(defaults).forEach(function (key) {
      this.opts[key] = defaults[key];
    }, this);
  }

  this.items = set.map(function (el) {
    return new Item(el, this.opts.attribute);
  }, this);
  this.activeIndex = getInitialIndex.call(this);
}

Rotator.prototype.activate = function (index) {
  if (this.activeIndex === index) return;
  this.activeIndex = index;
  this.items.forEach(function (item, i) {
    item.setPosition(getPosition.call(this, i));
  }, this);
};

module.exports = Rotator;

},{}],2:[function(require,module,exports){

var TransitionRotator = require('../../cjs/transition-rotator');

var Carousel = function (example, options) {
    var self = this;
    var items = Array.prototype.slice.call(example.querySelectorAll('.Items li'), 0);
    var links = Array.prototype.slice.call(example.querySelectorAll('.Controller a'), 0);

    this.rotator = new TransitionRotator(items, options);

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            self.rotator.activate(parseInt(e.target.getAttribute('data-index'), 10));
        });
    });

    example.setAttribute('data-status', 'enabled');
};

var example1 = new Carousel(document.querySelector('.Example1'));
example1.rotator.activate(0);


var example2 = new Carousel(document.querySelector('.Example2'), {
    next: 'custom-next',
    previous: 'custom-previous',
    active: 'custom-active',
    attribute: 'data-custom-position'
});
example2.rotator.activate(0);


var example3 = new Carousel(document.querySelector('.Example3'), {
    next: 'behind',
    previous: 'infront',
    attribute: 'data-pos'
});

},{"../../cjs/transition-rotator":1}]},{},[2]);
