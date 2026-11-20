/**
 * Content model consumed by the Chute.js portfolio components.
 * Keeping content separate from rendering makes each section reusable and testable.
 */
export const portfolioData = Object.freeze({
    hero: {
      eyebrow: 'Full-stack software engineer · U.S. Army veteran',
      title: 'Greg Machat',
      summary: 'I’m a frontend-focused full-stack engineer with five years of experience delivering enterprise SaaS features and independently deployed web products.'
    },
    navigation: [
      { href: '#about', label: 'About' },
      { href: '#experience', label: 'Experience' },
      { href: '#project-header', label: 'Projects' },
      { href: '#contact', label: 'Contact' }
    ],
    about: {
      title: 'Full-stack ownership with a leadership foundation.',
      summary: 'I’m strongest in React, JavaScript, API integration, and production debugging, with experience across Ruby on Rails, Python, PostgreSQL, and TypeScript/Next.js. I’m comfortable owning user-facing work end to end and collaborating across frontend and backend systems.',
      cards: [
        {
          title: 'Full-Stack Engineering',
          imageId: 'full-stack-photo',
          imageLabel: 'Software development workspace',
          copy: 'Experienced in building reusable React interfaces, API-connected workflows, accessible component systems, and independently deployed products backed by PostgreSQL, Prisma, Python, and Ruby on Rails.'
        },
        {
          title: 'Army Leadership',
          imageId: 'army-vet-photo',
          imageLabel: 'Greg Machat during Army service',
          copy: 'Led and mentored small medical teams in high-pressure operational settings, including deployment to Afghanistan, and built a Python process improvement that eliminated thousands of hours of manual data entry.'
        }
      ],
      skills: [
        'React / JavaScript / TypeScript',
        'Next.js / Redux / Tailwind CSS',
        'Ruby on Rails / Python',
        'GraphQL / REST APIs',
        'PostgreSQL / Prisma',
        'Authentication / AI APIs / Accessibility'
      ]
    },
    experience: {
      title: 'Shipping reliable software across the stack.',
      summary: 'Five years delivering enterprise SaaS features, resolving urgent production issues, and owning frontend work in close partnership with backend, product, and QA teams.',
      roles: [
        {
          company: 'Yello.co',
          title: 'Software Engineer II',
          dates: 'December 2022 – October 2026',
          location: '',
          details: [
            'Served as primary frontend engineer across multiple teams, owning React features, urgent production fixes, and frontend delivery across teams in an enterprise SaaS application.',
            'Developed user-facing AI capabilities, reusable interfaces, and API-connected workflows in collaboration with product, QA, and backend engineers.',
            'Investigated production issues spanning frontend state and backend behavior, supporting testing, deployment, and release monitoring.'
          ]
        },
        {
          company: 'Yello.co',
          title: 'Software Engineer I',
          dates: 'September 2021 – December 2022',
          location: '',
          details: [
            'Developed scheduling interfaces supporting thousands of interviews across clients and time zones, with calendar, email/SMS, and video interview integrations.',
            'Built and maintained interactive React experiences coordinating complex scheduling updates and application state with backend services.',
            'Created reusable, accessible UI components to improve consistency and support WCAG standards.'
          ]
        },
        {
          company: 'Yello.co',
          title: 'Software Engineer Intern',
          dates: 'June 2021 – September 2021',
          location: '',
          details: [
            'Improved accessibility, added dynamic translations for international users, and shipped frontend enhancements through iterative Agile development.'
          ]
        },
        {
          company: 'U.S. Army',
          title: 'Combat Medic Sergeant',
          dates: 'August 2017 – June 2021',
          location: '',
          details: [
            'Led medical teams in high-pressure settings, including deployment to Afghanistan.',
            'Developed a Python process improvement that eliminated thousands of hours of manual data entry.'
          ]
        }
      ],
      education: [
        {
          label: 'Engineering training',
          title: 'Code Platoon',
          detail: 'Full Stack Software Engineering Bootcamp · June 2021'
        },
        {
          label: 'Education',
          title: 'Rowan University',
          detail: 'B.A., Health and Physical Education · December 2016'
        }
      ]
    },
    projects: {
      flagship: {
        title: 'VegasIntel is the project I’m most proud to have built.',
        summary: 'Built and deployed independently across the interface, data model, APIs, database workflows, and production operations.',
        kicker: 'Independent developer · 2025 – Present',
        heading: 'Sports intelligence from raw data to confident decisions.',
        copy: 'VegasIntel combines sports data, market information, and AI services in responsive dashboards, with automated ingestion, authentication, and access controls.',
        details: [
          'Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, and Prisma across the UI and data model',
          'Sports data and AI integrations, automated ingestion workflows, authentication, and user access controls',
          'Vercel deployment and production debugging across UI, APIs, and database workflows'
        ]
      },
      current: {
        title: 'Artificial Myelination Language',
        kicker: 'Artificial Myelination Language',
        heading: 'A programming language for AI coding agents.',
        copy: 'AML is an experimental language that moves repeated project setup decisions into the compiler. Its Rust compiler provides predictable defaults for structure, validation, error handling, and configuration instead of requiring an agent to recreate those choices for every project.',
        goal: 'This reduces boilerplate, token use, and repair cycles while producing code that remains readable, predictable, and easy to test.',
        details: [
          'A custom syntax with parsing, type checking, semantic validation, clear compiler errors, and a versioned intermediate representation',
          'Nine output targets: JavaScript, Python, Ruby, Go, Rust, C, Java, C#, and Swift',
          'Project generation for React components, Vite apps, and full-stack React and Node projects with JSON or PostgreSQL',
          'VS Code, LSP, and MCP integrations, plus cross-platform installers, CI, and token-use benchmarks'
        ]
      },
      framework: {
        heading: 'A homemade React-style UI layer with reusable components.',
        copy: 'Chute.js is a zero-dependency reactive framework created for this portfolio. Its immutable store and named components render the entire page and drive its navigation, card dialogs, image lightboxes, keyboard controls, and live state inspector.',
        details: [
          'Declarative templates mounted by Chute.js from shared portfolio data',
          'Component-owned setup, state selection, rendering, and cleanup',
          'Microtask-batched updates and selective component re-rendering'
        ]
      },
      earlier: [
        {
          artClass: 'connectify-card-art',
          imageLabel: 'Connectify video chat interface',
          stack: 'React · Node.js · Agora',
          title: 'Connectify',
          copy: 'A rapid video-chat experience where users can create or join channels in seconds, powered by Agora\'s real-time communications API.',
          link: 'https://github.com/gmachat/quick-bit',
          linkLabel: 'View source'
        },
        {
          artClass: 'coderoom-card-art',
          imageLabel: 'Code Room collaborative editor interface',
          stack: 'Django · React · Firebase',
          title: 'Code Room',
          copy: 'A collaborative coding platform combining a real-time IDE, code execution, video chat, and instructor-managed programming challenges.',
          link: 'https://youtu.be/jgpuf_T0yGE?t=3388',
          linkLabel: 'Watch presentation',
          note: 'Code Platoon capstone project'
        },
        {
          artClass: 'nutrify-card-art',
          imageLabel: 'Nutrify recipe and nutrition application',
          stack: 'Django · React · Edamam API',
          title: 'Nutrify',
          copy: 'A recipe creation and sharing experience that generates complete nutritional profiles for favorite recipes in seconds.',
          link: 'https://github.com/gmachat/nutrify',
          linkLabel: 'View source',
          note: 'Full-stack nutrition platform'
        },
        {
          artClass: 'atlas-card-art',
          imageLabel: 'Atlas of Music interactive globe',
          stack: 'React · Next.js · Vinext · Canvas',
          title: 'Atlas of Music',
          copy: 'An interactive map and globe for discovering where songs were written, recorded, or set and where artists began. Explore curated stories or add new artist–place connections to the growing atlas.',
          link: 'https://github.com/gmachat/Atlas-Of-Music',
          linkLabel: 'View source',
          note: 'Interactive music discovery platform'
        }
      ]
    },
    contact: {
      eyebrow: 'Let’s work together',
      title: 'Building a thoughtful product team?',
      email: 'machatgreg@gmail.com'
    }
  })
