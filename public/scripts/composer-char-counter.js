$(document).ready(function () {
  // --- our code goes here ---
  const tweetText = document.getElementById("tweet-text");

  $(tweetText).on('input', function() {
    let charEntered = ($(this).val().length);
    let charRemaining = 140 - charEntered;
    let targetCounter = ($(this).parent().children().children('.counter'));
    $(targetCounter).text(charRemaining);

    if (charRemaining < 0) {
      targetCounter.addClass('red');
    } else {
      targetCounter.removeClass('red');
    }

  });
});
