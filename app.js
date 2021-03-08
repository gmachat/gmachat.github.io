let chute = new chutejs

window.onload =  function() {
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

console.log(document.querySelector("nav").scrollTop)

const handleCardClick = (event, el) => {
  const modal = chute.createFullElement("div",  {"class": "modal", "id": "modal"})
  modal.addEventListener("click", (event) => {modal.remove()})
  document.getElementById("root").prepend(modal)
  const targetCard = el.cloneNode(true)
  chute.addToAttributes(targetCard, {"class" : "card-clicked"})
  chute.preventBubbling("click", targetCard)
  modal.append(targetCard)
} 

//activate nav-bar-sliding




const cards = Array.from(document.getElementsByClassName("card"))

cards.forEach(el => {el.addEventListener('click', (event) => handleCardClick(event, el))})

