import React from 'react';
import Navbar from './components/NavBar';
import { Metadata } from 'next';
import '../app/styles/globals.css'

export const metadata: Metadata = {
    title: 'deslre',
    description: '个人博客',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
