'use client'

import React, { useState, useEffect, useRef } from 'react';
import navList, { NvaObj } from './router';
import SysIcon from '../SysIcon';
import styles from "./navBar.module.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuIconRef = useRef<HTMLDivElement | null>(null);

    // 点击菜单外部区域时关闭菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                menuIconRef.current && !menuIconRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const nvaItem = (obj: NvaObj) => (
        <Link
            className={`${styles.nav_item} nav_item_text ${pathName !== '/' && pathName === obj?.href ? styles.nav_item_active : ''}`}
            key={obj?.key}
            href={obj?.href}
            onClick={() => setMenuOpen(false)}  // 点击后关闭菜单
        >
            <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
            <span className={styles.nav_item_title}>{obj?.title}</span>
        </Link>
    );

    return (
        <div className={`${styles.nav} ${pathName === '/' ? styles.nav_transparent : ''}`}>
            <div className={styles.nav_left}>
                <Link className={`${styles.title} nav_item_text`} href='/'>
                    <div>我是Logo</div>
                </Link>
            </div>
            <div className={styles.nav_right}>
                {/* 桌面端菜单 */}
                <div className={styles.nav_list}>
                    {navList.map(v => nvaItem(v))}
                </div>

                {/* 移动端汉堡菜单 */}
                <div className={styles.menu_icon} ref={menuIconRef} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>

                {/* 移动端下拉菜单 */}
                <div ref={menuRef} className={`${styles.mobile_menu} ${menuOpen ? styles.menu_open : styles.menu_close}`}>
                    {navList.map(v => nvaItem(v))}
                </div>
            </div>
            {pathName !== '/' && <div className={styles.under_line}></div>}
        </div>
    );
};

export default Navbar;
