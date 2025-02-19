'use client'

import React from 'react';

const BlogDetails = ({ params }: { params: { blogId: string } }) => {
    return (
        <div style={{ fontSize: '90px' }}>
            BlogId = {params.blogId}
        </div>
    );
};

export default BlogDetails;
