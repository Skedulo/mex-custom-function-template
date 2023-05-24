import { randomUUID } from "crypto";
import { omit } from "lodash/fp";
import {CustomInput, CustomResult, CustomSaveInput, CustomSaveResult, Status } from "mex-custom-function-lib/src/types";
import { GraphQLChangeEvent, generateChangeEvent, playbackChangeEvents } from "mex-custom-function-lib/src/utilities";
import { GraphOperationType, GraphQLArgument } from "mex-custom-function-lib/src/utilities/graphql/graphql-service";

export async function saveMexData(input: CustomInput<CustomSaveInput>): Promise<CustomResult<CustomSaveResult>> {
    const logger = input.logger
    const arg = omit(['Count', 'CreatedDate'])(input.newInstanceData[0]) as GraphQLArgument
    arg['ResourceId'] = input.userInfo.resourceId
    logger.info(`argument ${JSON.stringify(arg)}`)
    const changeEvent: GraphQLChangeEvent = {
        schema: "CheckInObject",
        ownerContextId: randomUUID(),
        mutationType: GraphOperationType.insert,
        mutationArg: arg,
        mutationAlias: randomUUID()
    }
    logger.info(`argument ${JSON.stringify(changeEvent)}`)
    // const changeEvents = generateChangeEvent(input.instanceData, input.newInstanceData, input.objectMapping)

    const data = await playbackChangeEvents([changeEvent], input.services.GraphQLService)
    logger.info(`data ${JSON.stringify(data)}`)

    return {
        status: Status.SUCCESS,
        objectMapping: {}
    }
}
