$(document).ready(function () {
  if ($(".product-slider").length > 0) {
    const swiper = new Swiper(".product-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 1,
      centeredSlides: true,
      watchSlidesProgress: true,
      loop: false,
      navigation: {
        prevEl: ".product .swiperBtnPrev",
        nextEl: ".product .swiperBtnNext",
      },
      pagination: {
        el: ".swiper-fractions",
        type: "custom",
        renderCustom: function (swiper, current, total) {
          return `<span class="cur"><span>0${current}</span></span> / <span class="tot">${total}</span>`;
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    });

    swiper.on("slideChangeTransitionStart", function () {
      let prevText = $(".product-slider .swiper-slide-prev").attr("data-title");
      let nextText = $(".product-slider .swiper-slide-next").attr("data-title");

      if (prevText) {
        $(".swiper-controls__text.prev").text(prevText);
      } else {
        $(".swiper-controls__text.prev").text("");
      }

      if (nextText) {
        $(".swiper-controls__text.next").text(nextText);
      } else {
        $(".swiper-controls__text.next").text("");
      }
    });

    $(".swiper-controls__text.prev").on("click", function () {
      swiper.slidePrev();
    });
    $(".swiper-controls__text.next").on("click", function () {
      swiper.slideNext();
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
    const videoFile = $("video").attr("data-video");
    const videoFileNext = $("video").attr("data-video-next");

    video.on("ended", function () {
      if ($("video").hasClass("next-video")) {
        $("video").removeClass("next-video");
        $("video").attr("src", videoFile);
      } else {
        $("video").addClass("next-video");
        $("video").attr("src", videoFileNext);
      }
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
  }

  if ($(".grettings__media").length > 0) {
    let step = 1;
    let count = $(".grettings__media").attr("data-count");

    setInterval(function () {
      if (step > count) {
        step = 1;
      }

      $(".grettings__media source").attr("srcset", `./img/girl${step}.webp`);
      $(".grettings__media img").attr("src", `./img/girl${step}.png`);
      step++;
    }, 5000);
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
