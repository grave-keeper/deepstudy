import { getPyqPdfs } from '../api/pyq.js'
import toast from '../components/toast/script.js'

const handleGetPyqPdfs = async (filterData) => {
    const [status, data] = await getPyqPdfs(filterData)
    if (status) {
        return [status, data]
    } else {
        toast({ status: false, message: 'Failed To Fetch! Internal Server Error' })
        return false
    }
}

export { handleGetPyqPdfs }