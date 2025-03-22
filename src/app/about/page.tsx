import React from 'react';
import styles from './about.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <div className={styles.avatar}></div>
            <div className={styles.aboutContent}>
                <h1>关于我</h1>
                <p>这里是关于我的一些信息。</p>
            </div>
        </div>
    );
}

export default About;
