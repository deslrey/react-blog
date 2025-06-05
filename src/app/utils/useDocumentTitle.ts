'use client'
import { useEffect } from 'react'

export default function useDocumentTitle(title: string, description?: string) {
    useEffect(() => {
        if (title) {
            document.title = title
        } else {
            document.title = '博客'
        }
        
        if (description) {
            const metaDesc = document.querySelector("meta[name='description']")
            if (metaDesc) {
                metaDesc.setAttribute('content', description)
            } else {
                const meta = document.createElement('meta')
                meta.name = 'description'
                meta.content = description
                document.head.appendChild(meta)
            }
        }
    }, [title, description])
}
