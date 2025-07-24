const safeAsyncTry =
    (fn) =>
    (...args) => {
        try {
            return fn(...args)
        } catch (error) {
            console.log(error)
            return null
        }
    }

const safeRoutePromise = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error)
        )
    }
}

export { safeAsyncTry, safeRoutePromise }