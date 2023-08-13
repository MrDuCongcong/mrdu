import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';

export default defineUserConfig({
	lang: 'zh-CN',
	title: "MrDu's Blog",
	theme: defaultTheme({
		navbar: [
			{
				text: '博客',
				link: '/blog/',
			},
			{
				text: '笔记',
				link: '/note/',
			},
		],
		sidebar: {
            '/blog/': [
                '前端监控'
            ]
        },
	}),
});
