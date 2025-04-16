'use client';

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'
import ArticleImage from '../../../public/images/0.webp'

import styles from './article.module.css'
import request from '../utils/Request';
import { Article as ArticleObj } from '../interfaces/bolgDetails';


const ArticleItem = ({ article }: { article: ArticleObj }) => {
    return (
        <Link href={`/blog-details/${article.id}`} className={styles.link}>
            <div className={styles.articleItem}>
                <Image
                    src={ArticleImage}
                    alt={article.title}
                    className={styles.articleImage}
                />

                <div className={styles.articleContent}>
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                </div>
            </div>
        </Link>
    )
}

function Article() {
    const [articles, setArticles] = useState<ArticleObj[]>([]);

    const sign = useRef<boolean>(false); // 用于标记是否已经加载过数据

    // 使用 useEffect 加载 JSON 数据
    useEffect(() => {

        if (sign.current) return; // 如果已经加载过数据，则不再加载
        sign.current = true; // 设置标记为 true，表示数据已加载

        const loadArticles = async () => {

            const result = await request.get<ArticleObj[]>("/article/getArticleList")

            if (result.code !== 200) {
                console.error("获取文章列表失败", result.message);
                return;

            }

            // console.log('result ======> ', result);

            const data = result.data;

            setArticles(data); // 设置为文章数组
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
