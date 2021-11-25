# tsconfig.json详解

tsconfig.json是typescript的配置文件，该文件所在的目录表示当前目录是typescript项目的根目录。使用tsconfig.json最重要的有两个目的：

- 指定待编译的文件。

- 配置编译选项。

当然，该配置文件也可以是其他名字，但你必须显式其路径。它有两种使用方式：

- 运行tsc命令时，通过`--project`或者`-p` 命令行选项显示指定tsconfig.json文件的目录，或者直接指定.配置json文件的路径。
- 若运行tsc命令时没有显式指定该文件或文件目录的时候，编译器会从当前目录开始，并向父目录开始查找该文件。

tsconfig.json文件主要包含5个大的配置项："files"、"include"、"exclude"、"compilerOptions"、"extends"。

## files

需要编译的单个文件的列表。可以使用相对或者绝对路径。当然，该配置项只适用于引入少量文件。

```json
{
    "files": [
        "./utils/typeHeler.ts",
        "test.ts"
    ]
}
```

## include

需要编译的文件或目录。它支持global通配符。

```json
{
    "include": [
        "src",
        "scripts/**/*",
        "test/*"
    ]
}
```

## exclude

需要排除的文件或目录，仅用于更排除掉"include"`设置中包含的文件。虽然它能够过滤掉`"include"`引入的文件，但是`files`和`<reference>`明确指定的文件却会始终包含在内。默认情况下回排除掉 `node_modules`、`bower_components`、`jspn_packages`目录和`<outDir>`目录。

```json
{
    "exclude": {
        "dist",
        "node_"
    }
}
```

> 默认情况下，编译器包含需要编译的目录及子目录下所有的TypeScript文件（`.ts`、`.d.ts`、`.tsx`）文件。
>
> `"include"`和``"exclude"``配置时可以使用globa通配符：
>
> - `*`匹配0或多个字符（不包含目录分隔符）
> - `?`匹配任意一个字符（不包含目录分隔符）
> - `**/`递归匹配任意子目录

## compolierOptions

| 选项      | 类型    | 默认值 | 描述 |
| --------- | ------- | ------ | ---- |
| --allowJS | boolean | flase  |      |
|           |         |        |      |
|           |         |        |      |



[1]: https://www.gitmemory.com/issue/ant-design/ant-design-pro/8158/791277893	"tsconfig中的jsx配置"
[2]: https://zhuanlan.zhihu.com/p/148081795	"esModuleInterop 到底做了什么？"

[3]: https://jkchao.github.io/typescript-book-chinese/	"深入理解 TypeScript"

