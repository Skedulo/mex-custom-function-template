import { CustomFunctionResult, CustomFunctionStatus } from "mex-custom-function-lib/build/types";
import { CustomSavePayload } from "./types/CustomFunctionPayload";

// *********************************************************************************************
// * Custom save function implementation                                                      *
// *********************************************************************************************
export const handler = async (payload: CustomSavePayload): Promise<CustomFunctionResult> => {
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
