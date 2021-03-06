$(function () {
  if ($(window).width() < 769) {
    $(".bottomHeader").css({ top: $(".topHeader").outerHeight(true) });
  }

  $(".tab_title_inner_blk li").on("click", function (e) {
    e.preventDefault();
    $(".mainAddress, .locationNow").removeClass("active");
    changeTab($(this));
  });

  if ($(".scroll").length) {
    $(".scroll").jScrollPane();
  }
  $("body").on("click", ".listigHeader .compDetails", function (e) {
    var el = $(this).parents(".listigHeader");
    $(".box-acco").find(".level-box").stop().slideUp();
    $(el).find(".locationNow").toggleClass("active");
    $(el).closest(".box-acco").find(".level-box").stop().slideToggle();
    $(".mainAddress").addClass("active");
    $(".tab_cont_li, .tab_title_inner_blk li").removeClass("active");
  });
  $("body").on("click", ".locationNow", function (e) {
    $(".mainAddress").addClass("active");
    $(".tab_cont_li, .tab_title_inner_blk li").removeClass("active");
  });
});

$(window).resize(function () {
  if ($(".scroll").length) {
    $(".scroll").jScrollPane();
  }
  // var bannerHeight = $(window).height() - $("header").height();
  // $(".banner_blk").height(bannerHeight);
});

function changeTab(el) {
  el.parents(".tab_blk").find(".tab_title_inner_blk li").removeClass("active");
  el.addClass("active");
  var index = el.parents(".tab_blk").find(".tab_title_inner_blk li").index(el);
  el.parents(".tab_blk")
    .find(".tab_cont_li")
    .removeClass("active")
    .eq(index)
    .addClass("active");
  // console.log(index);
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
