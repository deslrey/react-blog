import React from 'react';

export const metadata = {
    title: 'deslre',
    description: '个人博客',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                {children}
            </body>
        </html>
    );
}
