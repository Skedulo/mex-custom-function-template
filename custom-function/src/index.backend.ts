import { Function } from 'mex-custom-function-lib/src/functions/function'
import { validateMexData } from './functions/validator'
import { fetchMexData } from './functions/fetcher'
import { saveMexData } from './functions/saver'

/***************************************************************************************
 * IMPORTANT NOTES:
 *  - Please do not change the exported function names.
 *  - For Input data structure, you can add more according to your Mex Definition but should not remove exsiting ones.
 *  - For Output data structure, please do not change data structure.
 ***************************************************************************************/

const skeduloFunction = new Function({
  fetch: {
    handler: fetchMexData
  },
  save: {
    handler: saveMexData
  },
  validate: {
    handler: validateMexData
  }
})

skeduloFunction.attachHandler(module.exports)