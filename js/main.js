$(document).ready(function () {
  if ($(".product-slider").length > 0) {
    const swiper = new Swiper(".product-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 1,
      centeredSlides: true,
      watchSlidesProgress: true,
      loop: false,
      // autoplay: {
      //   delay: 5000,
      // },
      navigation: {
        prevEl: ".product .swiperBtnPrev",
        nextEl: ".product .swiperBtnNext",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    });
  }

  if ($("[data-fancybox]").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".video").length > 0) {
    const video = $("video");
    let step = 1;
    let count = $(".video-about .video").attr("data-count");

    video.on("ended", function () {
      step++;

      if (step > count) {
        step = 1;
      }

      $(".video-about video").attr("src", `./img/video/video${step}.mp4`);
    });

    $(".video__btn--play").on("click", function () {
      let self = $(this);

      if ($(this).parents(".video").find("video").length > 0) {
        let elem = $(this).parents(".video").find("video");
        self.toggleClass("paused");
        $(this).parents(".video").toggleClass("play");
        self.hasClass("paused") ? elem.trigger("play") : elem.trigger("pause");
      }
    });
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      onShow: () => {
        $("body").addClass("modal-open");
      },
      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        $("body").addClass("modal-open");
      });
    });

    $("[data-micromodal-close]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        if ($(this).attr("data-modal")) {
          setTimeout(() => {
            $("body").addClass("modal-open");
          }, 0.1);
        }
      });
    });
  }

  if ($(".form-section").length > 0) {
    $("#site_form").on("submit", function (event) {
      event.preventDefault();

      let formData = $(this).serialize();

      $.ajax({
        url: "./form.php",
        type: "POST",
        data: formData,
        success: function (response) {
          MicroModal.show("modal-success");
          $(".form-section input").val("");
        },
        error: function (error) {
          console.error(error);
        },
      });
    });

    $("#site_form_popup").on("submit", function (event) {
      event.preventDefault();

      let formData = $(this).serialize();

      $.ajax({
        url: "./form.php",
        type: "POST",
        data: formData,
        success: function (response) {
          MicroModal.close("modal-form");
          MicroModal.show("modal-success");
          $(".form-section input").val("");
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  }

  if ($(".grettings__media").length > 0) {
    const swiper = new Swiper(".grettings__media", {
      slidesPerView: 1,
      watchSlidesProgress: true,
      loop: true,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
      },
    });
  }

  if ($(".map").length > 0) {
    // initMap();
  }
});

// yandex map
async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(
    document.getElementById("map"),
    {
      location: {
        center: [37.623082, 55.75254],
        zoom: 10,
        behaviors: ["drag", "pinchZoom", "mouseTilt"],
      },
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
  );

  const markerElement = document.createElement("span");
  const child = document.createElement("span");
  markerElement.className = "icon-marker";

  child.className = "icon-marker__text";
  // child.textContent = getArrItem[i].NAME;

  markerElement.appendChild(child);

  map.addChild(
    new YMapMarker(
      {
        coordinates: [Number(lng), Number(lat)],
      },
      markerElement
    )
  );

  setTimeout(() => {
    $(".map").addClass("load");
  }, 2000);
}
// /yandex map
