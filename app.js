const initializePage = () => {
  const burgerMenu = document.querySelector('.burger-menu')
  const navItems = document.querySelector('.nav-items')
  const navLinks = document.querySelectorAll('.nav-link')
  const aboutCards = document.querySelectorAll('.card')
  const projectImages = document.querySelectorAll('.compact-project-image')

  document.querySelector('.preload')?.classList.remove('preload')

  const portfolioApp = Chute.createApp({
    state: {
      menuOpen: false,
      activeCard: null,
      activeImage: null
    },
    actions: {
      toggleMenu: ({ state }) => ({ menuOpen: !state.menuOpen }),
      closeMenu: () => ({ menuOpen: false }),
      openCard: ({ payload }) => ({ activeCard: payload }),
      closeCard: () => ({ activeCard: null }),
      toggleImage: ({ state, payload }) => ({
        activeImage: state.activeImage === payload ? null : payload
      }),
      closeImage: () => ({ activeImage: null })
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
    select: (state) => state.activeImage,
    render: (activeImage, previousImage) => {
      document.querySelector('.image-lightbox')?.remove()
      document.body.classList.toggle('image-expanded-open', Boolean(activeImage))

      projectImages.forEach((image) => {
        image.setAttribute('aria-expanded', String(image.dataset.imageId === activeImage))
      })

      if (!activeImage) {
        if (previousImage) {
          document.querySelector(`[data-image-id="${previousImage}"]`)?.focus()
        }
        return
      }

      const sourceImage = document.querySelector(`[data-image-id="${activeImage}"]`)
      if (!sourceImage) return

      const imageLabel = sourceImage.dataset.imageLabel
      const lightbox = document.createElement('div')
      const imageButton = document.createElement('button')
      const expandedImage = sourceImage.cloneNode(true)

      lightbox.className = 'image-lightbox'
      lightbox.setAttribute('role', 'dialog')
      lightbox.setAttribute('aria-modal', 'true')
      lightbox.setAttribute('aria-label', `${imageLabel}, enlarged`)

      imageButton.className = 'image-lightbox-button'
      imageButton.type = 'button'
      imageButton.setAttribute('aria-label', `Return ${imageLabel} to its card`)

      expandedImage.className = `${sourceImage.className} image-lightbox-image`
      expandedImage.removeAttribute('data-image-id')
      expandedImage.removeAttribute('data-image-label')
      expandedImage.removeAttribute('tabindex')
      expandedImage.removeAttribute('aria-expanded')
      expandedImage.removeAttribute('aria-haspopup')
      expandedImage.setAttribute('role', 'img')
      expandedImage.setAttribute('aria-label', imageLabel)

      imageButton.append(expandedImage)
      lightbox.append(imageButton)
      document.body.prepend(lightbox)

      imageButton.addEventListener('click', () => portfolioApp.dispatch('closeImage'))
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) portfolioApp.dispatch('closeImage')
      })
      queueMicrotask(() => imageButton.focus())
    }
  })

  portfolioApp.component({
    render: (state) => {
      const menuState = document.querySelector('[data-chute-menu-state]')
      const cardState = document.querySelector('[data-chute-card-state]')
      const imageState = document.querySelector('[data-chute-image-state]')

      if (menuState) menuState.textContent = `menuOpen: ${state.menuOpen}`
      if (cardState) cardState.textContent = `activeCard: ${state.activeCard || 'null'}`
      if (imageState) imageState.textContent = `activeImage: ${state.activeImage || 'null'}`
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

  projectImages.forEach((image, index) => {
    const imageId = `project-image-${index + 1}`
    const imageLabel = image.getAttribute('aria-label')

    image.dataset.imageId = imageId
    image.dataset.imageLabel = imageLabel
    image.setAttribute('role', 'button')
    image.setAttribute('tabindex', '0')
    image.setAttribute('aria-label', `Enlarge ${imageLabel}`)
    image.setAttribute('aria-haspopup', 'dialog')
    image.setAttribute('aria-expanded', 'false')

    image.addEventListener('click', () => portfolioApp.dispatch('toggleImage', imageId))
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        portfolioApp.dispatch('toggleImage', imageId)
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      portfolioApp.dispatch('closeCard')
      portfolioApp.dispatch('closeImage')
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
