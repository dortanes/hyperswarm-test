import Translink from '@coryfoundation/translink'
import { hostname } from 'os'

const bridge = new Translink({
  namespace: 'hs-test',
  nodeID: hostname(),
})

// Subscriptions here

bridge.connect()
  .then(async () => {
    console.log('Connected. My name is', hostname())

    bridge.subscribeReq('t', async (res) => {
      console.log('ping from', res.s, Date.now() - res.st)
      return { s: hostname(), st: Date.now() };
    })

    const s = async () => {
      const st = Date.now()
      console.log('ping', st)
      const [res] = await bridge.broadcastReq('t', { s: hostname(), st })
      console.log('pong from', res.s, Date.now() - res.st)
      setTimeout(async () => await s(), 200)
    }

    await s()
  })
  .catch((e) => console.error('Connection error', e))