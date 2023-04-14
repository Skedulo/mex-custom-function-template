// *******************************************************************
// * You can implement anything you need here or in any other places *
// *******************************************************************
import { MexData } from 'mex-custom-function-lib/build/types'

// Define the custom function payload
export interface CustomFunctionPayload extends MexData {}

export interface CustomFetchPayload extends CustomFunctionPayload {
  contextObject?: string
  skeduloToken?: string
  otherTokens?: string[]
}

export interface CustomSavePayload extends CustomFunctionPayload {
  eventData: { [key: string]: unknown }
  variables: {
    contextObject?: string
    skeduloToken?: string
    otherTokens?: string[]
  }
}
