
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PublibikeStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PublibikeStationsSDK.test()
    equal(null !== testsdk, true)
  })

})
