'use client';

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'
import ArticleImage from '../../../public/images/0.webp'
import styles from './article.module.css'
import request from '../utils/Request';
import { Article as ArticleObj } from '../interfaces/bolgDetails';
import SysIcon from '../components/SysIcon';
import dayjs from 'dayjs';


const ArticleItem = ({ article }: { article: ArticleObj }) => {
    return (
        <Link href={`/blog-details/${article.id}`} className={styles.link}>
            <div className={styles.articleItem}>
                <Image
                    src={ArticleImage}
                    alt={article.title}
                    className={styles.articleImage}
                    priority={true}

                />

                <div className={styles.articleContent}>
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <div className={styles.dateWrapper}>
                        <SysIcon
                            style={{ fontSize: '16px', color: '#888', marginRight: '6px' }}
                            type="icon-rili"
                        />
                        <span>{dayjs(article.createTime).format('YYYY-MM-DD HH:mm')}</span>
                    </div>

                </div>
            </div>
        </Link>
    )
}

function Article() {
    const [articles, setArticles] = useState<ArticleObj[]>([]);

    const sign = useRef<boolean>(false); // 用于标记是否已经加载过数据

    useEffect(() => {

        if (sign.current) return; // 如果已经加载过数据，则不再加载
        sign.current = true; // 设置标记为 true，表示数据已加载

        const loadArticles = async () => {
            const result = await request.get<ArticleObj[]>("/article/getArticleList")
            if (result.code !== 200) {
                console.error("获取文章列表失败", result.message);
                return;
            }
            const data = result.data;
            setArticles(data);
        };

        loadArticles();
    }, []);

    return (
        <div className={styles.article}>
            {articles.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </div>
    );
}

export default Article;
