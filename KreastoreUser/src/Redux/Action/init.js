export const alert = (data) => {
    return {
        type: 'ALERT',
        payload: Promise.resolve(data)
    }
}