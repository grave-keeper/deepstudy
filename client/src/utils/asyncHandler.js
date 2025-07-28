export const asyncHandler = (fn) => async(...args) => {
    try {
        return fn(...args)
    } catch (error) {
        console.log(error)
        return null
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