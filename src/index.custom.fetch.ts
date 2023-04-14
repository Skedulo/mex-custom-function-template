import { CustomFunctionResult, CustomFunctionStatus } from "mex-custom-function-lib/build/types";
import { CustomFetchPayload } from "./types/CustomFunctionPayload";

// *********************************************************************************************
// * Custom fetch function implementation                                                      *
// *********************************************************************************************
export const handler = async (payload: CustomFetchPayload): Promise<CustomFunctionResult> => {
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
