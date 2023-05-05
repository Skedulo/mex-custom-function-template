import Axios from 'axios'
import { CustomFetchInput, CustomFetchResult, CustomInput, CustomResult, Status } from 'mex-custom-function-lib/src/types'

export async function fetchMexData(input: CustomInput<CustomFetchInput>): Promise<CustomResult<CustomFetchResult>> {
    try {
        const logger = input.logger

        const userMetadata = await input.services.DataHelperService.getUserMetaData()
        logger.info(`User metadata is ${userMetadata}`)

        const api = Axios.create({
            baseURL: 'https://api.open-meteo.com/v1'
        })
        const temp = await api.get('/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
        return {
            status: Status.SUCCESS,
            data: {
                ...userMetadata,
                ...temp.data
            }
        }
    }
    catch(e: any) {
        return {
            status: Status.ERROR,
            message: e.message,
            data: {}
        }
    }
    
}