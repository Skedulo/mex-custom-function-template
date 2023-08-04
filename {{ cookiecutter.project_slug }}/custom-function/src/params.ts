import { CustomFunctionParams } from '@skedulo/mex-service-libs/dist/types/inner-function'
import { validateMexData } from './functions/validator'
import { fetchMexData } from './functions/fetcher'
import { saveMexData } from './functions/saver'

export const params: CustomFunctionParams = {
    fetch: {
      handler: fetchMexData
    },
    save: {
      handler: saveMexData
    },
    validate: {
      handler: validateMexData
    }
}
