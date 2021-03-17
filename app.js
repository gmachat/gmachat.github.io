let chute = new chutejs


//GLOBALS
const carousel = document.querySelector('#project-carousel');



//set up burger menu
const setBurgerMenu = () => {
  const preload = document.getElementsByClassName("preload")[0]
  const burgerMenu = document.querySelector(".burger-menu")
  const navItems = document.querySelector(".nav-items")
  chute.addToAttributes(navItems, {
    "class": "nav-inactive"
  })
  chute.removeFromAttribute(preload, {
    "class": "preload"
  })
  burgerMenu.addEventListener("click", () => {
    navItems.classList.toggle("nav-active")
    navItems.classList.toggle("nav-inactive")
    burgerMenu.classList.toggle("toggle")
  })
}




//Handle when a card is clicked to bring oup modal
const handleCardClick = (event, el) => {
  const modal = chute.createFullElement("div", {
    "class": "modal",
    "id": "modal"
  })
  modal.addEventListener("click", (event) => {
    modal.remove()
  })
  document.getElementById("root").prepend(modal)
  const targetCard = el.cloneNode(true)
  chute.addToAttributes(targetCard, {
    "class": "card-clicked"
  })
  chute.preventBubbling("click", targetCard)
  modal.append(targetCard)
}





//Select all cards form ths about me section and add the click event listener
const aboutCards = Array.from(document.getElementsByClassName("card"))
aboutCards.forEach(el => {
  el.addEventListener('click', (event) => handleCardClick(event, el))
})



//Set up carousel buttons when screen width is below 1024px
let arrowTimer
const showCarouselButtons = (time) => {
  if (arrowTimer) {
    clearTimeout(arrowTimer)
  }

  let buttons = document.querySelectorAll(".carousel-button-class")

  let cardCount = document.getElementById("card-count")
  cardCount.setAttribute('class', 'card-count-active')

  //just takes the first button as they all should have same classes at this point
  if (buttons[0].className.includes('carousel-button-hidden')) {
    buttons.forEach(btn => {
      chute.setNewAttributes(btn, {
        "class": "carousel-button carousel-button-class"
      })
      btn.addEventListener("click", () => showCarouselButtons(2000))
    })
  }
  arrowTimer = window.setTimeout(() => {
    buttons.forEach(btn => {
      chute.setNewAttributes(btn, {
        "class": "carousel-button-hidden carousel-button-class"
      })
      cardCount.setAttribute('class', 'card-count-inactive')
    })
  }, time)
}

//Carousel
let currentPage = 1
const buildCarousel = () => {
  //select needed elements
  const carousel = document.querySelector('#project-carousel');
  const projectPrev = document.querySelector('#project-button-prev');
  const projectNext = document.querySelector('#project-button-next');
  const cardCount = document.getElementById('card-count')
  let projectCards = document.querySelectorAll('.project-card');
  let totalPages = projectCards.length


  cardCount.innerHTML = `${currentPage}/${totalPages}`

  //displays the buttons when user moves mouse into carousel
  carousel.addEventListener("mousemove", () => showCarouselButtons(2000))
  carousel.addEventListener("click", () => showCarouselButtons(2000))


  const handlePrevClick = () => {
    carousel.insertBefore(projectCards[projectCards.length - 1], projectCards[0]);
    projectCards = document.querySelectorAll('.project-card');
    currentPage -= 1
    if (currentPage == 0) currentPage = totalPages
    cardCount.innerHTML = `${currentPage}/${totalPages}`

  }
  const handleNextClick = () => {
    carousel.appendChild(projectCards[0]);
    projectCards = document.querySelectorAll('.project-card');
    currentPage += 1
    if (currentPage == 7) currentPage = 1
    cardCount.innerHTML = `${currentPage}/${totalPages}`

  };
  projectNext.addEventListener('click', handleNextClick)
  projectPrev.addEventListener('click', handlePrevClick)


  //Add swipe functionality
  {
    let startX = 0;
    let startY = 0;

    function handleTouchStart(e) {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    }

    function handleTouchEnd(e) {
      //calculate differences in each swipe direction
      const diffX = e.changedTouches[0].screenX - startX;
      const diffY = e.changedTouches[0].screenY - startY;
      const ratioX = Math.abs(diffX / diffY);
      const ratioY = Math.abs(diffY / diffX);
      const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

      // Ignore minor touches.
      if (absDiff < 50) {
        return;
      }
      //ensures that only lateral swipes are counted
      if (ratioX > ratioY) {
        if (diffX >= 0) {
          handlePrevClick()
        } else {
          handleNextClick()
        }
      }
    }
    carousel.addEventListener('touchstart', handleTouchStart)
    carousel.addEventListener('touchend', handleTouchEnd)

  }
}



//responds to user scroll.  If they scroll -X past nav bar, it sticks to the top (after portrait)
//also shows card cound when user scrolls to projects, this shows the user there are multiple
{
  const navBar = document.querySelector('nav');
  const about = document.querySelector('about')
  const cardCount = document.querySelector('#card-count')

  window.addEventListener('scroll', () => {
    //fix nav to top
    if (navBar.getBoundingClientRect().top <= 0) {
      navBar.style.position = 'fixed'
      navBar.style.top = '0px'
    }
    if (navBar.getBoundingClientRect().bottom <= about.getBoundingClientRect().top) {
      navBar.style.position = 'relative'
    }
    //show card count when user scrolls down
    if (carousel.getBoundingClientRect().top <= 200) {
      cardCount.setAttribute('class', 'card-count-active')
      window.setTimeout(() => {
        cardCount.setAttribute('class', 'card-count-inactive')
      }, 3000)
    }
  })
}



// Set up page load
window.onload = function () {
  setBurgerMenu()
  buildCarousel()

}