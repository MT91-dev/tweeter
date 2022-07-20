/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {

  const createTweetElement = function (tweet) {

    const $tweet = $(`

      <article class="tweetFeed">
      <header>
      <span class="avatar"><img src=${tweet.user.avatars}></span>
      <span class="username"><p>${tweet.user.name}</p></span>
      <span class="account"><p>${tweet.user.handle}</p></span>
      </header>

      <content>
        <p>${tweet.content.text}</p>
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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      let $currentTweet = createTweetElement(tweet);
      $(".tweet-container").append($currentTweet);
    }
  }

  const $tweetForm = $('#tweet-form');

  $tweetForm.submit(function(event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead


    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: $(this).serialize(),
    }).then(function() {
      loadTweets()
    })
    // console.log($(this).serialize());
  })

  const loadTweets = function() {
    $(".tweet-container").empty();

    $.ajax({
      type: "GET",
      url: `/tweets`,
      success: function(data) {
        renderTweets(data);
      },
    });
  }
});