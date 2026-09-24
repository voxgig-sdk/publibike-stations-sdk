
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PublibikeStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PublibikeStationsSDK.test()
    equal(testsdk instanceof PublibikeStationsSDK, true,
      'PublibikeStationsSDK.test() must return a client synchronously')
  })

})
