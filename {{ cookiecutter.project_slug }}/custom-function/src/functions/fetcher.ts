import { CustomFetchInput, CustomFetchResult, CustomInput, CustomResult, Status } from 'mex-custom-function-lib/src/types'
import { flattenGraphQlEdges, sanitizeGraphQLRawQueryData } from 'mex-custom-function-lib/src/utilities'
import { FetchCheckInObjects } from 'src/graphql/__graphql/graphql'
import { fetchCheckInObjects } from 'src/graphql/queries/queries.graphql'

export async function fetchMexData(input: CustomInput<CustomFetchInput>): Promise<CustomResult<CustomFetchResult>> {
    const logger = input.logger

    const userMetadata = await input.services.DataHelperService.getUserMetaData()
    logger.info(`User metadata is ${userMetadata}`)

    // const api = Axios.create({
    //     baseURL: 'https://api.open-meteo.com/v1'
    // })
    // const temp = await api.get('/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')

    const checkInObjects = await input.services.GraphQLService.executeFetchAutoPaginationForDocument<FetchCheckInObjects.Query, FetchCheckInObjects.Variables>(fetchCheckInObjects, {
        filter: `(ResourceId IN ["${userMetadata.resource?.id}"]) AND (JobId IN ["${input.contextObjectId}"])`
    })
    const rawCheckinObjects = sanitizeGraphQLRawQueryData(checkInObjects)
    logger.info(`checkinobject length ${rawCheckinObjects.length}`)
    const ret = rawCheckinObjects.reduce((prev, curr)=> {
        const date = curr.CheckInTime ? Date.parse(curr.CheckInTime) : undefined
        const prevDate = prev.CheckInTime ? Date.parse(prev.CheckInTime): undefined
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
    }, {Count: 0, CheckInTime: undefined} as {
        Count: number,
        CheckInTime?: string
    })
    return {
        status: Status.SUCCESS,
        data: {
            ...userMetadata,
            ...rawCheckinObjects[0],
            ...ret
        }
    }
}
