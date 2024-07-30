import { omit } from "lodash";
import { CustomInput, CustomSaveInput, CustomSaveResult, CustomResult, CustomFunctionStatus } from '@skedulo/mex-service-libs/types'
import { GraphOperationType } from "@skedulo/mex-service-libs/services";
import { defaultGraphQLSave, graphQLSaveWithPayloadGenerator } from "@skedulo/mex-service-libs/utilities";

export async function saveMexData(input: CustomInput<CustomSaveInput>): Promise<CustomResult<CustomSaveResult>> {
    const logger = input.logger
    const defaultSave = await defaultGraphQLSave(input, ['JobProducts'])
    const failedContext = Object.keys(defaultSave.result.contextResults).filter(key => !defaultSave.result.contextResults[key].success)
    if (failedContext.length > 0) {
        throw Error(`Failed to save context ${failedContext.join(', ')}`)
    }

    logger.info(`idMap ${JSON.stringify(defaultSave.result.idMap)}`)

    const checkInSave = await graphQLSaveWithPayloadGenerator(defaultSave.remaining, 'CheckIn', (_UID, _oldData, newData) => {
        return {
            mutationType: GraphOperationType.insert,
            mutationArg: {
                ...omit(newData, ['Count', 'CreatedDate', 'CreatedAt', '__typename', 'UID']),
                'ResourceId': input.userInfo.resourceId
            }
        }
    })
    logger.info(`checkInSave ${JSON.stringify(checkInSave.result.contextResults)}`)

    if (!checkInSave.result.contextResults['CheckIn'].success) {
        throw Error(`Failed to save context CheckIn`)
    }

    return {
        status: CustomFunctionStatus.SUCCESS,
        objectMapping: {
            ...defaultSave.result.idMap,
            ...checkInSave.result.idMap
        }
    }
}
