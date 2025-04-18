'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './archive.module.css';
import request from '../utils/Request';
import { Article } from '../interfaces/bolgDetails';
import Notification from '../utils/Notification';
import dayjs from 'dayjs';

const ArchiveItem = ({ year, articles }: { year: string; articles: Article[] }) => {
    return (
        <div className={styles.year}>
            <h2>{year}</h2>
            <div className={styles.articleList}>
                {articles.map((item, index) => {
                    const date = dayjs(item.createTime);
                    const month = date.format('MM');
                    const day = date.format('DD');

                    return (
                        <div className={styles.articleItem} key={index}>
                            <div className={styles.dateBox}>
                                {month}-{day}
                            </div>
                            <Link href={`/blog-details/${item.id}`} className={styles.title}>
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
    const sign = useRef<boolean>(false);

    useEffect(() => {
        if (sign.current) return;
        sign.current = true;

        const fetchData = async () => {
            const res = await request.get("/article/getArchives");
            if (res.code !== 200) {
                Notification.error("查看存档失败", res.message);
                return;
            }

            const jsonData: Article[] = res.data;
            const grouped: Record<string, Article[]> = {};

            jsonData.forEach((item) => {
                const year = dayjs(item.createTime).format('YYYY');
                if (!grouped[year]) grouped[year] = [];
                grouped[year].push(item);
            });

            for (const year in grouped) {
                grouped[year].sort((a, b) => dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf());
            }

            setGroupedData(grouped);
            setTotalCount(jsonData.length);
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
