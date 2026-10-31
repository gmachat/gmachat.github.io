const initializePage = () => {
  const burgerMenu = document.querySelector('.burger-menu')
  const navItems = document.querySelector('.nav-items')
  const navLinks = document.querySelectorAll('.nav-link')
  const aboutCards = document.querySelectorAll('.card')

  document.querySelector('.preload')?.classList.remove('preload')

  const portfolioApp = Chute.createApp({
    state: {
      menuOpen: false,
      activeCard: null
    },
    actions: {
      toggleMenu: ({ state }) => ({ menuOpen: !state.menuOpen }),
      closeMenu: () => ({ menuOpen: false }),
      openCard: ({ payload }) => ({ activeCard: payload }),
      closeCard: () => ({ activeCard: null })
    }
  })

  portfolioApp.component({
    select: (state) => state.menuOpen,
    render: (menuOpen) => {
      navItems.classList.toggle('nav-active', menuOpen)
      navItems.classList.toggle('nav-inactive', !menuOpen)
      burgerMenu.classList.toggle('toggle', menuOpen)
      burgerMenu.setAttribute('aria-expanded', String(menuOpen))
    }
  })

  portfolioApp.component({
    select: (state) => state.activeCard,
    render: (activeCard) => {
      document.querySelector('.modal')?.remove()
      document.body.classList.toggle('modal-open', Boolean(activeCard))

      if (!activeCard) return

      const sourceCard = document.querySelector(`[data-card-id="${activeCard}"]`)
      if (!sourceCard) return

      const modal = document.createElement('div')
      modal.className = 'modal'
      modal.setAttribute('role', 'dialog')
      modal.setAttribute('aria-modal', 'true')
      modal.setAttribute('aria-label', sourceCard.querySelector('.card-title').textContent)

      const expandedCard = sourceCard.cloneNode(true)
      expandedCard.classList.add('card-clicked')
      expandedCard.addEventListener('click', (event) => event.stopPropagation())
      modal.addEventListener('click', () => portfolioApp.dispatch('closeCard'))
      modal.append(expandedCard)
      document.body.prepend(modal)
    }
  })

  portfolioApp.component({
    render: (state) => {
      const menuState = document.querySelector('[data-chute-menu-state]')
      const cardState = document.querySelector('[data-chute-card-state]')

      if (menuState) menuState.textContent = `menuOpen: ${state.menuOpen}`
      if (cardState) cardState.textContent = `activeCard: ${state.activeCard || 'null'}`
    }
  })

  burgerMenu.addEventListener('click', () => portfolioApp.dispatch('toggleMenu'))

  navLinks.forEach((link) => {
    link.addEventListener('click', () => portfolioApp.dispatch('closeMenu'))
  })

  aboutCards.forEach((card, index) => {
    const cardId = `about-card-${index + 1}`
    card.dataset.cardId = cardId
    card.addEventListener('click', () => portfolioApp.dispatch('openCard', cardId))
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      portfolioApp.dispatch('closeCard')
      portfolioApp.dispatch('closeMenu')
    }
  })

  // Exposed for the on-page Chute.js demo and browser-level debugging.
  window.portfolioApp = portfolioApp
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializePage)
} else {
  initializePage()
}
