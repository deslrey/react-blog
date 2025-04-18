'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import YAML from 'yaml';
import dayjs from 'dayjs';
import styles from '../blogDetail.module.css';
import request from '@/app/utils/Request';
import { Article } from '@/app/interfaces/bolgDetails';
import Notification from '@/app/utils/Notification';


const CodeBlock = ({ language, value }: { language: string; value: string }) => {
    const [copyText, setCopyText] = useState('复制');

    const handleCopy = () => {
        const copySuccess = () => {
            setCopyText('已复制');
            setTimeout(() => setCopyText('复制'), 2000);
        };

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(value).then(copySuccess).catch(() => fallbackCopy());
        } else {
            fallbackCopy();
        }

        function fallbackCopy() {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = value;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copySuccess();
            } catch (err) {
                alert('复制失败，请长按手动复制');
            }
        }
    };

    return (
        <div style={{ marginBottom: '10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className={styles.codeHeader}>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{language}</span>
                <button className={styles.copyBtn} onClick={handleCopy}>{copyText}</button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                PreTag="div"
                showLineNumbers
                customStyle={{
                    borderBottomLeftRadius: '12px',
                    borderBottomRightRadius: '12px',
                    fontSize: '15px',
                    lineHeight: '1.6'
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};

// 提取标题生成目录
const extractHeadings = (markdown: string) => {
    const headingRegex = /^(#{1,5})\s+(.*)$/gm;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
        headings.push({
            level: match[1].length,
            text: match[2],
            id: match[2].replace(/\s+/g, '-').toLowerCase()
        });
    }
    return headings;
};

const BlogDetails = ({ params }: { params: Promise<{ blogId: number }> }) => {
    const { blogId } = React.use(params);
    const [frontMatter, setFrontMatter] = useState<Article | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [headings, setHeadings] = useState<any[]>([]);
    const [wordCount, setWordCount] = useState<number>(0);
    const [readTime, setReadTime] = useState<number>(1);

    const sign = useRef<boolean>(false);

    useEffect(() => {

        if (sign.current) return;
        sign.current = true;
        const loadMarkdown = async () => {
            try {
                // const res = await fetch(`/content/${blogId}.md`);
                const result = await request.post<Article>(`/article/getArticleDetail`, { articleId: blogId }, {}, 'form');
                if (result.code !== 200) {
                    Notification.error("文章详情", result.message);
                    return;
                }
                const text = result.data.content
                setWordCount(text.length);
                setReadTime(Math.ceil(text.length / 400));

                const match = text.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
                if (match) {
                    setFrontMatter(YAML.parse(match[1]));
                    setMarkdownContent(match[2]);
                    setHeadings(extractHeadings(match[2]));
                } else {
                    console.log('YAML 匹配失败，原文:', text.slice(0, 300));
                    setMarkdownContent(text);
                    setHeadings(extractHeadings(text));
                }

            } catch (error) {
                console.error('加载失败', error);
            }
        };

        loadMarkdown();
    }, [blogId]);

    return (
        <div className={styles.bolgDetailContainer}>
            {/* 主内容区 */}
            <div className={styles.bolgDetail}>
                {frontMatter && (
                    <div className={styles.frontMatter}>
                        <h1>{frontMatter.title}</h1>
                        <p>作者: {frontMatter.author}</p>
                        <p>简介: {frontMatter.description}</p>
                        <p>更新时间: {dayjs(frontMatter.updateTime).format('YYYY-MM-DD HH:mm')}</p>
                        <p>字数: {wordCount}</p>
                        <p>阅读时间: {readTime}min</p>
                    </div>
                )}

                <div className={`${styles.markdownContent} markdownContent markdown`}>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({
                                inline,
                                className,
                                children,
                                ...props
                            }: {
                                inline?: boolean;
                                className?: string;
                                children?: React.ReactNode;
                            }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match ? match[1] : 'plaintext';
                                const codeString = String(children).replace(/\n$/, '');

                                return inline ? (
                                    <code className={className} {...props}>{children}</code>
                                ) : (
                                    <CodeBlock language={language} value={codeString} />
                                );
                            },
                            h1: ({ children }) => <h1 id={String(children).replace(/\s+/g, '-').toLowerCase()}>{children}</h1>,
                            h2: ({ children }) => <h2 id={String(children).replace(/\s+/g, '-').toLowerCase()}>{children}</h2>,
                            h3: ({ children }) => <h3 id={String(children).replace(/\s+/g, '-').toLowerCase()}>{children}</h3>,
                            h4: ({ children }) => <h4 id={String(children).replace(/\s+/g, '-').toLowerCase()}>{children}</h4>,
                            h5: ({ children }) => <h5 id={String(children).replace(/\s+/g, '-').toLowerCase()}>{children}</h5>,

                        }}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </div>
            </div>

            {/* 目录区 */}
            <div className={styles.directory}>
                <div>
                    <h3>目录</h3>
                    <ul>
                        {headings.map((heading, index) => (
                            <li key={index} style={{ marginLeft: (heading.level - 1) * 16, marginBottom: '8px' }}>
                                <a href={`#${heading.id}`} style={{ color: '#3498db', textDecoration: 'none', fontSize: '14px' }}>
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default BlogDetails;
