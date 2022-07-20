/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

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
          <p class="elapsedTime">${tweet.created_at}</p>
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

  renderTweets(data);

});