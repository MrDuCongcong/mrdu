import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';

export default defineUserConfig({
	lang: 'zh-CN',
	title: "MrDu's Blog",
	lastUpdated: '更新时间',
	theme: defaultTheme({
		navbar: [
			{
				text: '博客',
				link: '/blog/微前端.md',
			},
			{
				text: '笔记',
				link: '/note/',
			},
			{
				text: '面试',
				link: '/interview/react.md'
			}
		],
		sidebar: {
			'/blog/': [
		       '微前端',
			   '前端监控',
			   '手写常用的工具函数',
			],
			'/note/': [
				{
                    text: '基础知识',
                    link: '/base/',
					children: [
						{
							text: 'JavaScript',
                            link: '/javascript/',
							children: [
								'类型',
								'函数',
								'对象',
							]    
						},
                        {
                            text: 'CSS',
                            link: '/css/',
							children: [
                                '基础知识',
                                'flex布局',
                                '栅格布局',
							]
                        },
						
					]
                },
				{
                    text: '框架',
                    link: '/framework/',
					children: [
						{
							text: 'React',
                            link: '/react/',
						},
						{
                            text: 'Vue',
                            link: '/vue/',
                        },
					]
                },
			],
			'/interview/': [
				'TypeScript',
				'react',
			]
		},
	}),
});
