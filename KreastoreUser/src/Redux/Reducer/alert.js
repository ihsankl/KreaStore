const InitialState = {
    isLoading:false,
    isError:false,
    isSuccess:false,
    msg:'',
    status:'',
}

export const alert = (state = InitialState, action) => {
    switch (action.type) {
        case 'ALERT_FULFILLED':
            return {
                ...action.payload
            }

        default:
            return state
    }
}