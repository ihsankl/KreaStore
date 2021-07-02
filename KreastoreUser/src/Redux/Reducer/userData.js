const InitialState = {
    data:null,
    isAnonymous:false,
}

export const userData = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA_FULFILLED':
            return {
                data:action.payload.user,
                isAnonymous:action.payload.isAnonymous,
            }

        default:
            return state
    }
}