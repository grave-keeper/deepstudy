export const asyncHandler = (fn) => async(...args) => {
    try {
        return await fn(...args)
    } catch (error) {
        console.error(error)
        return [false,error]
    }
}

// const asyncHandler = (fn) => (...args) => {
//   return Promise.resolve(fn(...args))
//     .then(result => result)
//     .catch(error => {
//       console.error(error);
//       return null;
//     });
// };`