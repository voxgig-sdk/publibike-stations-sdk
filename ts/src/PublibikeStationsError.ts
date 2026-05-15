
import { Context } from './Context'


class PublibikeStationsError extends Error {

  isPublibikeStationsError = true

  sdk = 'PublibikeStations'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PublibikeStationsError
}

