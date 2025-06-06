'use client'

import React from 'react'
import { useEffect, useRef } from "react"
import BgImage from '../../../public/images/bg05.jpeg'
import styles from './home.module.css'
import Typed from "typed.js"
import Image from 'next/image'
import SysIcon from '../components/SysIcon'
import { scrollTo } from '../utils/elements'
import { useVisitorToken } from '../hooks/useVisitorToken'

const Home = () => {

    const typeTarget = useRef<any>(null);
    const aboutDom = useRef<any>(null);

    const goAbout = () => {
        const aboutTop = aboutDom.current.offsetTop;
        scrollTo(aboutTop, {
            getContainer: () => document.body || window,
        });
    };
    useVisitorToken()
    useEffect(() => {

        const typed = new Typed(typeTarget.current, {
            strings: [
                "个人Blog",
                "别把最好的时光浪费在无谓的等待和犹豫不决中",
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            loopCount: Infinity,
            autoInsertCss: false,
            backDelay: 2000,
            showCursor: false,
        });
        return () => {
            typed.destroy();
        };
    }, []);

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
            <div className={styles.bg_mask} id="bg_mask" />
            <div className={styles.bg_content}>
                <div className={styles.title}>....</div>
                <div className={styles.description_box}>
                    <div className={styles.description} ref={typeTarget} />
                </div>
                <div className={styles.jiantou}>
                    <SysIcon
                        className={styles.jiantou_icon}
                        type="icon-arrow-down"
                        onClick={goAbout}
                    />
                </div>
            </div>
            <div className={styles.page_box} ref={aboutDom}>
                <div style={{ height: '800px' }}>测试数据</div>
            </div>
        </div>
    )
}


export default Home;
