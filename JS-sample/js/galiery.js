
(function () {
    var Gallery = function () {
        this.element = document.querySelector('.gallery');
    };
    Gallery.prototype.show = function () {
        this.element.classList.remove('hidden');
    };
    Gallery.prototype.hide = function () {
        this.element.classList.add('hidden');
    };
    window.Gallery = Gallery;
})();
