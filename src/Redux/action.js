export function addEvent(eventDetails) {
    return({
        type:'ADD_EVENT',
        payload:eventDetails
    })
}