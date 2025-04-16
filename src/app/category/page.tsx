import styles from './category.module.css'

import { MDXRemote } from 'next-mdx-remote'
import TableContents from '../components/TableContents';
import React, { useState, useEffect } from 'react';
import GithubSlugger from 'github-slugger'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const slugger = new GithubSlugger()

// 更新 `source` 类型为 `MDXRemoteSerializeResult`
interface BlogPageProps {
    theme: string
    setTheme: (theme: string) => void
    source: MDXRemoteSerializeResult // 修改为适当的类型
    tocElement: TocNode
}

interface TocNode {
    tagName: string
    properties: { [key: string]: any }
    children?: TocNode[]
    value?: string
    idTable?: string
}

export default function BlogPage({ theme, setTheme, source, tocElement }: BlogPageProps) {
    let array: string[] = []
    slugger.reset()

    // Extract table of contents IDs
    function extract(obj: TocNode) {
        if (obj.children) {
            obj.children.map((item) => {
                extract(item)
            })
        } else {
            array.push(slugger.slug(obj.value || ''))
        }
    }

    extract(tocElement)
    const [id, setId] = useState<string>(array[0] || '')

    useEffect(() => {
        let isMounted = true
        let arrayElement: { offsetTop: number, id: string }[]
        let onScrollTrue: () => void

        function onScroll(arrayElement: { offsetTop: number, id: string }[]) {
            return () => {
                let selectId: string | undefined
                arrayElement.forEach((item) => {
                    if (item.offsetTop <= document.documentElement.scrollTop) {
                        selectId = item.id
                    }
                })
                if (isMounted) setId(selectId || '')
            }
        }

        setTimeout(() => {
            arrayElement = array.map((item) => {
                const element = document.getElementById(item)
                return { offsetTop: element ? element.offsetTop + 56 : 0, id: item }
            })
            onScrollTrue = onScroll(arrayElement)
            window.addEventListener('scroll', onScrollTrue)
        }, 1000)

        return () => {
            isMounted = false
            window.removeEventListener('scroll', onScrollTrue)
        }
    }, [])

    return (
        <div className="wrapper">
            <div className="grid grid-cols-4 gap-6 relative">
                <div className="markdown xl:col-span-3 col-span-5 p-5 rounded-lg dark:bg-[#222222] box-shadow bg-white">
                    <MDXRemote {...source} />
                </div>
                <div className="xl:block hidden">
                    <div className="sticky top-24 p-5 rounded-lg dark:bg-[#222222] box-shadow bg-white">
                        <h3 className="text-xl text-gray-900 dark:text-gray-100 dark:opacity-90 font-bold pb-4">目录</h3>
                        <TableContents idTable={id} {...tocElement}></TableContents>
                    </div>
                </div>
            </div>
        </div>
    )
}
