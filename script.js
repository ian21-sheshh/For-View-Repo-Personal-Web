const slider = document.getElementById("skillsSlider");
const slides = slider.querySelectorAll(".slide");

let index = 1;          // start at first real slide (since first is clone)
let slideWidth = 0;

// Compute actual slide width + flex gap
function computeSlideWidth() {
    const firstSlide = slides[0];
    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    slideWidth = firstSlide.getBoundingClientRect().width + gap;
}

function applyTransform() {
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
}

// Initial setup
computeSlideWidth();
applyTransform();

// Update on window resize so slider stays correct on different screen sizes
window.addEventListener("resize", () => {
    computeSlideWidth();
    slider.style.transition = "none";
    applyTransform();
});

// NEXT
function slideRight() {
    if (index >= slides.length - 1) return; // stop at last clone
    index++;
    slider.style.transition = "0.5s";
    applyTransform();
}

// PREVIOUS
function slideLeft() {
    if (index <= 0) return; // stop at first clone
    index--;
    slider.style.transition = "0.5s";
    applyTransform();
}

// LOOP RESET (infinite effect using clones)
slider.addEventListener("transitionend", () => {
    if (slides[index].classList.contains("clone")) {
        slider.style.transition = "none";
        // if we went left into first clone, jump to last real slide
        // if we went right into last clone, jump to first real slide
        index = index === 0 ? slides.length - 2 : 1;
        applyTransform();
    }
});
