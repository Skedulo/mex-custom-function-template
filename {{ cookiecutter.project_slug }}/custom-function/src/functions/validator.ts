// *******************************************************************
// * You can implement anything you need here or in any other places *  
// *******************************************************************

// I am importing from library module
import {CustomInput, CustomResult, CustomValidationInput, CustomValidationResult, Status} from '@skedulo/mex-service-libs/dist/types/inner-function'
// I am using an external library: isEmpty
import { isEmpty } from 'lodash'

export async function validateMexData(input: CustomInput<CustomValidationInput>): Promise<CustomResult<CustomValidationResult>> {
  const validationResult: CustomResult<CustomValidationResult> = {
    status: Status.SUCCESS
  }

  if (isEmpty(input.newInstanceData)) {
    validationResult.status = Status.ERROR
    validationResult.message = `new instance data can not be empty`
  }
  
  return validationResult
}
