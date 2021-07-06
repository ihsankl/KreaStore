const putUserDataInitialState = {
    data: null,
    isAnonymous: false,
    isSignedIn: false,
}

const getUserDataInitialState = {
    data:[],
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const insertUserDataInitialState = {
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const updateUserDataInitialState = {
    isSuccess: false,
    isError: false,
    isLoading: false,
}

export const putUserData = (state = putUserDataInitialState, action) => {
    switch (action.type) {
        case 'PUT_USER_DATA_FULFILLED':
            return {
                data: action.payload.user,
                isAnonymous: action.payload.isAnonymous,
                isSignedIn: action.payload.isSignedIn,
            }

        default:
            return state;
    }
}

export const getUserData = (state = getUserDataInitialState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA_PENDING':
            return {
                data: null,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'GET_USER_DATA_REJECTED':
            return {
                data: null,
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'GET_USER_DATA_FULFILLED':
            return {
                data: action.payload.data(),
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}

export const insertUserData = (state = insertUserDataInitialState, action) => {
    switch (action.type) {
        case 'INSERT_USER_DATA_PENDING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'INSERT_USER_DATA_REJECTED':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'INSERT_USER_DATA_FULFILLED':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}

export const updateUserData = (state = updateUserDataInitialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA_PENDING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'UPDATE_USER_DATA_REJECTED':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'UPDATE_USER_DATA_FULFILLED':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}