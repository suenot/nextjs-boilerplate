/* global localStorage */

import { AsyncTrunk } from 'mobx-sync'
import { autorun } from 'mobx'

// create a mobx-sync
function reStore (store, storageKey) {
  if (typeof window !== 'undefined') {
    window.globalStore = store
    const trunk = new AsyncTrunk(store, { storage: localStorage, storageKey })
    trunk.init().then(() => {
      // console.log(store);
    })

    autorun(() => {
      trunk.updateStore(store)
    }, { delay: 1000 })
  }
}

function initStore (Store, storageKey) {
  reStore(Store, storageKey)
  return Store
}

export default initStore
