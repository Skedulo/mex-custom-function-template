import fs from 'fs'
import { version } from '@skedulo/mex-service-libs/package.json'
import { CustomFunctionInfo } from '@skedulo/mex-service-libs/dist/types/mex-custom-function'
import { params } from '../params'

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