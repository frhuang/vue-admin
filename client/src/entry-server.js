import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  const s = isDev && Date.now()
  return new Promise((resolve, reject) => {
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(component => {
        return component.preFetch && component.preFetch(store)
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  })
}
