document.addEventListener("DOMContentLoaded", function () {

  function smoothScrollToTop(duration = 900) {
    const start = window.pageYOffset;
    const startTime = performance.now();
  
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  
    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
  
      window.scrollTo(0, start * (1 - eased));
  
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
  
    requestAnimationFrame(animation);
  }

  /* ==========================
     STACK CAROUSEL
  ========================== */

  document.querySelectorAll(".stack-carousel").forEach(function(carousel) {

    const slides = carousel.querySelectorAll(".slide");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    if (!slides.length || !nextBtn || !prevBtn) return;

    let current = 0;

    function updateSlides() {
      slides.forEach(slide => {
        slide.classList.remove("active", "prev", "next");
      });

      slides[current].classList.add("active");

      let prevIndex = (current - 1 + slides.length) % slides.length;
      let nextIndex = (current + 1) % slides.length;

      slides[prevIndex].classList.add("prev");
      slides[nextIndex].classList.add("next");
    }

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      updateSlides();
    });

    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlides();
    });

    let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        current = (current + 1) % slides.length;
      } else {
        current = (current - 1 + slides.length) % slides.length;
      }
      updateSlides();
    }

    startX = 0;
    endX = 0;
  });


    updateSlides();

  });


  /* ==========================
     FILTRO PORTFOLIO
  ========================== */

  document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      const activeSection = button.closest(".site-section");

      const currentActive = activeSection.querySelector(".portfolio-category.active");

      const nextCategory = activeSection.querySelector(
      `.portfolio-category[data-category="${filter}"]`
      );

      if (!nextCategory || currentActive === nextCategory) return;

      activeSection.querySelectorAll(".filter-btn")
      .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      currentActive.classList.remove("active");
      nextCategory.classList.add("active");

      const currentExp = activeSection.querySelector(".experiencias-category.active");

      const nextExp = activeSection.querySelector(
      `.experiencias-category[data-exp="${filter}"]`
      );

      if (currentExp && nextExp && currentExp !== nextExp) {

        currentExp.classList.remove("active");
        nextExp.classList.add("active");
      }

    });

  });


  /* ==========================
     REVEAL SCROLL
  ========================== */

  const reveals = document.querySelectorAll(".reveal");

  function revealScroll(){

    reveals.forEach(el => {

      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }

    });

  }

  revealScroll();

  window.addEventListener("scroll", revealScroll);


  /* ==========================
     CAMBIO DE SECCIONES
  ========================== */

  document.querySelectorAll(".menu-btn").forEach(button=>{

    button.addEventListener("click",e=>{

      e.preventDefault()

      const section = button.dataset.section

      document.querySelectorAll(".site-section")
      .forEach(s=>s.classList.remove("active"))

      document.querySelector(`.site-section[data-page="${section}"]`)
      .classList.add("active")

      document.querySelectorAll(".menu-btn")
      .forEach(b=>b.classList.remove("active"))

      button.classList.add("active")

   

    })

  })


  /* ==========================
     VIDEO CARRUSEL
  ========================== */

  const videoTrack = document.querySelector(".video-track")
  const videoNext = document.querySelector(".video-nav.next")
  const videoPrev = document.querySelector(".video-nav.prev")

  if(videoTrack && videoNext && videoPrev){

    let index = 0
    const videoWidth = 730

    videoNext.addEventListener("click",()=>{

      index++
      videoTrack.style.transform = `translateX(-${index * videoWidth}px)`

    })

    videoPrev.addEventListener("click",()=>{

      if(index > 0){
        index--
        videoTrack.style.transform = `translateX(-${index * videoWidth}px)`
      }

    })

  }

});


/* ==========================
   NAVBAR SCROLL
========================== */

window.addEventListener("scroll", function() {

  const nav = document.querySelector(".navbar")

  if (!nav) return

  nav.classList.toggle("scrolled", window.scrollY > 50)

})


/* ==========================
   HERO PARALLAX
========================== */

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".hero-img")

  if(hero){
    hero.style.transform = `translateY(${window.scrollY * 0.3}px)`
  }

})


/* ==========================
   VIDEO TABS
========================== */

const videoTabs = document.querySelectorAll(".video-tab")
const mainVideo = document.getElementById("mainVideo")
const videoTitle = document.getElementById("videoTitle")
const videoDesc = document.getElementById("videoDesc")

const videoData = {

  bautizo:{
  src:"videos/bautizo1.mp4",
  poster:"img/bautizocover.jpg",
  title:"Bautizo - Familia López",
  desc:"Celebración familiar capturada en estilo cinematográfico."
  },
  
  cumple:{
  src:"videos/cumple1.mp4",
  poster:"img/cumplecover.jpg",
  title:"Cumpleaños 18 - Andrea",
  desc:"Video highlight del cumpleaños número 18."
  },
  
  fiestas:{
  src:"videos/fiesta1.mp4",
  poster:"img/fiestacover.jpg",
  title:"Fiesta privada",
  desc:"Cobertura audiovisual para eventos y celebraciones."
  }
  
  

}

videoTabs.forEach(tab=>{

  tab.addEventListener("click",()=>{
  
  const type = tab.dataset.video
  const data = videoData[type]
  
  mainVideo.src = data.src
  mainVideo.poster = data.poster
  mainVideo.load()
  videoTitle.textContent = data.title
  videoDesc.textContent = data.desc
  
  videoTabs.forEach(t=>t.classList.remove("active"))
  tab.classList.add("active")
  
  document.querySelectorAll('.site-section[data-page="video"] .experiencias-category')
  .forEach(cat => cat.classList.remove("active"))
  
  const nextCards = document.querySelector(
  `.site-section[data-page="video"] .experiencias-category[data-exp="${type}"]`
  )
  
  if(nextCards){
  nextCards.classList.add("active")
  }
  
  })
  
  })
  
  
  


  
