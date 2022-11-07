import { CustomFunctionResult } from "mex-custom-function-lib/build/types";
import { validateMexData } from "./functions/validator";
import { CustomFunctionPayload } from "./types/CustomFunctionPayload";

// *********************************************************************************************
// * We perform all needed bussiness logic in the `handler` function and export it.            *
// * Then we can easily execute this main function from Lambda or execute it on other services *
// *                                                                                           *
// * @param payload your custom function payload                                               *
// *********************************************************************************************
export const handler = async (payload: CustomFunctionPayload): Promise<CustomFunctionResult> => {
  return validateMexData(payload)
}
