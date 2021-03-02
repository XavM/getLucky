
self.importScripts('/js/bitcoinjs-lib.js')

async function getLucky() {

  const keyPair   = bitcoinjs.ECPair.makeRandom(),
        wif       = keyPair.toWIF(),
      { address } = bitcoinjs.payments.p2pkh({ pubkey: keyPair.publicKey })

  return { wif, address }

  //console.log({ start: new Date(start), end: new Date(end), elapse })

  //const res = await fetch('https://blockchain.info/rawaddr/' + address + '?cors=true')
  //const data = await res.json()

  //document.querySelector('pre').innerText = JSON.stringify(data, null, 2)
}

async function loop(count) {

  const arr = []

  for (let i = 0; i < count; i++)
    arr.push(await getLucky())

  postMessage({ msg: 'loopResult', arr })
}


onmessage = function(evt) {

  //console.log('Message received from main script:', evt.data)

  if (evt.data.msg == 'loop') {
    const count = evt.data.count || 10
    loop(count)
  }

}

/*
wif  L2r1Z25xu4BmvPXEufM1G8b8KDLKVPZeS88uc14ZvjGoW2TK1NA1
priv dd4c9353d2418acb285140dd6e9050c626bab543cbc6e27abf018684c9231807
pub  03ce1239a98a64a506b1a620c890cb5b31c979657020ff2bf848213bb2606963f8
*/
