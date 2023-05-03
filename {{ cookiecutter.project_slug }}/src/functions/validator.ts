// *******************************************************************
// * You can implement anything you need here or in any other places *  
// *******************************************************************

// I am importing from library module
import { CustomFunctionResult, CustomFunctionStatus, MexData } from 'mex-custom-function-lib/build/types'
// I am using an external library: isEmpty
import { isEmpty } from 'lodash'

export async function validateMexData(mexData: MexData): Promise<CustomFunctionResult> {
  const validationResult: CustomFunctionResult = {
    status: CustomFunctionStatus.SUCCESS
  }

  if (isEmpty(mexData.UID)) {
    validationResult.status = CustomFunctionStatus.FAILED
    validationResult.message = `The {0} is not valid!`
    validationResult.params = [mexData.UID as string]
  } else {
    validationResult.data = {
      "UID": mexData.UID,
    }
  }
  
  return validationResult
}
