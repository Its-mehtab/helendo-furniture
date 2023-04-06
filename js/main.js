$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 200) {
    $(".navbar").addClass("fixed-nav");
  } else {
    $(".navbar").removeClass("fixed-nav");
  }
});

$("#main-slider").owlCarousel({
  loop: true,
  margin: 15,
  nav: false,
  items: 1,
  smartSpeed: 450,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  // responsive: {
  //     0: {
  //         items: 1
  //     },
  //     600: {
  //         items: 1
  //     },
  //     1000: {
  //         items: 1
  //     }
  // }
});
$("#shopping-items").owlCarousel({
  loop: true,
  margin: 30,
  dots: false,
  items: 4,
  smartSpeed: 450,
  nav: true,
  navText: [
    "<span class='lnr lnr-arrow-left'></span>",
    "<span class='lnr lnr-arrow-right'></span>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    500: {
      items: 2,
    },
    800: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});
function makeTimer() {
  //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
  var endTime = new Date("20 September 2023 12:00:00 GMT+01:00");
  endTime = Date.parse(endTime) / 1000;

  var now = new Date();
  now = Date.parse(now) / 1000;

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - days * 86400) / 3600);
  var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  var seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );

  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }
  $("#days").html(days);
  $("#hours").html(hours);
  $("#minutes").html(minutes);
  $("#seconds").html(seconds);
}
setInterval(function () {
  makeTimer();
}, 1000);

$(document).ready(function () {
  "use strict";
  var offSetTop = 200;
  var $scrollToTopButton = $(".scrolltotop");

  $(window).scroll(function () {
    if ($(this).scrollTop() > offSetTop) {
      // $scrollToTopButton.fadeIn();
      $(".scrolltotop").addClass("show");
    } else {
      // $scrollToTopButton.fadeOut();
      $(".scrolltotop").removeClass("show");
    }
  });

  $scrollToTopButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
