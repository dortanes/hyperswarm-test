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
      console.log('pong ' + (Date.now() - Number(msg)));
      setTimeout(() => {
        bridge.broadcastToAllNodes('t', Date.now())
      }, 200)
    })

    bridge.broadcastToAllNodes('t', Date.now())
  })
  .catch((e) => console.error('Connection error', e))