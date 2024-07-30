import { KoaFunction } from '@skedulo/mex-service-libs/functions';
import { params } from './params';

const envPort = parseInt(process.env.PORT || '')
const port = Number.isInteger(envPort) ? envPort : 3000
const skeduloFunction = new KoaFunction(params)

skeduloFunction.serve(port)
