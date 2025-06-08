import request from '@/app/utils/Request';

const api = {
    metadata: '/article/metadata',
};

export async function generateMetadata({ params }: { params: Promise<{ blogId: number }> }) {
    const { blogId } = await params;

    console.log('正在请求文章 metadata', blogId);

    const result = await request.post(api.metadata, { articleId: blogId }, {}, 'form');

    if (result && result.code === 200) {
        const data = result.data;
        return {
            title: data.title || 'deslrey博客',
            description: data.description || 'deslrey博客',
        };
    }

    return {
        title: 'deslrey博客',
        description: 'deslrey博客',
    };
}
