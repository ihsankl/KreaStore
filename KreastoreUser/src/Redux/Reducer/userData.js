const getUserDataInitialState = {
    data: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const inputUserDataInitialState = {
    data: null,
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

const isAnonymousInitialState = {
    state: false
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

export const isAnonData = (state = isAnonymousInitialState, action) => {
    switch (action.type) {
        case 'IS_ANONYMOUS_FULFILLED':
            return {
                ...action.payload
            }

        default:
            return state
    }
}

// INPUT_USER_DATA
export const inputUserData = (state = inputUserDataInitialState, action) => {
    switch (action.type) {
        case 'INPUT_USER_DATA_FULFILLED':
            return {
                ...action.payload
            }

        default:
            return state
    }
}