import { Function } from '@skedulo/mex-service-libs/functions'
import { params } from './params'

const skeduloFunction = new Function(params)

skeduloFunction.attachHandler(module.exports)
