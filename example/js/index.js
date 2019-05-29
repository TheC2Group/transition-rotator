
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
