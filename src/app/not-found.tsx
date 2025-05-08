import Link from 'next/link'
import React from 'react'

const notFound = () => {
    return (
        <>
            <div style={{ fontSize: '36px', textAlign: 'center', marginTop: '20%' }}>
                <h1>访问当前不存在</h1>
                <Link href="/" style={{ fontSize: '24px', color: '#3498db', textDecoration: 'none' }}>返回首页</Link>
            </div>
        </>
    )
}

export default notFound