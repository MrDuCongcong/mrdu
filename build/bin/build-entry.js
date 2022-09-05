const fs = require('fs');
const path = require('path');

const docTypes = ['blog', 'note', 'interview'];
const CFG_DIR = '../../config';
const OUTPUT_DIR = '../../src/data';

// 解析博客/笔记/面试的配置文件
function resolveCfg(docType, cfgPath, outputPath) {
    const cfg = require(cfgPath);

    const cfgDir = path.dirname(path.resolve(cfgPath));

    let catalog = buildEntry(cfgDir, cfg);

    // 临时先这样写吧
    if (docType === 'blog' || docType === 'interview') {
        catalog = catalog[0].children;
    }

    fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 4));
}

// 根据配置文件，递归构建文件目录
function buildEntry(cfgDir, cfg) {
    const catalog = [];

    cfg.forEach((item) => {
        const docPath = path.resolve(cfgDir, item.path);
        const docInfo = readFile(docPath);

        if (item.title) docInfo.title = item.title;

        if (item.children) {
            docInfo.children = buildEntry(cfgDir, item.children);
        }

        catalog.push(docInfo);
    });

    return catalog;
}

function readFile(docPath) {
    const docInfo = {};
    docInfo.title = path.basename(docPath);

    const fsStat = fs.statSync(docPath);

    if (fsStat.isDirectory(docPath)) {
        const arr = fs.readdirSync(docPath);
        docInfo.children = arr.map((item) => {
            const fullPath = path.join(docPath, item);
            return readFile(fullPath);
        });
    } else if (fsStat.isFile(docPath)) {
        docInfo.updateTime = fsStat.ctime;
        // docInfo.path = path.resolve(docPath);
    }

    return docInfo;
}

docTypes.forEach((item) => {
    const cfgPath = `${CFG_DIR}/${item}.json`;
    const outputPath = `${OUTPUT_DIR}/${item}.json`;

    resolveCfg(item, cfgPath, outputPath);
});

console.log('[BUILD DONE]目录构建完成');
