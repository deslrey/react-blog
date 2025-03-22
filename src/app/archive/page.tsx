'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './archive.module.css';

interface Article {
    title: string;
    author: string;
    describe: string;
    update: string;
    readTime: string;
    type: string;
    fileName: number;
}

const ArchiveItem = ({ year, articles }: { year: string; articles: Article[] }) => {
    return (
        <div className={styles.year}>
            <h2>{year}</h2>
            <div className={styles.articleList}>
                {articles.map((item, index) => {
                    const [, month, day] = item.update.split('-');
                    return (
                        <div className={styles.articleItem} key={index}>
                            <div className={styles.dateBox}>
                                {month}-{day}
                            </div>
                            <Link href={`/blog-details/${item.fileName}`} className={styles.title}>
                                {item.title}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Archive = () => {
    const [groupedData, setGroupedData] = useState<Record<string, Article[]>>({});
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/list.json');
            const jsonData: Article[] = await res.json();

            const grouped: Record<string, Article[]> = {};
            jsonData.forEach((item) => {
                const year = item.update.split('-')[0];
                if (!grouped[year]) grouped[year] = [];
                grouped[year].push(item);
            });

            for (const year in grouped) {
                grouped[year].sort((a, b) => new Date(b.update).getTime() - new Date(a.update).getTime());
            }

            setGroupedData(grouped);
            setTotalCount(jsonData.length); // 统计总数
        };

        fetchData();
    }, []);

    return (
        <div className={styles.archive}>
            <div className={styles.archive_content}>
                <h1>归档</h1>
                <p className={styles.count}>共计 {totalCount} 篇文章</p>
                {Object.keys(groupedData)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((year) => (
                        <ArchiveItem key={year} year={year} articles={groupedData[year]} />
                    ))}
            </div>
        </div>
    );
};

export default Archive;
