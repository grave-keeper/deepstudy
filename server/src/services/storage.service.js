import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_API_KEY } from '../config/constants.js'
import { safeAsyncTry } from '../utils/asyncHandler.js'

export default class {
    #supabase
    constructor() {
        this.#supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)
    }

    getPyq = safeAsyncTry(async (storageUrl) => {
        const { data, error } = await this.#supabase.storage
            .from('pyq')
            .list(storageUrl, { limit: 10 })
        if (error) throw new Error(`Supabase fetch failed: ${error}`)

        const signedUrlPdfs = await Promise.all(
            // map gonna return promises
            data.map(async (pdfName) => {
                const { data, error } = await this.#supabase.storage
                    .from('pyq')
                    .createSignedUrl(`${storageUrl}/${pdfName.name}`, 300)
                if (error)
                    throw new Error(`Supabase Unexpected Error: ${error}`)
                return { name: pdfName.name, url: data.signedUrl }
            })
        )
        return signedUrlPdfs
    })
}