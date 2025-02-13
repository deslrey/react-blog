'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/about')
    }

    return (
        <div>
            <h1>我是首页</h1>
            <button onClick={handleClick}>点我跳转到关于界面</button>
        </div>
    )
}

export default Home
