const setAuthHeader = (token) => {
    if (token) {
        return {
            headers: {
                Authorization: token,
                "Content-Type": "Application/json",
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    } else {
        return {
            headers: {
                Authorization: '',
                "Content-Type": "Application/json",
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
    }
}
export {
    setAuthHeader,
}