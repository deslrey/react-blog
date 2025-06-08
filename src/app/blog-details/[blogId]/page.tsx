import dynamic from 'next/dynamic';
const BlogDetails = dynamic(() => import('./BlogDetails'));

interface Params {
    blogId: string;
}

interface PageProps {
    params: Params | Promise<Params>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;

    return <BlogDetails params={{ blogId: Number(resolvedParams.blogId) }} />;
}

export { generateMetadata } from './metadata';
