import { CustomFunctionResult, CustomFunctionStatus } from 'mex-custom-function-lib/build/types';
import { validateMexData } from './functions/validator';
import { CustomFetchPayload, CustomFunctionPayload, CustomSavePayload } from './types/CustomFunctionPayload';

/***************************************************************************************
 * IMPORTANT NOTES:
 *  - Please do not change the exported function names.
 *  - For Input data structure, you can add more according to your Mex Definition but should not remove exsiting ones.
 *  - For Output data structure, please do not change data structure.
 ***************************************************************************************/

/**
 * Validate the save payload at backend side.
 * 
 * @param payload Mex save payload.
 * @returns 
 */
export const validateSave = async (payload: CustomFunctionPayload): Promise<CustomFunctionResult> => {
  return validateMexData(payload)
}

/**
 * Custom fetch function implementation
 * 
 * @param payload Mex fetch payload.
 * @returns 
 */
export const customFetch = async (payload: CustomFetchPayload): Promise<CustomFunctionResult> => {
  if (!!payload.UID) {
    return {
      status: CustomFunctionStatus.SUCCESS,
      data: {}
    }
  } else {
    return {
      status: CustomFunctionStatus.FAILED,
      message: "Missing UID"
    }
  }
}

/**
 * Custom save function implementation
 * 
 * @param payload Mex save payload.
 * @returns 
 */
export const customSave = async (payload: CustomSavePayload): Promise<CustomFunctionResult> => {
  if (!!payload.UID) {
    return {
      status: CustomFunctionStatus.SUCCESS,
      data: {}
    }
  } else {
    return {
      status: CustomFunctionStatus.FAILED,
      message: "Missing UID"
    }
  }
}
