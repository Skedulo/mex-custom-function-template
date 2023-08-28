// *******************************************************************
// * You can implement anything you need here or in any other places *  
// *******************************************************************

// I am importing from library module
import { CustomValidationInput, CustomValidationResult, CustomResult, CustomFunctionStatus } from '@skedulo/mex-service-libs/dist/types/mex-custom-function'
import { CustomInput } from '@skedulo/mex-service-libs/dist/types/inner-function'
// I am using an external library: isEmpty
import { isEmpty } from 'lodash'

export async function validateMexData(input: CustomInput<CustomValidationInput>): Promise<CustomResult<CustomValidationResult>> {
  const validationResult: CustomResult<CustomValidationResult> = {
    status: CustomFunctionStatus.SUCCESS
  }

  if (isEmpty(input.newInstanceData)) {
    validationResult.status = CustomFunctionStatus.ERROR
    validationResult.message = `new instance data can not be empty`
  }
  
  return validationResult
}
