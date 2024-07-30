import { CustomInput, CustomFunctionStatus, CustomRawInput, CustomResult, GraphOperationType } from '@skedulo/mex-service-libs/types'
import { pick } from 'lodash';
import { GraphQLChangeEvent, playbackChangeEvents } from '@skedulo/mex-service-libs/utilities';

const selfAssignLabel: string = "__AssignToMyself"

// These standard fields are collected from SkeduloMobile app.
const jobStandardFields = [
    "AccountId",
    "Address",
    "ContactId",
    "Description",
    "Duration",
    "End",
    "NotesComments",
    "RegionId",
    "Start",
    "Type",
    "Urgency",
    "FollowupReason"
]

export async function createJob(input: CustomInput<CustomRawInput>): Promise<CustomResult<any>> {
    console.log("input", JSON.stringify(input))
    const data = input.body

    const selfAssign = data[selfAssignLabel] as boolean
    const jobData = pick(data, jobStandardFields)
    let changeEvents: GraphQLChangeEvent[] = []
    // We just want 2 event to have same owner
    // So just use the job id for context id here, can use random uuid if needed
    const contextId = data["UID"]
    const jobId = data["UID"]
    changeEvents.push({
        schema: "Jobs",
        ownerContextId: contextId,
        mutationType: GraphOperationType.insert,
        mutationArg: jobData,
        mutationAlias: jobData["UID"]
    })

    if (selfAssign) {
        changeEvents.push({
            schema: "JobAllocations",
            ownerContextId: contextId,
            mutationType: GraphOperationType.insert,
            mutationArg: {
                JobId: jobId,
                ResourceId: input.userInfo.resourceId,
                Status: "Confirmed",
                TimeResponded: new Date().toISOString()
            }
        })
    }

    const result = await playbackChangeEvents(changeEvents, input.services.GraphQLService)
    if (result.contextResults[contextId].success === false) {
        return {
            status: CustomFunctionStatus.ERROR,
            message: result.contextResults[contextId].errors?.join("\n"),
            objectMapping: result.idMap
        }
    }

    // Refresh the parent job and all new jobs
    await Promise.all([
        ...Object.values(result.idMap).map((id: string) => input.services.DataHelperService.refreshEntity("Job", id))
    ])

    return {
        status: CustomFunctionStatus.SUCCESS,
        objectMapping: result.idMap
    }
}
