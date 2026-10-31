/**
 * Chute.js
 * A tiny, zero-dependency reactive state framework.
 *
 * Chute keeps application state in one immutable store, routes changes through
 * named actions, and re-renders only components whose selected state changed.
 */
(function exposeChute(global) {
  const identity = (value) => value
  const enqueue = global.queueMicrotask || ((callback) => Promise.resolve().then(callback))

  const freezeState = (state) => Object.freeze({ ...state })

  const createStore = (initialState = {}) => {
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

  const createApp = ({ state = {}, actions = {} } = {}) => {
    const store = createStore(state)
    const components = new Set()

    const dispatch = (actionName, payload) => {
      const action = actions[actionName]

      if (typeof action !== 'function') {
        throw new Error(`[Chute] Unknown action: ${actionName}`)
      }

      return store.setState((currentState) => (
        action({ state: currentState, payload, dispatch })
      ))
    }

    const component = ({ select = identity, render, equals = Object.is }) => {
      if (typeof render !== 'function') {
        throw new TypeError('[Chute] Components require a render function.')
      }

      let initialized = false
      let selectedState

      const unsubscribe = store.subscribe((nextState) => {
        const nextSelectedState = select(nextState)

        if (initialized && equals(selectedState, nextSelectedState)) return

        const previousSelectedState = selectedState
        selectedState = nextSelectedState
        initialized = true
        render(nextSelectedState, previousSelectedState)
      })

      components.add(unsubscribe)
      return unsubscribe
    }

    const destroy = () => {
      components.forEach((unsubscribe) => unsubscribe())
      components.clear()
    }

    return Object.freeze({
      component,
      destroy,
      dispatch,
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe
    })
  }

  global.Chute = Object.freeze({
    createApp,
    createStore,
    version: '1.0.0'
  })
})(window)
