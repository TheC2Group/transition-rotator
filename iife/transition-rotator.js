/*!
 * transition-rotator
 * https://github.com/TheC2Group/transition-rotator
 * @version 1.2.0
 * @license MIT (c) The C2 Group (c2experience.com)
 */
var TransitionRotator = (function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.typeof = function (obj) {
      return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers;
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
    };

    // context should be an instance of Rotator
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
    };

    // context should be an instance of Rotator
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
        if ((typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options)) === 'object') {
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

    return Rotator;

})();