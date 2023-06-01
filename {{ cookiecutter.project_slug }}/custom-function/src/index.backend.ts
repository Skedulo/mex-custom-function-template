import { Function } from 'mex-custom-function-lib/src/functions/index'
import { params } from './params'

const skeduloFunction = new Function(params)

skeduloFunction.attachHandler(module.exports)