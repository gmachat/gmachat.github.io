const setBurgerMenu = () => {
  const preload = document.querySelector('.preload')
  const burgerMenu = document.querySelector('.burger-menu')
  const navItems = document.querySelector('.nav-items')
  const navLinks = document.querySelectorAll('.nav-link')

  preload?.classList.remove('preload')
  navItems.classList.add('nav-inactive')

  const setMenuOpen = (isOpen) => {
    navItems.classList.toggle('nav-active', isOpen)
    navItems.classList.toggle('nav-inactive', !isOpen)
    burgerMenu.classList.toggle('toggle', isOpen)
    burgerMenu.setAttribute('aria-expanded', String(isOpen))
  }

  burgerMenu.addEventListener('click', () => {
    setMenuOpen(!navItems.classList.contains('nav-active'))
  })

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false))
  })
}

const setAboutCardModals = () => {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const modal = document.createElement('div')
      modal.className = 'modal'
      modal.setAttribute('role', 'dialog')
      modal.setAttribute('aria-modal', 'true')
      modal.setAttribute('aria-label', card.querySelector('.card-title').textContent)

      const expandedCard = card.cloneNode(true)
      expandedCard.classList.add('card-clicked')
      expandedCard.addEventListener('click', (event) => event.stopPropagation())
      modal.addEventListener('click', () => modal.remove())

      modal.append(expandedCard)
      document.body.prepend(modal)
    })
  })
}

const initializePage = () => {
  setBurgerMenu()
  setAboutCardModals()
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializePage)
} else {
  initializePage()
}
