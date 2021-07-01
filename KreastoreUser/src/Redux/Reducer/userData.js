const InitialState = []

export const userData = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA_FULFILLED':
            return [...action.payload]

        default:
            return state
    }
}