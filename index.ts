import Translink from '@coryfoundation/translink'
import { hostname } from 'os'

const bridge = new Translink({
  namespace: 'hs-test',
  nodeID: hostname(),
})

// Subscriptions here

bridge.connect()
  .then(async () => {
    console.log('Connected')

    bridge.subscribeReq('0', async (res) => {
      console.log('ping from', res.s, Date.now() - res.st)
      return { s: hostname(), st: Date.now() };
    })

    const s = async () => {
      const st = Date.now()
      console.log('ping', st)
      const res = await bridge.broadcastReq('0', { s: hostname(), st })
      console.log('pong from', res.s, Date.now() - res.st)
      setTimeout(async () => await s(), 200)
    }

    await s()
  })
  .catch((e) => console.error('Connection error', e))