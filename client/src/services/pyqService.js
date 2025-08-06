import { getPyqPdfs } from '../api/pyq.js'

const handleGetPyqPdfs = async (filterData) => {
    const [status, data] = await getPyqPdfs(filterData)
    if (status) {
        return [status, data]
    } else {
        return false
    }
}

export { handleGetPyqPdfs }
