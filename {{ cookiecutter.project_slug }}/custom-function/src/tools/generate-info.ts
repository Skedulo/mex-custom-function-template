import fs from 'fs'
import { Function } from '@skedulo/mex-service-libs/functions'
import { version } from '@skedulo/mex-service-libs/package.json'
import { CustomFunctionInfo } from '@skedulo/mex-service-libs/types'
import { params } from '../params'

// Workaround for tsyringe polyfill issue
// @ts-ignore
const skeduloFunction = new Function(params)

const info: CustomFunctionInfo = {
    libVersion: version,
    features: {
        fetchFunction: params.fetch ? true : false,
        saveFunction: params.save ? true : false,
        validateFunction: params.validate ? true : false,
        staticFunction: params.static ? true : false,
        searchFunction: params.search ? true : false,
    }
}
if (!fs.existsSync('../dist')) {
    fs.mkdirSync('../dist')
}
fs.writeFileSync('../dist/info.json', JSON.stringify(info, null, 2))