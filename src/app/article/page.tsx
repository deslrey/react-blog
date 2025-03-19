import React from 'react'
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'
import ArticleImage from '../../../public/images/0.webp'

import styles from './article.module.css'


interface ArticleObj {
    id: number,
    title: string,
    description: string,
    image: StaticImageData,
}

const ArticleList: ArticleObj[] = [
    { id: 1, title: 'Article 1', description: 'Description 1', image: ArticleImage },
    { id: 2, title: 'Article 2', description: 'Description 2', image: ArticleImage },
    { id: 3, title: 'Article 3', description: 'Description 3', image: ArticleImage },
]


const ArticleItem = ({ article }: { article: ArticleObj }) => {
    return (
        <Link href={`/blog-details/${article.id}`} className={styles.link}>
            <div className={styles.articleItem}>
                <Image
                    src={article.image}
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
    return (
        <>
            <div className={styles.article}>
                {ArticleList.map((article) => (
                    <ArticleItem key={article.id} article={article} />
                ))}
            </div>
        </>
    )
}

export default Article