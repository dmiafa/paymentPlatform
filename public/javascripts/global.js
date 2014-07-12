$(document).ready(function() {
    var ticketPriceArray = $('.ticketPrice');
    var ticketQuantityArray = $('.ticketQuantity');
  var updatePrice = function() {
          var totalPrice = 0;
    for (var i = 0; i < ticketPriceArray.length; i++) {
      try {
        totalPrice += parseInt(ticketPriceArray[i].innerHTML) * parseInt(
          ticketQuantityArray[i].value);
      } catch (err) {
        totalPrice = -1;
      }
    }
    $('#totalPrice')[0].innerHTML = totalPrice;
  }

  var validateQuantity = function() {
    for (var i = 0; i < ticketQuantityArray.length; i++) {
      try {
        var quantity = parseInt(ticketQuantityArray[i].value);
        if(quantity<0){
          ticketQuantityArray[i].value = 0;
          updatePrice();
          throw "Please select a positive number of tickets.";
        }
      } catch (err) {
        alert(err);
      }
    }

  }

  $('.ticketQuantity').change(function() {
    updatePrice();
    validateQuantity();
  });
  updatePrice();


})