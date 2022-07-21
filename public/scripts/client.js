/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//Starting the client side javascript with the document.ready so that DOM is loaded and ready
$(document).ready(function () {

  //function that creates the entire HTML for a new tweet and returns the HTML
  const createTweetElement = function (tweet) {

    //sanitizing users input so that tags and other potentially malicious tweets can be handled
    const $userInput = $("<p>").text(tweet.content.text)

    //storing the tweet html in a variable and replacing the correct information like avatar, name, handle and time created via accessing the tweet from database
    const $tweet = $(`

      <article class="tweetFeed">
        <header>
          <span class="avatar"><img src=${tweet.user.avatars}></span>
          <span class="username"><p>${tweet.user.name}</p></span>
          <span class="account"><p>${tweet.user.handle}</p></span>
        </header>

        <content>
          <p>${$userInput.html()}</p>
        </content>

        <footer>
          <div>
            <p class="elapsedTime">${timeago.format(tweet.created_at)}</p>
          </div>
          <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`)

    return $tweet;
  }

  //function that looks at each tweet inside the tweet-container which is our database, creates each tweet element, and prepends to the container
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      let $currentTweet = createTweetElement(tweet);
      $(".tweet-container").prepend($currentTweet); //prepend instead of append shows ascending order of tweets based on date, new at top and old at bottom
    }
  }

  //accessing the tweet form via the classs and assigning into jQuery variable
  const $tweetForm = $('.tweet-form');

  //Event handler for when user submits a tweet in the form
  $tweetForm.submit(function (event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead
    $(".error-message").hide(); //as a default, hides the error message window unless required below in conditional

    //validation to check if the submission is empty or too long, with appropriate error messages displayed
    if ($("#tweet-text").val().length === 0) {
      $(".error-message").show()
      $(".error-message").text("The tweet you have entered is empty, please try again!");
      return;
    } else if ($("#tweet-text").val().length > 140) {
      $(".error-message").show();
      $(".error-message").text("The tweet you have entered exceeds the character limit, pleast try again!");
      return;
    }

    //request to the server with a valid tweet submission, that serializes the data as query string
    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: $(this).serialize(),
    }).then(function () {
      event.target[0].value = ""; //resets the form after submission to be blank
      loadTweets(); // running the loadTweets function each time a user submits a tweet
    })
  })

  //function that loads the tweets by first emptying the tweet-container, sending the get ajax request fromt he server, and on success, running the renderTweets function on the entire dataset which will be all the tweets
  const loadTweets = function () {
    $(".tweet-container").empty();

    $.ajax({
      type: "GET",
      url: `/tweets`,
      success: function (data) {
        renderTweets(data);
      },
    });
  }

  //running the loadTweets function once prior to any requests are made by the user to ensure stored tweets from before are already loaded on the page when first visited
  loadTweets();
});