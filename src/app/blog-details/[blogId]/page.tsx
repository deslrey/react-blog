'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
        <div style={{ marginBottom: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
                    padding: '20px',
                    fontSize: '15px',
                    lineHeight: '1.6'
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};


const BlogDetails = ({ params }: { params: Promise<{ blogId: number }> }) => {
    const { blogId } = React.use(params);
    const [frontMatter, setFrontMatter] = useState<FrontMatter | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const res = await fetch(`/content/${blogId}.md`);
                if (!res.ok) return console.error('Markdown 加载失败');
                const text = await res.text();
                const match = text.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
                if (match) {
                    setFrontMatter(YAML.parse(match[1]));
                    setMarkdownContent(match[2]);
                } else {
                    setMarkdownContent(text);
                }
            } catch (error) {
                console.error('加载失败', error);
            }
        };

        loadMarkdown();
    }, [blogId]);

    return (
        <div className={styles.bolgDetail}>
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

            <div className={styles.markdownContent}>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                        }: {
                            node?: any;
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
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogDetails;
