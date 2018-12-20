export function fetchLaunches(state = {inProgress:true}, action) {
    const action_type = 'GET_LAUNCHES'
    switch (action.type) {
        case `${action_type}_PENDING`:
            return Object.assign({}, state, {
                inProgress: true
            })
        case `${action_type}_FULFILLED`:
            return Object.assign({}, state, {
                inProgress: false,
                all_launches: action.payload
            })
        case `${action_type}_REJECTED`:
            return Object.assign({}, state, {
                inProgress: false,
                error: action.error
            })
    
        default:
            return state
    }
}