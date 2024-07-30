import { CustomFunctionParams } from '@skedulo/mex-service-libs/types'
import { validateMexData } from './functions/validator'
import { fetchMexData } from './functions/fetcher'
import { saveMexData } from './functions/saver'
import { createJob } from './functions/custom'

export const params: CustomFunctionParams = {
    fetch: {
      handler: fetchMexData
    },
    save: {
      handler: saveMexData
    },
    validate: {
      handler: validateMexData
    },
    custom: {
      handlers: [{
        method: 'post',
        path: '/job',
        handler: createJob
      }]
    }
}
