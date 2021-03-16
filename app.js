let chute = new chutejs


//GLOBALS
// let arrowTimer

//set up burger menu
const setBurgerMenu = () => {
  const preload = document.getElementsByClassName("preload")[0]
  const burgerMenu = document.querySelector(".burger-menu")
  const navItems = document.querySelector(".nav-items")
  chute.addToAttributes(navItems, {"class": "nav-inactive"})
  chute.removeFromAttribute(preload, {"class": "preload"})
  burgerMenu.addEventListener("click", () => {
    navItems.classList.toggle("nav-active")
    navItems.classList.toggle("nav-inactive")
    burgerMenu.classList.toggle("toggle")
  })
}

//Handle when a card is clicked to bring oup modal
const handleCardClick = (event, el) => {
  const modal = chute.createFullElement("div",  {"class": "modal", "id": "modal"})
  modal.addEventListener("click", (event) => {modal.remove()})
  document.getElementById("root").prepend(modal)
  const targetCard = el.cloneNode(true)
  chute.addToAttributes(targetCard, {"class" : "card-clicked"})
  chute.preventBubbling("click", targetCard)
  modal.append(targetCard)
} 

//Select all cards form ths about me section and add the click event listener
const aboutCards = Array.from(document.getElementsByClassName("card"))
aboutCards.forEach(el => {el.addEventListener('click', (event) => handleCardClick(event, el))})

//Set up carousel buttons when screen width is below 1024px
let arrowTimer
const showCarouselButtons =  (time) => {
  console.log(event.target)
  if(arrowTimer){
    clearTimeout(arrowTimer)
  }
  let buttons = document.querySelectorAll(".carousel-button-class")
  //just takes the first button as they all should have same classes at this point
  if(buttons[0].className.includes('carousel-button-hidden')){
  buttons.forEach(btn => {
    chute.setNewAttributes(btn, {"class": "carousel-button carousel-button-class"})
    btn.addEventListener("click", () => showCarouselButtons(2000))
  })}
  arrowTimer = window.setTimeout(()=> {
      buttons.forEach(btn => {
        chute.setNewAttributes(btn, {"class": "carousel-button-hidden carousel-button-class"})
        console.log(arrowTimer, 'here')
      })
    }, time)
    console.log(arrowTimer)

}

//Carousel
const buildCarousel = () => {
  const carousel = document.querySelector('#project-carousel');
  const wrapper = document.querySelector('.wrapper');

	let projectCards = document.querySelectorAll('.project-card');
  carousel.addEventListener("mousemove", () => showCarouselButtons(2000))
  carousel.addEventListener("click", () => showCarouselButtons(2000))
	const projectPrev = document.querySelector('#project-button-prev');
	const projectNext= document.querySelector('#project-button-next');
  projectPrev.addEventListener('click', function() {
		carousel.insertBefore(projectCards [projectCards.length - 1], projectCards [0]);
		projectCards  = document.querySelectorAll('.project-card');
	});
  projectNext.addEventListener('click', function() {
		carousel.appendChild(projectCards[0]);
		projectCards = document.querySelectorAll('.project-card');
	});
}




// Set up page load
window.onload =  function() {
setBurgerMenu()
buildCarousel()

}