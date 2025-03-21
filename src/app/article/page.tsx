'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'
import ArticleImage from '../../../public/images/0.webp'

import styles from './article.module.css'

interface ArticleObj {
    title: string,
    author: string,
    describe: string,
    update: string,
    readTime: string,
    type: string,
    fileName: number,
}

const ArticleItem = ({ article }: { article: ArticleObj }) => {
    return (
        <Link href={`/blog-details/${article.fileName}`} className={styles.link}>
            <div className={styles.articleItem}>
                <Image
                    src={ArticleImage}
                    alt={article.title}
                    className={styles.articleImage}
                />

                <div className={styles.articleContent}>
                    <h1>{article.title}</h1>
                    <p>{article.describe}</p>
                </div>
            </div>
        </Link>
    )
}

function Article() {
    const [articles, setArticles] = useState<ArticleObj[]>([]);

    // 使用 useEffect 加载 JSON 数据
    useEffect(() => {
        const loadArticles = async () => {
            const response = await fetch('/api/list.json');
            const data = await response.json();
            setArticles(data); // 设置为文章数组
        };

        loadArticles();
    }, []);

    return (
        <div className={styles.article}>
            {articles.map((article) => (
                <ArticleItem key={article.fileName} article={article} />
            ))}
        </div>
    );
}

export default Article;
