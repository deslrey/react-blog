'use client'

import React from 'react'
import BgImage from '../../../public/images/bg05.jpeg'
import styles from './home.module.css'
import Image from 'next/image'

const Home = () => {

    return (
        <div className={styles.home}>
            <div className={styles.bg_card}>
                <Image
                    className={styles.bg_card_img}
                    width={2000}
                    height={1000}
                    src={BgImage}
                    alt='blog-bg'
                    priority={true} />
            </div>
        </div>
    )
}


export default Home;
