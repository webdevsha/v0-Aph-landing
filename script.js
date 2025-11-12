// Parallax Scrolling Effect
function initParallax() {
  const backgrounds = document.querySelectorAll(".background-image")
  const contentBoxes = document.querySelectorAll(".content-box")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    // Parallax effect for backgrounds
    backgrounds.forEach((bg, index) => {
      const speed = 0.5
      const yPos = -(scrolled * speed)
      bg.style.transform = `translateY(${yPos}px)`
    })

    // Hide scroll indicator after scrolling
    if (scrollIndicator && scrolled > 100) {
      scrollIndicator.style.opacity = "0"
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = "1"
    }

    // Fade in content boxes on scroll
    contentBoxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (boxTop < windowHeight * 0.75) {
        box.classList.add("visible")
      }
    })
  })
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Segment Transition Effects
function initSegmentTransitions() {
  const segments = document.querySelectorAll(".segment")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    {
      threshold: 0.3,
    },
  )

  segments.forEach((segment) => {
    observer.observe(segment)
  })
}

// Navigation Background on Scroll
function initNavBackground() {
  const nav = document.querySelector(".nav")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      nav.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      nav.style.background = "rgba(0, 0, 0, 0.8)"
    }
  })
}

// Initialize all effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initParallax()
  initSmoothScroll()
  initSegmentTransitions()
  initNavBackground()

  // Trigger initial visibility check
  window.dispatchEvent(new Event("scroll"))
})

// Performance optimization: throttle scroll events
let ticking = false
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false
    })
    ticking = true
  }
})
