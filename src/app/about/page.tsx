import React from 'react';
import styles from './about.module.css';
import SysIcon from '../components/SysIcon';

const About = () => {
    return (
        <div className={styles.about}>
            <div className={styles.avatar}></div>
            <a href="https://github.com/deslrey" target="_blank" rel="noopener noreferrer">
                <SysIcon
                    style={{ fontSize: '40px', color: '#000' }}
                    type="icon-github1"
                />
            </a>
            <div className={styles.aboutContent}>
                <p>这里是关于我的一些信息。</p>
            </div>
        </div>
    );
}

export default About;
