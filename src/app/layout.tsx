import React from 'react';
import Navbar from './components/NavBar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19'
import { Metadata } from 'next';
import '../app/styles/globals.css'
import './styles/markdown.css'
// import './styles/markdown.scss'
import './styles/nProgress.css'

export const metadata: Metadata = {
    title: 'deslre',
    description: '个人博客',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body >
                <AntdRegistry>
                    <Navbar />
                    {children}
                </AntdRegistry>
            </body>
        </html>
    );
}
