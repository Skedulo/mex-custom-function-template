import { CustomFetchInput, CustomFetchResult, CustomResult, CustomFunctionStatus } from '@skedulo/mex-service-libs/dist/types/mex-custom-function'
import { CustomInput } from '@skedulo/mex-service-libs/dist/types/inner-function'
import { FetchCheckInObjectsQuery, FetchCheckInObjectsQueryVariables, FetchCheckInObjectsDocument } from '../graphql/__graphql/generated'

export async function fetchMexData(input: CustomInput<CustomFetchInput>): Promise<CustomResult<CustomFetchResult>> {
    const logger = input.logger

    const rawCheckinObjects = await input.services.GraphQLService.executeFetchAutoPaginationForDocument<FetchCheckInObjectsQuery, FetchCheckInObjectsQueryVariables>(FetchCheckInObjectsDocument, {
        filter: `(ResourceId IN ["${input.userInfo.resourceId}"]) AND (JobId IN ["${input.contextObjectId}"])`
    })
    logger.info(`checkinobject length ${rawCheckinObjects.length}`)
    const ret = rawCheckinObjects.reduce<{
        Count: number,
        CheckInTime?: string | null | undefined
    }>((prev, curr)=> {
        const date = curr.CheckInTime ? Date.parse(curr.CheckInTime) : null
        const prevDate = prev.CheckInTime ? Date.parse(prev.CheckInTime): null
        if (!date || !prevDate) {
            return {
                Count: prev.Count + 1,
                CheckInTime: prev.CheckInTime || curr.CheckInTime
            }
        } else {
            return {
                Count: prev.Count + 1,
                CheckInTime: prevDate > date ? prev.CheckInTime : curr.CheckInTime
            }
        }
    }, {Count: 0, CheckInTime: null})
    return {
        status: CustomFunctionStatus.SUCCESS,
        data: {
          "CheckIn": {
            ...ret,
            JobId: input.contextObjectId,
            __typename: rawCheckinObjects[0]?.__typename || 'CheckInObject'
          }
        }
    }
}
