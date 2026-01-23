/**
 * Premium Components Interactive JavaScript
 *
 * This script adds interactivity to premium components in Bootstrap embeddable mode.
 * Include this script after the HTML fragments for full functionality.
 */

(function () {
  "use strict";

  /**
   * Initialize Accordions
   */
  function initAccordions() {
    const accordionHeaders = document.querySelectorAll(".premium-accordion-header");

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const item = this.closest(".premium-accordion-item");
        const collapse = item.querySelector(".premium-accordion-collapse");
        const isActive = item.classList.contains("active");

        // Close all other accordions in the same group (optional)
        const group = item.closest(".premium-accordion-group");
        if (group) {
          group.querySelectorAll(".premium-accordion-item").forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
              const otherCollapse = otherItem.querySelector(".premium-accordion-collapse");
              if (otherCollapse) {
                otherCollapse.classList.remove("expanded");
              }
            }
          });
        }

        // Toggle current accordion
        if (isActive) {
          item.classList.remove("active");
          collapse.classList.remove("expanded");
          this.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("active");
          collapse.classList.add("expanded");
          this.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /**
   * Initialize Checkboxes
   */
  function initCheckboxes() {
    const checkboxes = document.querySelectorAll(".premium-checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        const box = this.querySelector(".premium-checkbox-box");
        const isChecked = box.classList.contains("checked");

        if (isChecked) {
          box.classList.remove("checked");
          // Remove check icon if exists
          const checkIcon = box.querySelector("svg");
          if (checkIcon) checkIcon.remove();
        } else {
          box.classList.add("checked");
          // Add check icon
          const checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          checkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          checkSvg.setAttribute("width", "14");
          checkSvg.setAttribute("height", "14");
          checkSvg.setAttribute("viewBox", "0 0 24 24");
          checkSvg.setAttribute("fill", "none");
          checkSvg.setAttribute("stroke", "currentColor");
          checkSvg.setAttribute("stroke-width", "3");
          checkSvg.setAttribute("stroke-linecap", "round");
          checkSvg.setAttribute("stroke-linejoin", "round");
          checkSvg.classList.add("lucide", "lucide-check");

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", "M20 6 9 17l-5-5");
          checkSvg.appendChild(path);

          box.appendChild(checkSvg);
        }
      });
    });
  }

  /**
   * Initialize Carousel
   */
  function initCarousels() {
    const carousels = document.querySelectorAll(".premium-carousel");

    carousels.forEach((carousel) => {
      const items = carousel.querySelectorAll(".premium-carousel-item");
      const dots = carousel.querySelectorAll(".premium-carousel-dot");
      const prevBtn = carousel.querySelector(".premium-carousel-nav.prev");
      const nextBtn = carousel.querySelector(".premium-carousel-nav.next");

      let currentIndex = 0;
      let isTransitioning = false;

      function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Remove active class from all items and dots
        items.forEach((item) => item.classList.remove("active", "prev"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // Add active class to current item and dot
        items[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");

        // Add prev class to previous item for animation
        const prevIndex = (index - 1 + items.length) % items.length;
        items[prevIndex].classList.add("prev");

        currentIndex = index;

        setTimeout(() => {
          isTransitioning = false;
        }, 600);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          const newIndex = (currentIndex - 1 + items.length) % items.length;
          showSlide(newIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          const newIndex = (currentIndex + 1) % items.length;
          showSlide(newIndex);
        });
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });

      // Auto-play (optional, commented out by default)
      // setInterval(() => {
      //   const newIndex = (currentIndex + 1) % items.length;
      //   showSlide(newIndex);
      // }, 5000);
    });
  }

  /**
   * Initialize all components when DOM is ready
   */
  function init() {
    initAccordions();
    initCheckboxes();
    initCarousels();
  }

  // Run initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose init function for manual re-initialization if needed
  window.initPremiumComponents = init;
})();
