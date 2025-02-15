import React from 'react'
import navList, { NvaObj } from './router';
import SysIcon from '../SysIcon';
import styles from "./navBar.module.css";

const Navbar = () => {

    const nvaItem = (obj: NvaObj) => {
        return (
            <div key={obj.key}>
                <SysIcon type={obj.icon} />
                <span>{obj.title}</span>
            </div>
        )
    }

    return (
        <div className={styles.navStyle}>
            {navList.map(v => nvaItem(v))}
        </div>
    )
}

export default Navbar;