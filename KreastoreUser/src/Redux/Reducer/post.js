const allPostInitialState = {
    data: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const getDetailPostInitialState = {
    data: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const insertPostDataInitialState = {
    isSuccess: false,
    isError: false,
    isLoading: false,
}

const updatePostDataInitialState = {
    isSuccess: false,
    isError: false,
    isLoading: false,
}

export const allPost = (state = allPostInitialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POST_DATA_PENDING':
            return {
                data: null,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'GET_ALL_POST_DATA_REJECTED':
            return {
                data: null,
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'GET_ALL_POST_DATA_FULFILLED':
            const data = [];
            action.payload.forEach(docs => {
                let currentId = docs.id;
                let appObj = { ...docs.data(), ['id']: currentId };
                data.push(appObj);
                setData(data);
            });

            return {
                data: data,
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}

export const detailPost = (state = getDetailPostInitialState, action) => {
    switch (action.type) {
        case 'GET_DETAIL_POST_DATA_PENDING':
            return {
                data: null,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'GET_DETAIL_POST_DATA_REJECTED':
            return {
                data: null,
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'GET_DETAIL_POST_DATA_FULFILLED':
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

export const insertPost = (state = insertPostDataInitialState, action) => {
    switch (action.type) {
        case 'INSERT_POST_DATA_PENDING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'INSERT_POST_DATA_REJECTED':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'INSERT_POST_DATA_FULFILLED':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}

export const updatePost = (state = updatePostDataInitialState, action) => {
    switch (action.type) {
        case 'UPDATE_POST_DATA_PENDING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
            }

        case 'UPDATE_POST_DATA_REJECTED':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
            }

        case 'UPDATE_POST_DATA_FULFILLED':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
            }

        default:
            return state;
    }
}