//Starting the with the document.ready so that the DOM can read JS code once it is ready
$(document).ready(function () {

  //storing the element by class tweet-text into tweetText variable
  const tweetText = document.getElementById("tweet-text");

  //adding an event handler input on tweetText element with jQuery
  $(tweetText).on('input', function() {
    //listening for the characters entered, getting their length, subtracting from the limit and traversing up the dom tree to find the element for counter via the class
    const limitChar = 140;
    let charEntered = ($(this).val().length);
    let charRemaining = limitChar - charEntered;
    let targetCounter = ($(this).parent().children().children('.counter'));
    
    //minor validation that adds a new class "red" to the counter so that CSS can be applied via the red class
    if (charRemaining < 0) {
      targetCounter.addClass('red');
    } else {
      targetCounter.removeClass('red');
    }
    //replacing the text that is shown at the counter element with the charRemaining variable computed from above
    $(targetCounter).text(charRemaining);
    
  });
});
