/**
 * Chute.js components for the portfolio interface.
 * The document supplies only #root; these components render and operate the app.
 */
let data
let frameworkVersion

  const on = (element, eventName, listener) => {
    element?.addEventListener(eventName, listener)
    return () => element?.removeEventListener(eventName, listener)
  }

  const slot = (name) => document.querySelector(`[data-chute-slot="${name}"]`)
  const list = (items) => items.map((item) => `<li>${item}</li>`).join('')

  const mountAppShell = (app) => app.component({
    name: 'app-shell',
    select: () => true,
    render: () => {
      document.querySelector('#root').innerHTML = `
        <div id="master-grid">
          <div class="chute-slot" data-chute-slot="hero"></div>
          <div class="chute-slot" data-chute-slot="navigation"></div>
          <main class="page-content">
            <div class="chute-slot" data-chute-slot="about"></div>
            <div class="chute-slot" data-chute-slot="experience"></div>
            <div class="chute-slot" data-chute-slot="projects"></div>
          </main>
          <div class="chute-slot" data-chute-slot="contact"></div>
        </div>
      `
    }
  })

  const mountHero = (app) => app.component({
    name: 'hero',
    select: () => true,
    render: () => {
      slot('hero').innerHTML = `
        <header id="portrait-frame">
          <div id="portait-photo">
            <div id="welcome-box">
              <div class="hero-eyebrow">${data.hero.eyebrow}</div>
              <h1>${data.hero.title}</h1>
              <p>${data.hero.summary}</p>
              <div class="hero-actions">
                <a href="#experience" id="see-more">View experience</a>
                <a href="./resources/Greg_Machat_Resume2026.pdf" class="hero-secondary" download>Download resume</a>
              </div>
            </div>
          </div>
          <div id="nav-el"></div>
        </header>
      `
    }
  })

  const mountNavigation = (app) => app.component({
    name: 'navigation',
    select: (state) => state.menuOpen,
    setup: ({ dispatch }) => {
      const burgerMenu = document.querySelector('.burger-menu')
      const navLinks = Array.from(document.querySelectorAll('.nav-link'))
      const cleanups = [
        on(burgerMenu, 'click', () => dispatch('toggleMenu')),
        ...navLinks.map((link) => on(link, 'click', () => dispatch('closeMenu')))
      ]

      return () => cleanups.forEach((cleanup) => cleanup())
    },
    render: (menuOpen) => {
      const host = slot('navigation')

      if (!host.hasChildNodes()) {
        host.innerHTML = `
          <nav aria-label="Primary navigation">
            <div id="nav-container">
              <a href="#portrait-frame" class="nav-item" id="nav-icon" aria-label="Back to top">
                <div id="nav-logo"><img class="personal-icon" src="./resources/images/logo-transparent.png" alt="Greg Machat logo"></div>
              </a>
              <button class="burger-menu" type="button" aria-label="Toggle navigation" aria-expanded="false">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
              </button>
              <ul class="nav-items">
                ${data.navigation.map((item) => `<li><a href="${item.href}" class="nav-item nav-link">${item.label}</a></li>`).join('')}
              </ul>
            </div>
          </nav>
        `
      }

      const navItems = document.querySelector('.nav-items')
      const burgerMenu = document.querySelector('.burger-menu')
      navItems?.classList.toggle('nav-active', menuOpen)
      navItems?.classList.toggle('nav-inactive', !menuOpen)
      burgerMenu?.classList.toggle('toggle', menuOpen)
      burgerMenu?.setAttribute('aria-expanded', String(menuOpen))
    }
  })

  const mountAbout = (app) => app.component({
    name: 'about-section',
    select: () => true,
    render: () => {
      slot('about').innerHTML = `
        <section id="about" class="about-section">
          <div class="section-heading about-heading">
            <span>About me</span>
            <h2>${data.about.title}</h2>
            <p>${data.about.summary}</p>
          </div>
          <div class="about-grid">
            ${data.about.cards.map((card) => `
              <article class="card">
                <h3 class="card-title">${card.title}</h3>
                <div class="card-photo-frame">
                  <div class="card-photo" id="${card.imageId}" role="img" aria-label="${card.imageLabel}"></div>
                </div>
                <div class="card-text-box"><p>${card.copy}</p></div>
              </article>
            `).join('')}
          </div>
          <div class="skills-panel" aria-labelledby="skills-title">
            <div>
              <span class="skills-label">Current toolkit</span>
              <h3 id="skills-title">Skills built for modern product teams.</h3>
            </div>
            <ul class="skills-list">${list(data.about.skills)}</ul>
          </div>
        </section>
      `
    }
  })

  const mountAboutCardDialog = (app) => {
    const cards = Array.from(document.querySelectorAll('.card'))

    return app.component({
      name: 'about-card-dialog',
      select: (state) => state.activeCard,
      setup: ({ dispatch }) => {
        const cleanups = cards.map((card, index) => {
          const cardId = `about-card-${index + 1}`
          card.dataset.cardId = cardId
          return on(card, 'click', () => dispatch('openCard', cardId))
        })

        return () => cleanups.forEach((cleanup) => cleanup())
      },
      render: (activeCard) => {
        document.querySelector('.modal')?.remove()
        document.body.classList.toggle('modal-open', Boolean(activeCard))

        if (!activeCard) return

        const sourceCard = document.querySelector(`[data-card-id="${activeCard}"]`)
        if (!sourceCard) return

        const modal = document.createElement('div')
        const expandedCard = sourceCard.cloneNode(true)
        modal.className = 'modal'
        modal.setAttribute('role', 'dialog')
        modal.setAttribute('aria-modal', 'true')
        modal.setAttribute('aria-label', sourceCard.querySelector('.card-title').textContent)
        expandedCard.classList.add('card-clicked')
        expandedCard.addEventListener('click', (event) => event.stopPropagation())
        modal.addEventListener('click', () => app.dispatch('closeCard'))
        modal.append(expandedCard)
        document.body.prepend(modal)
      }
    })
  }

  const mountExperience = (app) => app.component({
    name: 'experience-section',
    select: () => true,
    render: () => {
      slot('experience').innerHTML = `
        <section id="experience" class="experience-section">
          <div class="section-heading">
            <span>Experience</span>
            <h2>${data.experience.title}</h2>
            <p>${data.experience.summary}</p>
          </div>
          <div class="timeline">
            ${data.experience.roles.map((role) => `
              <article class="timeline-item">
                <div class="timeline-meta">
                  <p class="timeline-company">${role.company}</p>
                  <h3>${role.title}</h3>
                  <p>${role.dates}</p>
                  <p>${role.location}</p>
                </div>
                <ul>${list(role.details)}</ul>
              </article>
            `).join('')}
          </div>
          <div class="education-strip">
            ${data.experience.education.map((item) => `
              <div>
                <span>${item.label}</span>
                <h3>${item.title}</h3>
                <p>${item.detail}</p>
              </div>
            `).join('')}
          </div>
        </section>
      `
    }
  })

  const renderCompactProject = (project) => `
    <article class="compact-project-card">
      <div class="compact-project-image ${project.artClass}" role="img" aria-label="${project.imageLabel}"></div>
      <div class="compact-project-content">
        <p class="project-kicker">${project.stack}</p>
        <h3>${project.title}</h3>
        <p>${project.copy}</p>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="compact-project-link">${project.linkLabel}</a>
        ${project.note ? `<span class="compact-project-note">${project.note}</span>` : ''}
      </div>
    </article>
  `

  const mountProjects = (app) => app.component({
    name: 'projects-section',
    select: () => true,
    render: () => {
      const flagship = data.projects.flagship
      const framework = data.projects.framework

      slot('projects').innerHTML = `
        <section class="projects-section" aria-labelledby="project-header">
          <div id="project-header" class="section-heading">
            <span>Flagship project</span>
            <h2>${flagship.title}</h2>
            <p>${flagship.summary}</p>
          </div>
          <div class="projects-stack">
            <article class="featured-project flagship-project">
              <div class="featured-project-visual">
                <div id="project-card-vegasintel">
                  <img class="vegasintel-logo" src="./resources/images/vegasintel-logo.png?v=1" alt="VegasIntel sports analytics logo">
                </div>
              </div>
              <div class="featured-project-content">
                <div class="flagship-label"><span aria-hidden="true">★</span> My flagship project</div>
                <p class="project-kicker">${flagship.kicker}</p>
                <h3>${flagship.heading}</h3>
                <p>${flagship.copy}</p>
                <ul>${list(flagship.details)}</ul>
                <a href="https://vegasintel.vip" target="_blank" rel="noopener noreferrer" class="project-link">Explore VegasIntel</a>
              </div>
            </article>
            <div class="supporting-project-heading">
              <span>Built from first principles</span>
              <h3>The framework underneath this portfolio.</h3>
            </div>
            <article class="featured-project chute-project">
              <div class="featured-project-visual chute-project-visual">
                <div class="chute-framework-card">
                  <div class="chute-framework-heading">
                    <img class="chute-logo" src="./resources/images/chutejs-logo.png?v=red" alt="Chute.js red C and parachute logo" width="48" height="48">
                    <span class="chute-wordmark">Chute.js</span>
                    <span class="chute-version">v${frameworkVersion}</span>
                  </div>
                  <div class="chute-flow" aria-label="Chute state flow: action to store to selector to render">
                    <span>action</span><i>→</i><span>store</span><i>→</i><span>selector</span><i>→</i><span>render</span>
                  </div>
                  <div class="chute-live-state" aria-live="polite">
                    <span>Live portfolio state</span>
                    <code data-chute-menu-state>menuOpen: false</code>
                    <code data-chute-card-state>activeCard: null</code>
                    <code data-chute-image-state>activeImage: null</code>
                    <code data-chute-component-state>components: 11</code>
                  </div>
                </div>
              </div>
              <div class="featured-project-content">
                <p class="project-kicker">Custom framework · This site runs on it</p>
                <h3>${framework.heading}</h3>
                <p>${framework.copy}</p>
                <ul>${list(framework.details)}</ul>
                <a href="https://github.com/gmachat/gmachat.github.io/blob/master/chutejs.js" target="_blank" rel="noopener noreferrer" class="project-link">View Chute.js source</a>
              </div>
            </article>
          </div>
          <div class="earlier-work">
            <div class="earlier-work-heading">
              <span>Earlier work</span>
              <h3>Projects that shaped the foundation.</h3>
            </div>
            <div class="earlier-work-grid">${data.projects.earlier.map(renderCompactProject).join('')}</div>
          </div>
        </section>
      `
    }
  })

  const mountProjectImageLightbox = (app) => {
    const images = Array.from(document.querySelectorAll('.compact-project-image'))

    return app.component({
      name: 'project-image-lightbox',
      select: (state) => state.activeImage,
      setup: ({ dispatch }) => {
        const cleanups = images.flatMap((image, index) => {
          const imageId = `project-image-${index + 1}`
          const imageLabel = image.getAttribute('aria-label')
          const toggleImage = () => dispatch('toggleImage', imageId)
          const toggleWithKeyboard = (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            toggleImage()
          }

          image.dataset.imageId = imageId
          image.dataset.imageLabel = imageLabel
          image.setAttribute('role', 'button')
          image.setAttribute('tabindex', '0')
          image.setAttribute('aria-label', `Enlarge ${imageLabel}`)
          image.setAttribute('aria-haspopup', 'dialog')
          image.setAttribute('aria-expanded', 'false')

          return [on(image, 'click', toggleImage), on(image, 'keydown', toggleWithKeyboard)]
        })

        return () => cleanups.forEach((cleanup) => cleanup())
      },
      render: (activeImage, previousImage) => {
        document.querySelector('.image-lightbox')?.remove()
        document.body.classList.toggle('image-expanded-open', Boolean(activeImage))
        images.forEach((image) => {
          image.setAttribute('aria-expanded', String(image.dataset.imageId === activeImage))
        })

        if (!activeImage) {
          if (previousImage) document.querySelector(`[data-image-id="${previousImage}"]`)?.focus()
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
        ;['data-image-id', 'data-image-label', 'tabindex', 'aria-expanded', 'aria-haspopup'].forEach((attribute) => expandedImage.removeAttribute(attribute))
        expandedImage.setAttribute('role', 'img')
        expandedImage.setAttribute('aria-label', imageLabel)
        imageButton.append(expandedImage)
        lightbox.append(imageButton)
        document.body.prepend(lightbox)
        imageButton.addEventListener('click', () => app.dispatch('closeImage'))
        lightbox.addEventListener('click', (event) => {
          if (event.target === lightbox) app.dispatch('closeImage')
        })
        queueMicrotask(() => imageButton.focus())
      }
    })
  }

  const mountContact = (app) => app.component({
    name: 'contact-section',
    select: () => true,
    render: () => {
      slot('contact').innerHTML = `
        <footer id="contact">
          <div id="contact-bar">
            <div class="contact-copy">
              <span>${data.contact.eyebrow}</span>
              <h2>${data.contact.title}</h2>
              <a href="mailto:${data.contact.email}">${data.contact.email}</a>
            </div>
            <ul class="contacts" aria-label="Social links">
              <li class="contact-item"><a href="./resources/Greg_Machat_Resume2026.pdf" class="resume-link" download>Download resume</a></li>
              <li class="contact-item"><a href="https://www.linkedin.com/in/gregory-machat/" target="_blank" rel="noopener noreferrer" class="contact-link"><img src="./resources/icons/linkedin-icon.svg" alt="LinkedIn" class="contact-icon"></a></li>
              <li class="contact-item"><a href="https://github.com/gmachat" target="_blank" rel="noopener noreferrer" class="contact-link"><img src="./resources/icons/github-icon.svg" alt="GitHub" class="contact-icon"></a></li>
            </ul>
          </div>
        </footer>
      `
    }
  })

  const mountStateInspector = (app) => app.component({
    name: 'state-inspector',
    render: (state) => {
      const menuState = document.querySelector('[data-chute-menu-state]')
      const cardState = document.querySelector('[data-chute-card-state]')
      const imageState = document.querySelector('[data-chute-image-state]')
      const componentState = document.querySelector('[data-chute-component-state]')
      if (menuState) menuState.textContent = `menuOpen: ${state.menuOpen}`
      if (cardState) cardState.textContent = `activeCard: ${state.activeCard || 'null'}`
      if (imageState) imageState.textContent = `activeImage: ${state.activeImage || 'null'}`
      if (componentState) componentState.textContent = `components: ${app.listComponents().length}`
    }
  })

  const mountKeyboardShortcuts = (app) => app.component({
    name: 'keyboard-shortcuts',
    setup: ({ dispatch }) => on(document, 'keydown', (event) => {
      if (event.key !== 'Escape') return
      dispatch('closeCard')
      dispatch('closeImage')
      dispatch('closeMenu')
    })
  })

  export const mountAll = (app, portfolioData, options = {}) => {
    data = portfolioData
    frameworkVersion = options.frameworkVersion || 'development'
    mountAppShell(app)
    mountHero(app)
    mountNavigation(app)
    mountAbout(app)
    mountExperience(app)
    mountProjects(app)
    mountContact(app)
    mountAboutCardDialog(app)
    mountProjectImageLightbox(app)
    mountKeyboardShortcuts(app)
    mountStateInspector(app)
    return app.listComponents()
  }
