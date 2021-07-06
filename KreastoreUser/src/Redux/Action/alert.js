export const setAlert = (data) => {
    return {
        type: 'ALERT',
        payload: Promise.resolve(data)
    }
}