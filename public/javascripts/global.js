$(document).ready(function() {
  var ticketPriceArray = $('.ticketPrice');
  var ticketQuantityArray = $('.ticketQuantity');

  var calculatePriceInDollars = function() {
    var totalPrice = 0;
    try {
      for (var i = 0; i < ticketPriceArray.length; i++) {
        totalPrice += parseInt(ticketPriceArray[i].innerHTML) * parseInt(
          ticketQuantityArray[i].value);
      }
    } catch (err) {
      alert("Sorry, something went wrong. Please refresh and try again.");
    }
    return totalPrice;
  }
  var calculateQuantity = function() {
    var totalQuantity = 0;
    try {
      for (var i = 0; i < ticketQuantityArray.length; i++) {
        totalQuantity += parseInt(ticketQuantityArray[i].value)
      }
    } catch (err) {
      alert("Sorry, something went wrong. Please refresh and try again.");
    }

    return totalQuantity;

  }

  var updatePrice = function() {
    var totalPriceInDollars = calculatePriceInDollars();
    var totalQuantity = calculateQuantity();
    $('#totalPrice')[0].innerHTML = totalPriceInDollars;
  }

  var validateQuantity = function() {
    for (var i = 0; i < ticketQuantityArray.length; i++) {
      try {
        var quantity = parseInt(ticketQuantityArray[i].value);
        if (quantity < 0) {
          ticketQuantityArray[i].value = 0;
          updatePrice();
          throw "Please select a positive number of tickets.";
        }
      } catch (err) {
        alert(err);
      }
    }

  }

  $('#stripeCheckout').click(function() {
    var token = function(res) {
      var $input = $('<input type=hidden name=stripeToken />').val(res.id);
      $('form').append($input).submit();
    };
    var totalPriceInDollars = calculatePriceInDollars();
    var totalQuantity = calculateQuantity();
    StripeCheckout.open({
      key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      amount: totalPriceInDollars*100,
      currency: 'usd',
      name: 'NYC Loft Parties',
      description: totalQuantity + " total ticket" + ((totalQuantity == 1) ?
        "" : "s"),
      panelLabel: 'Checkout',
      token: token
    });

    return false;
  })

  $('.ticketQuantity').change(function() {
    validateQuantity();
    updatePrice();
  });

  updatePrice();


})