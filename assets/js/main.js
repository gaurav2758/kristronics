$(document).ready(function () {

  /* ------------------ Hero Slider ------------------ */
  let $slides = $(".hero-slider .slide");
  let current = 0;
  let autoSlide;

  function showSlide(index) {
    $slides.removeClass("active zoom");
    let $currentSlide = $slides.eq(index);

    // Fade + Zoom animation
    $currentSlide.addClass("active");
    setTimeout(() => $currentSlide.addClass("zoom"), 50);
  }

  function nextSlide() {
    current = (current + 1) % $slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + $slides.length) % $slides.length;
    showSlide(current);
  }

  // Buttons
  $(".arrow.next").on("click", nextSlide);
  $(".arrow.prev").on("click", prevSlide);

  /* ------------------ Auto Slide ------------------ */
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  startAutoSlide();

  /* ------------------ Pause on Hover ------------------ */
  $(".hero-slider").hover(
    function () { stopAutoSlide(); },
    function () { startAutoSlide(); }
  );

  /* ------------------ Touch Swipe (Mobile) ------------------ */
  let startX = 0;

  $(".hero-slider")
    .on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
      stopAutoSlide();
    })
    .on("touchend", function (e) {
      let endX = e.originalEvent.changedTouches[0].clientX;
      let diff = startX - endX;

      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();   // Swipe left → next
        else prevSlide();           // Swipe right → prev
      }

      startAutoSlide();
    });

  /* ------------------ AOS Init ------------------ */
  AOS.init({
    duration: 1000,
    once: true
  });

  /* ------------------ Hover Dropdown ------------------ */
  function setupHoverDropdown() {
    $(".nav-item.dropdown").each(function () {
      let $drop = $(this);
      let $menu = $drop.find(".dropdown-menu");

      $drop.off("mouseenter mouseleave");

      if ($(window).width() > 992) {
        $drop.on("mouseenter", () => $menu.addClass("show"));
        $drop.on("mouseleave", () => $menu.removeClass("show"));
      }
    });
  }

  setupHoverDropdown();
  $(window).on("resize", setupHoverDropdown);

  /* ------------------ Logo Infinite Scroll ------------------ */
  let $track = $("#logoTrack");
  if ($track.length) {
    $track.after($track.clone());
  }
});

$(document).ready(function () {

  /* ---------------------------
       SLIDER CORE VARIABLES
  --------------------------- */
  let totalSlides = $(".lpslide").length;
  let current = 0;
  let autoplaySpeed = 4000; // 4 seconds

  /* ---------------------------
       CREATE DOTS DYNAMICALLY
  --------------------------- */
  for (let i = 0; i < totalSlides; i++) {
    $(".lpdots").append(`<div class="lpdot ${i === 0 ? "active" : ""}"></div>`);
  }

  let dots = $(".lpdot");


  /* ---------------------------
       SHOW SLIDE FUNCTION
  --------------------------- */
  function showSlide(index) {
    $(".lpslide").removeClass("active").eq(index).addClass("active");
    dots.removeClass("active").eq(index).addClass("active");
    current = index;
  }

  /* ---------------------------
       NEXT / PREVIOUS LOGIC
  --------------------------- */
  function nextSlide() {
    let nextIndex = (current + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (current - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
  }


  /* ---------------------------
       BUTTON CLICK EVENTS
  --------------------------- */
  $(".next").click(nextSlide);
  $(".prev").click(prevSlide);

  dots.click(function () {
    let index = $(this).index();
    showSlide(index);
  });


  /* ---------------------------
       AUTOPLAY + PAUSE ON HOVER
  --------------------------- */
  let autoplay = setInterval(nextSlide, autoplaySpeed);

  $(".lpslider").hover(
    function () { clearInterval(autoplay); },
    function () { autoplay = setInterval(nextSlide, autoplaySpeed); }
  );


  /* ---------------------------
       MOBILE SWIPE SUPPORT
  --------------------------- */
  let startX = 0;
  let endX = 0;

  $(".lpslider").on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
  });

  $(".lpslider").on("touchmove", function (e) {
      endX = e.originalEvent.touches[0].clientX;
  });

  $(".lpslider").on("touchend", function () {
      let diff = startX - endX;

      if (Math.abs(diff) > 50) { // swipe threshold
          if (diff > 0) {
              nextSlide();  // swipe left
          } else {
              prevSlide();  // swipe right
          }
      }
  });

});
