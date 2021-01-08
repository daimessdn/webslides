hljs.initHighlightingOnLoad();

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const contentList = document.querySelector(".content-list");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#previous");
const contentToggleButton = document.querySelector("#toggle-content-list");

const linkedInShareButton = document.querySelector("#linkedin-share-button");
const twitterShareButton = document.querySelector("#twitter-share-button");

// move slides
const moveSlide = (currentSlide) => {
  slides.forEach(slide => {
    slide.style.transform = `translateY(-${currentSlide * 100}vh)`;
  });

  document.querySelector('#current-slide-number').innerHTML = currentSlide + 1;  
};


document.addEventListener('DOMContentLoaded', (event) => {
  let htmlListContent = document.querySelector(".content-list ul");

  // generate slide content list
  slides.forEach((slide, index) => {
    htmlListContent.innerHTML += `
      <li onclick="currentSlide = ${index};
                   moveSlide(currentSlide);
                   document.querySelector('.content-list').style.display = 'none';">
          ${slide.firstElementChild.firstElementChild.textContent}
      </li>
      `;
  });

  // get all `pre code` for highlightjs
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

  // first, find all the div.code blocks
  document.querySelectorAll('div.code').forEach(block => {
    // then highlight each
    hljs.highlightBlock(block);
  });

  // load the slide number on slide control
  document.querySelector("#current-slide-number").innerHTML = currentSlide + 1;
  document.querySelector("#total-slide-number").innerHTML = slides.length;
});

// slides navigation
//// on keyboard press
document.addEventListener("keyup", (event) => {
  if (
    (
      event.key == "ArrowRight" ||
      event.key == "ArrowDown"
    ) &&
    currentSlide < (slides.length - 1)
  ) {
    currentSlide++;
  } else if (
    (
      event.key == "ArrowLeft" ||
      event.key == "ArrowUp"
    ) &&
    currentSlide > 0
  ) {
    currentSlide--;
  }

  // console.log(currentSlide);
  moveSlide(currentSlide);
});

// previous button click event
prevButton.addEventListener("click", (event) => {
  if (currentSlide > 0) {
    currentSlide--;
    moveSlide(currentSlide);
  }
});

// next button click event
nextButton.addEventListener("click", (event) => {
  if (currentSlide < (slides.length - 1)) {
    currentSlide++;
    moveSlide(currentSlide);
  }
});

// content list toggle click event
contentToggleButton.addEventListener("click", (event => {
  const style = contentList.style.display;
  contentList.style.display = style == 'none' ? 'block' : 'none';
}));

// init'd service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  });
}

twitterShareButton.addEventListener("click", (event) => {
  window.open(`https://twitter.com/share?url=${window.location.href}`, "_blank");
});

linkedInShareButton.addEventListener("click", (event) => {
  window.open(`www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank");
});