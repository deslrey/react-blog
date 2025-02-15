'use client'
import React from 'react'
import navList, { NvaObj } from './router';
import SysIcon from '../SysIcon';
import styles from "./navBar.module.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const pathName = usePathname()

    const nvaItem = (obj: NvaObj) => {
        return (
            <Link className={`${styles.nav_item} nav_item_text ${pathName !== '/' && pathName === obj?.href ? styles.nav_item_active : ''}`}
                key={obj?.key}
                href={obj?.href}>
                <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
                <span className={styles.nav_item_title}>{obj?.title}</span>
            </Link>
        )
    }

    return (
        <div className={styles.navStyle}>
            {navList.map(v => nvaItem(v))}
        </div>
    )
}

export default Navbar;