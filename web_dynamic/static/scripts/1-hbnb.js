$(document).ready(function() {
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
      var checkedAmenities = [];
      
      // If the checkbox is checked, store the Amenity ID in a variable
      $('input[type="checkbox"]:checked').each(function() {
        checkedAmenities.push($(this).data('id'));
      });
      
      // Update the <h4> tag inside the div Amenities with the list of Amenities checked
      $('.amenities h4').text(checkedAmenities.join(', '));
    });
  });
  