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
			{
				text: '面试',
				link: '/interview/'
			}
		],
		sidebar: {
			'/blog/': [
		       '微前端',
			   '前端监控',
			   '手写常用的工具函数',
			],
			'/interview': [
				'react'
			]
		},
	}),
});
