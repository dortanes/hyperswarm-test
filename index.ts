import Translink from '@coryfoundation/translink'
import { hostname } from 'os'

const bridge = new Translink({
  namespace: 'hs-test',
  nodeID: hostname(),
})

// Subscriptions here

bridge.connect()
  .then(() => {
    console.log('Connected')

    bridge.subscribe('t', (msg): any => {
      const b = { t: Date.now(), q: Date.now() - msg.t, s: msg.s, r: hostname() }
      console.log('pong ', b);
      setTimeout(() => {
        bridge.broadcastToAllNodes('t', b)
      }, 200)
    })

    bridge.broadcastToAllNodes('t', { q: Date.now(), s: hostname() })
  })
  .catch((e) => console.error('Connection error', e))