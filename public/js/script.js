/* global $ */
$(document).ready(function () {
  $("#slides").superslides({
    animation: "fade",
    play: 5000,
    pagination: false,
  });

  var typed = new Typed(".typed", {
    strings: ["Aspiring Full Stack Developer", "AI Enthusiast"],
    typeSpeed: 60,
    startDelay: 900,
    showCursor: false,
    loop: true,
    backDelay: 900,
    backSpeed: 40,
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    items: 4,
    nav: true,              // enable arrows
    navText: [
      '<i class="fas fa-arrow-left"></i>',   // left arrow icon
      '<i class="fas fa-arrow-right"></i>'   // right arrow icon
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      938: {
        items: 4,
      },
    },
  });

  var skillsTopOffset = 0;
  var statsTopOffset = 0;
  var countUpFinished = false;

  if ($(".skillsSection").length) {
    skillsTopOffset = $(".skillsSection").offset().top;
  }

  if ($(".statsSection").length) {
    statsTopOffset = $(".statsSection").offset().top;
  }
  $(".chart").easyPieChart({
  easing: "easeInOut",
  barColor: "#3498db",   // visible color
  trackColor: "#ddd",
  scaleColor: false,
  lineWidth: 4,
  size: 152,
  animate: 2000,
  onStep: function (from, to, percent) {
    $(this.el).find(".percent").text(Math.round(percent));
  },
  });
 
  $(window).scroll(function () {
    if (statsTopOffset &&
  !countUpFinished && window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }
    if (
      !countUpFinished &&
      window.pageYOffset > statsTopOffset - $(window).height() + 200
    ) {
      $(".counter").each(function () {
        var element = $(this);
        var endVal = parseInt(element.text());
        element.countup(endVal);
      });
      countUpFinished = true;
    }
  });

  $("[data-fancybox]").fancybox();
  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");

    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });
    return false;
  });

  $("#navigation li a").click(function (e) {
    e.preventDefault();
    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;
    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  const nav = $("#navigation");
  const navTop = nav.offset().top;

  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");
    if ($(window).scrollTop() >= navTop) {
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});
