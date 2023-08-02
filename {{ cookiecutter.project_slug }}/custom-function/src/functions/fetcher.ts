import { CustomFetchInput, CustomFetchResult, CustomInput, CustomResult, Status } from '@skedulo/mex-service-libs/dist/types/inner-function'
import { FetchCheckInObjectsQuery, FetchCheckInObjectsQueryVariables, FetchCheckInObjectsDocument } from '../graphql/__graphql/generated'

export async function fetchMexData(input: CustomInput<CustomFetchInput>): Promise<CustomResult<CustomFetchResult>> {
    const logger = input.logger

    const userMetadata = await input.services.DataHelperService.getUserMetaData()
    logger.info(`User metadata is ${userMetadata}`)

    // const api = Axios.create({
    //     baseURL: 'https://api.open-meteo.com/v1'
    // })
    // const temp = await api.get('/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')

    const checkInObjects = await input.services.GraphQLService.executeFetchAutoPaginationForDocument<FetchCheckInObjectsQuery, FetchCheckInObjectsQueryVariables>(FetchCheckInObjectsDocument, {
        filter: `(ResourceId IN ["${userMetadata.resource?.id}"]) AND (JobId IN ["${input.contextObjectId}"])`
    })
    logger.info(`checkinobject length ${checkInObjects.length}`)
    const ret = checkInObjects.reduce<{Count: number, CheckInTime?: string | null}>((prev, curr)=> {
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
    }, {Count: 0, CheckInTime: null})
    return {
        status: Status.SUCCESS,
        data: {
            ...checkInObjects[0],
            ...ret
        }
    }
}
