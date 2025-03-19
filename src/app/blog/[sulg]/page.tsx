import React from 'react'

import './blog.module.css'

async function page({ params }: { params: Promise<{ sulg: number }> }) {

    const { sulg } = await params;

    console.log('sule ======> ', sulg);


    return (
        <div>Post : {sulg}</div>
    )
}

export default page