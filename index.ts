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
    
    bridge.emit('t', Date.now())

    bridge.subscribe('t', (msg): any => {
      console.log('pong ' + (Date.now() - Number(msg)));
      setTimeout(() => {
        bridge.emit('t', Date.now() - Number(msg))
      }, 200)
    })
  })
  .catch((e) => console.error('Connection error', e))