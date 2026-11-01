/**
 * Content model consumed by the Chute.js portfolio components.
 * Keeping content separate from rendering makes each section reusable and testable.
 */
export const portfolioData = Object.freeze({
    hero: {
      eyebrow: 'Front-end software engineer · U.S. Army veteran',
      title: 'Greg Machat',
      summary: 'I build accessible, scalable applications with React, TypeScript, and Next.js, from production UI systems to AI-powered full-stack products.'
    },
    navigation: [
      { href: '#about', label: 'About' },
      { href: '#experience', label: 'Experience' },
      { href: '#project-header', label: 'Projects' },
      { href: '#contact', label: 'Contact' }
    ],
    about: {
      title: 'Production-minded engineering with a leadership foundation.',
      summary: 'I specialize in owning user-facing features from concept through production, pairing thoughtful UI engineering with the calm, accountable leadership I developed as an Army combat medic sergeant.',
      cards: [
        {
          title: 'Front-End Engineering',
          imageId: 'full-stack-photo',
          imageLabel: 'Software development workspace',
          copy: 'Experienced in building reusable React interfaces, accessible component systems, responsive workflows, and AI-enabled product features inside large-scale production applications.'
        },
        {
          title: 'Army Leadership',
          imageId: 'army-vet-photo',
          imageLabel: 'Greg Machat during Army service',
          copy: 'Led and mentored small medical teams in high-pressure operational settings, including deployment to Afghanistan, and built a Python process improvement that eliminated thousands of hours of manual data entry.'
        }
      ],
      skills: [
        'JavaScript / TypeScript',
        'React / Redux',
        'Next.js / Tailwind CSS',
        'HTML / CSS',
        'Accessible UI components',
        'API and AI integration'
      ]
    },
    experience: {
      title: 'Shipping reliable interfaces at production scale.',
      summary: 'A progression from intern to primary front-end engineer, with ownership across customer care, interviewing, accessibility, and internationalization.',
      roles: [
        {
          company: 'Yello.co',
          title: 'Software Engineer II',
          dates: 'December 2022 – October 2026',
          location: 'Chicago, Illinois',
          details: [
            'Served as the primary front-end engineer on the Customer Care team, resolving urgent production issues and shipping reliable fixes under tight deadlines.',
            'Built user-facing AI features and reusable React interfaces within a large-scale production application.',
            'Owned front-end delivery across multiple teams in partnership with engineering, QA, and product stakeholders.'
          ]
        },
        {
          company: 'Yello.co',
          title: 'Software Engineer I',
          dates: 'September 2021 – December 2022',
          location: 'Chicago, Illinois',
          details: [
            'Led front-end development of a video interviewing platform integrating Google Meet, Zoom, Microsoft Teams, and proprietary video.',
            'Built scheduling interfaces supporting thousands of interviews across clients and time zones.',
            'Created reusable, accessible UI components supporting consistent, WCAG-aligned experiences.'
          ]
        },
        {
          company: 'Yello.co',
          title: 'Software Engineer Intern',
          dates: 'June 2021 – September 2021',
          location: 'Chicago, Illinois',
          details: [
            'Improved accessibility across user-facing workflows for people with a range of accessibility needs.',
            'Enhanced existing Slim, SCSS, jQuery, and React code to create a more intuitive user experience.',
            'Implemented dynamic translations for international users and shipped interface enhancements through iterative Agile development.'
          ]
        },
        {
          company: 'United States Army',
          title: 'Combat Medic Sergeant',
          dates: 'August 2017 – June 2021',
          location: 'Fort Bragg, North Carolina',
          details: [
            'Led and mentored medical teams in demanding operational environments, including deployment to Afghanistan.',
            'Applied Python to eliminate a large manual data-entry burden and improve an internal process.'
          ]
        }
      ],
      education: [
        {
          label: 'Engineering training',
          title: 'Code Platoon',
          detail: 'Full Stack Software Engineering Bootcamp · 2021'
        },
        {
          label: 'Education',
          title: 'Rowan University',
          detail: 'B.A., Health and Physical Education · 2016'
        }
      ]
    },
    projects: {
      flagship: {
        title: 'VegasIntel is the project I’m most proud to have built.',
        summary: 'Designed, engineered, and deployed independently from the data layer through the final interface.',
        kicker: 'Independent developer · 2025 – Present',
        heading: 'Sports intelligence from raw data to confident decisions.',
        copy: 'VegasIntel combines third-party sports data, market information, and AI-generated insights in responsive dashboards built for fast decision-making.',
        details: [
          'Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, and Prisma',
          'Authentication, user access controls, and automated data ingestion',
          'Production deployment and operations on Vercel'
        ]
      },
      framework: {
        heading: 'A homemade React-style UI layer with reusable components.',
        copy: 'Chute.js is a zero-dependency reactive framework created for this portfolio. Its immutable store and named components render the entire page and drive its navigation, card dialogs, image lightboxes, keyboard controls, and live state inspector.',
        details: [
          'Root-based rendering from shared portfolio data',
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
