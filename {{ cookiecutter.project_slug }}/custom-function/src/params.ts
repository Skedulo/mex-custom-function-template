import { CustomFunctionParams } from 'mex-custom-function-lib/src/types/inner-function'
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