/**
 * Chute.js
 *
 * Chute keeps application state in one immutable store, routes changes through
 * named actions, and re-renders only components whose selected state changed.
 */
const identity = (value) => value
const enqueue = window.queueMicrotask || ((callback) => Promise.resolve().then(callback))

  const freezeState = (state) => Object.freeze({ ...state })

export const createStore = (initialState = {}) => {
    let state = freezeState(initialState)
    let pendingState = state
    let renderQueued = false
    const subscribers = new Set()

    const getState = () => state

    const flush = () => {
      renderQueued = false

      if (Object.is(state, pendingState)) return

      const previousState = state
      state = pendingState
      subscribers.forEach((subscriber) => subscriber(state, previousState))
    }

    const setState = (update) => {
      const patch = typeof update === 'function'
        ? update(pendingState)
        : update

      if (!patch || typeof patch !== 'object') return pendingState

      pendingState = freezeState({ ...pendingState, ...patch })

      if (!renderQueued) {
        renderQueued = true
        enqueue(flush)
      }

      return pendingState
    }

    const subscribe = (subscriber, options = {}) => {
      subscribers.add(subscriber)

      if (options.immediate !== false) {
        subscriber(state, state)
      }

      return () => subscribers.delete(subscriber)
    }

    return Object.freeze({ getState, setState, subscribe })
  }

export const createApp = ({ state = {}, actions = {} } = {}) => {
    const store = createStore(state)
    const components = new Map()
    let anonymousComponentCount = 0

    const dispatch = (actionName, payload) => {
      const action = actions[actionName]

      if (typeof action !== 'function') {
        throw new Error(`[Chute] Unknown action: ${actionName}`)
      }

      return store.setState((currentState) => (
        action({ state: currentState, payload, dispatch })
      ))
    }

    const component = ({
      name,
      select = identity,
      setup,
      render,
      equals = Object.is
    }) => {
      if (typeof render !== 'function' && typeof setup !== 'function') {
        throw new TypeError('[Chute] Components require setup or render logic.')
      }

      const componentName = name || `component-${++anonymousComponentCount}`

      if (components.has(componentName)) {
        throw new Error(`[Chute] Component already exists: ${componentName}`)
      }

      const renderComponent = typeof render === 'function' ? render : () => {}
      let cleanup = null
      let unsubscribe = () => {}
      let active = true
      let initialized = false
      let selectedState

      const unmount = () => {
        if (!active) return
        active = false
        unsubscribe()
        if (typeof cleanup === 'function') cleanup()
        components.delete(componentName)
      }

      components.set(componentName, unmount)

      unsubscribe = store.subscribe((nextState) => {
        const nextSelectedState = select(nextState)

        if (initialized && equals(selectedState, nextSelectedState)) return

        const previousSelectedState = selectedState
        selectedState = nextSelectedState
        initialized = true
        renderComponent(nextSelectedState, previousSelectedState)
      })

      cleanup = typeof setup === 'function'
        ? setup({ dispatch, getState: store.getState })
        : null
      return unmount
    }

    const destroy = () => {
      Array.from(components.values()).forEach((unmount) => unmount())
    }

    const listComponents = () => Array.from(components.keys())

    return Object.freeze({
      component,
      destroy,
      dispatch,
      getState: store.getState,
      listComponents,
      setState: store.setState,
      subscribe: store.subscribe
    })
  }

export const version = '1.3.0'
