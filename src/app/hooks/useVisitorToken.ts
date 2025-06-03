import { useEffect } from 'react'
import request from '../utils/Request'

const VISITOR_TOKEN_KEY = 'visitorToken'
const VISITOR_ID = 'visitorId'

const api = {
    visitorToken: '/visitor/visitorToken',
}

export const useVisitorToken = () => {
    useEffect(() => {
        const token = localStorage.getItem(VISITOR_TOKEN_KEY)
        if (token) {
            return
        }
        const createVisitorToken = async () => {
            const result = await request.post(api.visitorToken, {}, {}, 'form')
            console.log('result ======> ', result);
            if (result && result.code === 200) {
                const { id, visitorToken } = result.data
                localStorage.setItem(VISITOR_TOKEN_KEY, visitorToken)
                localStorage.setItem(VISITOR_ID, id)
            }
        }
        createVisitorToken()
    }, [])
}
