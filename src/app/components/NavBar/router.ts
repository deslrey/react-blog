const navList: NvaObj[] = [
    {
        key: 'home',
        href: '/',
        icon: 'icon-home',
        title: '首页'
    },
    {
        key: 'article',
        href: '/article',
        icon: 'icon-category',
        title: '文章'
    },
    {
        key: 'archive',
        href: '/archive',
        icon: 'icon-archive',
        title: '归档'
    },
    {
        key: 'about',
        href: '/about',
        icon: 'icon-about',
        title: '关于'
    }
]

export interface NvaObj {
    key: string,
    href: string,
    icon: string,
    title: string
}

export default navList;

