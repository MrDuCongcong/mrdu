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
					children: [
						{
							text: 'JavaScript',
							children: [
								{
									text: '类型',
									link: '/note/base/javascript/类型.md',
								},
								{
									text: '函数',
									link: '/note/base/javascript/函数.md',
								},
							]    
						},
                        {
                            text: 'CSS',
							children: [
								{
									text: '基础知识',
                                    link: '/note/base/css/基础知识.md',
								},
								{
									text: 'flex布局',
                                    link: '/note/base/css/flex布局.md',
								},
							]
                        },
						
					]
                },
				{
                    text: '框架',
					collapsible: true,
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
				{
					text: '部署',
					children: [
						{
							text: 'Docker',
                            link: '/note/deploy/docker.md',
						}
					]
				}
			],
			'/interview/': [
				'TypeScript',
				'react',
			]
		},
	}),
});
