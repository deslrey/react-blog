'use client'

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import YAML from 'yaml';
import styles from '../blogDetail.module.css';

interface FrontMatter {
    title: string;
    author: string;
    describe: string;
    update: string;
    readTime: string;
    type: string;
    fileName: number;
}

const BlogDetails = ({ params }: { params: Promise<{ blogId: number }> }) => {
    const { blogId } = React.use(params);

    const [frontMatter, setFrontMatter] = useState<FrontMatter | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const res = await fetch(`/content/${blogId}.md`);
                if (!res.ok) {
                    console.error('Markdown 加载失败');
                    return;
                }
                const text = await res.text();

                // 正则提取 Front Matter
                const match = text.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
                if (match) {
                    const yamlContent = match[1];
                    const markdownBody = match[2];

                    // 解析 YAML
                    const metadata: FrontMatter = YAML.parse(yamlContent);
                    setFrontMatter(metadata);
                    setMarkdownContent(markdownBody);
                } else {
                    setMarkdownContent(text); // 没有 Front Matter 直接渲染全文
                }
            } catch (error) {
                console.error('加载失败', error);
            }
        };

        loadMarkdown();
    }, [blogId]);

    return (
        <div className={styles.bolgDetail}>
            {/* 渲染 Front Matter */}
            {frontMatter && (
                <div className={styles.frontMatter}>
                    <h1>{frontMatter.title}</h1>
                    <p>作者: {frontMatter.author}</p>
                    <p>简介: {frontMatter.describe}</p>
                    <p>更新时间: {frontMatter.update}</p>
                    <p>阅读时间: {frontMatter.readTime}</p>
                    <p>类型: {frontMatter.type}</p>
                </div>
            )}

            {/* 渲染 Markdown 正文 */}
            <div className={styles.markdownContent}>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogDetails;
