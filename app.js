import { createApp, version as chuteVersion } from './chutejs.js?v=1.3.0'
import { portfolioData } from './portfolio-data.js?v=2'
import { mountAll } from './portfolio-components.js?v=3'

const initializePage = () => {
  document.querySelector('.preload')?.classList.remove('preload')

  const portfolioApp = createApp({
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

  mountAll(portfolioApp, portfolioData, { frameworkVersion: chuteVersion })
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializePage)
} else {
  initializePage()
}
