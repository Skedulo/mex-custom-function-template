import { CustomFunctionResult } from "mex-custom-function-lib/build/types";
import { validateMexData } from "./functions/validator";
import { CustomFunctionPayload } from "./types/CustomFunctionPayload";

// *********************************************************************************************
// * Save event data validating                                                                *
// * This function will be used to validate the save event data for the GraphQL case, not      *
// * for the Custom function case.                                                             *
// *********************************************************************************************
export const handler = async (payload: CustomFunctionPayload): Promise<CustomFunctionResult> => {
  return validateMexData(payload)
}
