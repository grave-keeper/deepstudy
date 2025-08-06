import { SERVER_IP } from '../config/constants.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const getPyqPdfs = asyncHandler(async (filterData) => {
    const response = await fetch(
        `${SERVER_IP}/pyq?board=${filterData.board}&grade=${filterData.grade}&stream=${filterData.stream}&year=${filterData.year}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )

    const data = await response.json()
    return response.ok ? [true, data.message] : [false, data.error]
})

export { getPyqPdfs }
