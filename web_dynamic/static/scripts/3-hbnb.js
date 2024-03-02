(document).ready(function () {
  const amenities = {};
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join('', ''));
  });
});
// Request http://0.0.0.0:5001/api/v1/status/
$.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

// Request http://0.0.0.0:5001/api/v1/places_search/
$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: JSON.stringify({})
}).done(function (data) {
  for (const place of data) {
    const template = `<article>
    
            <div class="title">
    
              <h2>${place.name}</h2>
    
              <div class="price_by_night">
    
            $${place.price_by_night}
    
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.max_guest} Guests
    
              </div>
              <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
    
            <br />
    
            ${place.number_bathrooms} Bathroom
    
              </div>
            </div>
            <div class="description">
    
              ${place.description}
    
            </div>
    
          </article> <!-- End 1 PLACE Article -->`;
    $('section.places').append(template);
  }
});
