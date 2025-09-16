import { safeRoutePromise } from '../utils/asyncHandler.js'
import storageService from '../services/storage.service.js'

const getPyq = safeRoutePromise(async (req, res) => {
    // console.log('inside pyq...')
    const { board = '', grade = '', stream = '', year = '' } = req.query
    if (
        !board.trim() ||
        !grade.trim() ||
        !stream.trim() ||
        !year.trim() ||
        board === 'Choose Board' ||
        grade === 'Choose Class' ||
        stream === 'Choose Stream' ||
        year === 'Choose Year'
    ) {
        console.log('invalid filter ....')
        return res.status(400).json({ error: 'invalid filter' })
    }
    const storageUrl = `pyq/${board}/${year}`
    const storage = new storageService()
    let message = {}
    if (board == 'icse') {
        // console.log('inside icse')
        message.stream = await storage.getPyq(`${storageUrl}/${stream}`)
        message.others = await storage.getPyq(`${storageUrl}/others`)
    } else if (board == 'cbse') {
        // console.log('inside cbse')
        for (let i = 1; i <= 4; i++) {
            message[`set${i}`] = await storage.getPyq(`${storageUrl}/set${i}`)
        }
    } else {
        // console.log('inside else')
        return res.status(400).json({ error: 'invalid filter' })
    }
    // console.log('finished fetch pyqs ...', message)
    res.status(200).json({ message })
})

export { getPyq }
