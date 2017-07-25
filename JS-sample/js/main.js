


var hotels = [];
var filteredHotels = [];
var page = 0;
var PAGE_SIZE = 6;
var Hotel;
getHotels();

var container = document.querySelector('.hotelList');
var filter = document.querySelector('.filter-list');
filter.addEventListener('click', function (evt) {
  var clickedElement = evt.target;
  if (clickedElement.classList.contains('filter')){
      setActiveFilter(clickedElement.id);
  }
});

// альтернативный способ фильтрации
/*var filter = document.querySelectorAll('.filter');
for (var i = 0; i < filter.length; i++) {
    filter[i].onclick = function (evt) {
        var clickedElementID = evt.target.id;
        setActiveFilter(clickedElementID);
    };
}*/

var scrollTimeout;
window.addEventListener('scroll', function (evt) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        console.log('scrollevent');
        var footerCoordinate = document.querySelector('footer').getBoundingClientRect();
        var viewportSize = window.innerHeight;
        console.log(footerCoordinate.bottom - window.innerHeight <= footerCoordinate.height);
        if (footerCoordinate.bottom - viewportSize <= footerCoordinate.height) {
            if (page < Math.ceil(filteredHotels.length / PAGE_SIZE)){
                console.log(page);
                renderHotels(filteredHotels, ++page);
            }
            if (page < Math.ceil(hotels.length / PAGE_SIZE)){
                console.log(page);
                renderHotels(hotels, ++page);
            }
        }
    }, 100);
});

// отрисовка списка отелей
function renderHotels(hotels, page, replace) {
    if (replace) {
        container.innerHTML = '';
    }
    var fragment = document.createDocumentFragment();

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageHotels = hotels.slice(from, to);

    pageHotels.forEach(function (hotel) {
        var hotelElement = new Hotel(hotel);
        hotelElement.render();
        fragment.appendChild(hotelElement.element);
    });
    container.appendChild(fragment);
}

// фильтрация списка отелей
var activeFilter = 'filter';
function setActiveFilter(id) {
    page = 0;
    if (activeFilter === id) {
        return;
    }

    filteredHotels = hotels.slice(0);
    switch (id) {
        case 'filter-all':
            renderHotels(hotels);
            break;
        case 'height-price':
            filteredHotels = filteredHotels.sort(function (a, b) {
                return b.price - a.price;
            });
            break;
        case 'low-price':
            filteredHotels = filteredHotels.sort(function (a, b) {
                return a.price - b.price;
            });
            break;
        case 'height-rating':
            filteredHotels = filteredHotels.sort(function (a, b) {
                return b.rating - a.rating;
            });
            break;
        case 'low-rating':
            filteredHotels = filteredHotels.sort(function (a, b) {
                return a.rating - b.rating;
            });
            break;
    }
    renderHotels(filteredHotels, 0, true);
    console.log(filteredHotels);
    activeFilter = id;
}

// загруска списка отелей
function getHotels() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data.json');
    xhr.onload = function (evt) {
        var rawData = evt.target.response;
        var loadedHotels = JSON.parse(rawData);
        hotels = loadedHotels;
        renderHotels(loadedHotels, 0);
    };
    xhr.send();
}
