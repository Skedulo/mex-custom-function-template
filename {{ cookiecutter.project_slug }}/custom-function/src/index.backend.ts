import { Function } from '@skedulo/mex-service-libs/dist/functions/index'
import { params } from './params'

const skeduloFunction = new Function(params)

skeduloFunction.attachHandler(module.exports)
