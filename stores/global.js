// eslint-disable-next-line react-hooks/rules-of-hooks
/* eslint-disable */

import { action, observable, computed, reaction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { version, ignore } from 'mobx-sync'

import initStore from './_conf'
const isServer = typeof window === 'undefined'

useStaticRendering(isServer)


@version(1)
class Store {

  constructor(isServer) {
    if(!isServer) {
      reaction(() => this.counter, () => {});
      // reaction(() => this.logged, () => {});
      // reaction(() => this.is_admin, () => {});
      // reaction(() => this.profile, () => {});
    }
  }

  @observable counter = 0
  @observable lastUpdate = null
  @observable light = false

  hydrate(serializedStore) {
    this.lastUpdate =
      serializedStore.lastUpdate != null
        ? serializedStore.lastUpdate
        : Date.now()
    this.light = !!serializedStore.light
  }

  @action updateCounter = () => {
    this.counter += 1
  }

  @action start = () => {
    this.lastUpdate = Date.now()
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }

  stop = () => clearInterval(this.timer)
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {}
}



export default initStore(new Store(), 'globalStore')
