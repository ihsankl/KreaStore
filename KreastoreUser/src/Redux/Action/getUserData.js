export const getUserData = (data) => {
    return {
        type: 'GET_USER_DATA',
        payload: Promise.resolve(data)
    }
}