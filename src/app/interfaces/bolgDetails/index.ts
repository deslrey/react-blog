interface articleDetail {
    title: string;
    author: string;
    descride: string;
    updateDate: Date;
    wordCount: number;
    readTime: number;
    type: string;
    content: string;
}

interface Article {
    id: number;
    author: string;
    title: string;
    imagePath: string;
    description: string;
    storagePath: string;
    tags: string;
    category: string;
    createTime: Date;
    updateTime: Date;
    wordCount: number;
    readTime: number;
    content: string;
    exist: boolean;
}

export type { articleDetail, Article };