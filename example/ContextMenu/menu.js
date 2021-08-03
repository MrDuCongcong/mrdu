import Vue from 'vue';
import { layoutMode } from '../VueGridLayout/helpers/utils';
import { getItemOnTreeById, filterItemOnTreeByIds } from '../../utils/treeHelper';

export const contextMenu = {
    top: {
        type: 'top',
        name: '置于顶层',
        icon: 'ico_front',
        disabled: topDisabled,
        action: topHandler,
    },
    bottom: {
        type: 'bottom',
        name: '置于底层',
        // shortcut: 'Ctrl+[',
        icon: 'ico_back',
        disabled: bottomDisabled,
        action: bottomHandler,
    },
    up: {
        type: 'up',
        name: '上移一层',
        // shortcut: 'Ctrl+Shift+]',
        icon: 'ico_preview',
        disabled: topDisabled,
        action: upHandler,
    },
    down: {
        type: 'down',
        name: '下移一层',
        // shortcut: 'Ctrl+Shift+[',
        icon: 'ico_next',
        disabled: bottomDisabled,
        action: downHandler,
    },
    upAlign: {
        type: 'upAlign',
        name: '上对齐',
        icon: 'ico_AlignUp',
        disabled: multiDisabled,
        action: upAlignHandler,
    },
    downAlign: {
        type: 'downAlign',
        name: '下对齐',
        icon: 'ico_AlignDown',
        disabled: multiDisabled,
        action: downAlignHandler,
    },
    leftAlign: {
        type: 'leftAlign',
        name: '左对齐',
        icon: 'ico_AlignLeft',
        disabled: multiDisabled,
        action: leftAlignHandler,
    },
    rightAlign: {
        type: 'rightAlign',
        name: '右对齐',
        // shortcut: 'Ctrl+Shift+[',
        icon: 'ico_AlignRight',
        disabled: multiDisabled,
        action: rightAlignHandler,
    },
    horizontalDis: {
        type: 'horizontalDis',
        name: '横向分布',
        // shortcut: 'Ctrl+Shift+[',
        icon: 'ico_HorizontalDis',
        disabled: multiDisabled,
        action: horizontalDisHander,
    },
    verticalDis: {
        type: 'verticalDis',
        name: '纵向分布',
        // shortcut: 'Ctrl+Shift+[',
        icon: 'ico_VerticalDis',
        disabled: multiDisabled,
        action: verticalDisHander,
    },
    separate: {
        separate: true,
    },
    lock: {
        type: 'lock',
        name: '锁定',
        icon: 'ico_lock',
        disabled: lockDisabled,
        action: lockHandler,
    },
    unLock: {
        type: 'unLock',
        name: '解锁',
        icon: 'ico_unlock',
        disabled: unLockDisabled,
        action: unLockHandler,
    },
    group: {
        type: 'group',
        name: '组合',
        icon: 'ico_group',
        shortcut: 'Ctrl+G',
        action: groupHandler,
    },
    unGroup: {
        type: 'unGroup',
        name: '取消组合',
        icon: 'ico_ungroup',
        shortcut: 'Ctrl+Shift+G',
        action: unGroupHandler,
    },
    gridLayout: {
        type: 'gridLayout',
        name: '栅格布局',
        disabled: gridLayoutDisabled,
        action: gridLayoutHandler,
    },
    pixelLayout: {
        type: 'pixelLayout',
        name: '像素布局',
        disabled: pixelLayoutDisabled,
        action: pixelLayoutHandler,
    },
    equalWidth: {
        type: 'equalWidth',
        name: '等宽',
        icon: 'ico_equal-width',
        action: handleEqualWidth,
    },
    equalHeight: {
        type: 'equalHeight',
        name: '等高',
        icon: 'ico_equal-height',
        action: handleEqualHeight,
    },
    equalSize: {
        type: 'equalSize',
        name: '等尺寸',
        icon: 'ico_equal-size',
        action: handleEqualSize,
    },
    verticalCenter: {
        type: 'verticalCenter',
        name: '垂直居中',
        icon: 'ico_vertical-center',
        action: handleVerticalCenter,
    },
    horizontalCenter: {
        type: 'horizontalCenter',
        name: '水平居中',
        icon: 'ico_horizontal-center',
        action: handleHorizontalCenter,
    },
    show: {
        typ: 'show',
        name: '显示',
        icon: 'icon_show',
        disabled: showDiabled,
        action: handleShow,
    },
    hidden: {
        typ: 'hidden',
        name: '隐藏',
        icon: 'icon_hidden',
        disabled: hiddenDiabled,
        action: handleHidden,
    },
};

function topHandler(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;

    let opeaItems = layout;
    const layoutItem = getItemOnTreeById(layoutItems, i);
    if (layoutItem.parentId) {
        const parentLayoutItem = getItemOnTreeById(layoutItems, layoutItem.parentId);
        opeaItems = parentLayoutItem.children;
    }

    const moveIndex = opeaItems.findIndex((l) => l.i === i);
    if (moveIndex > -1 && moveIndex < opeaItems.length) {
        const dels = opeaItems.splice(moveIndex, 1);
        opeaItems.push(...dels);
    }
}
function topDisabled(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;

    let tempLayout = layout;
    const layoutItem = getItemOnTreeById(layout, i);
    if (layoutItem.parentId) {
        const parentLayoutItem = getItemOnTreeById(layout, layoutItem.parentId);
        tempLayout = parentLayoutItem.children;
    }

    const moveIndex = tempLayout.findIndex((l) => l.i === i);
    return moveIndex === tempLayout.length - 1;
}
function bottomHandler(contextParams) {
    const { layout, i } = contextParams;

    const layoutItem = getItemOnTreeById(layout, i);
    const parentLayoutItem = getItemOnTreeById(layout, layoutItem.parentId);
    const childItems = parentLayoutItem.children;

    const moveIndex = childItems.findIndex((l) => l.i === i);
    if (moveIndex > 0) {
        const dels = childItems.splice(moveIndex, 1);
        childItems.unshift(...dels);
    }
}
function bottomDisabled(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;

    let tempLayout = layout;
    const layoutItem = getItemOnTreeById(layout, i);
    if (layoutItem.parentId) {
        const parentLayoutItem = getItemOnTreeById(layout, layoutItem.parentId);
        tempLayout = parentLayoutItem.children;
    }

    const moveIndex = tempLayout.findIndex((l) => l.i === i);
    return moveIndex === 0;
}
function upHandler(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;

    const layoutItem = getItemOnTreeById(layout, i);
    const parentLayoutItem = getItemOnTreeById(layout, layoutItem.parentId);
    const childItems = parentLayoutItem.children;

    const moveIndex = childItems.findIndex((l) => l.i === i);
    if (moveIndex > -1 && moveIndex < childItems.length) {
        const dels = childItems.splice(moveIndex, 1);
        childItems.splice(moveIndex + 1, 0, ...dels);
    }
}
function downHandler(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;

    const layoutItem = getItemOnTreeById(layout, i);
    const parentLayoutItem = getItemOnTreeById(layout, layoutItem.parentId);
    const childItems = parentLayoutItem.children;

    const moveIndex = childItems.findIndex((l) => l.i === i);
    if (moveIndex > 0) {
        const dels = childItems.splice(moveIndex, 1);
        childItems.splice(moveIndex - 1, 0, ...dels);
    }
}

function multiDisabled(contextParams) {
    const { selectedKeys } = contextParams;

    return selectedKeys.length < 2;
}

function upAlignHandler(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        selectedLayoutItems.forEach((item) => {
            item.y = findLayoutItem.y;
        });

        liteLayout.updateSpot();
    }
}

function downAlignHandler(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        const bottom = findLayoutItem.y + findLayoutItem.h;
        selectedLayoutItems.forEach((item) => {
            item.y = bottom - item.h;
        });
        liteLayout.updateSpot();
    }
}

function leftAlignHandler(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        selectedLayoutItems.forEach((item) => {
            item.x = findLayoutItem.x;
        });
        liteLayout.updateSpot();
    }
}
function rightAlignHandler(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        const right = findLayoutItem.x + findLayoutItem.w;
        selectedLayoutItems.forEach((item) => {
            item.x = right - item.w;
        });
        liteLayout.updateSpot();
    }
}

function horizontalDisHander(contextParams) {
    const { layout, selectedKeys, liteLayout } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);

    selectedLayoutItems.sort((first, second) => {
        return first.x - second.x;
    });

    // 求选中布局的间距总和
    const spaceBetweenSum = selectedLayoutItems.reduce((acc, current, index, arr) => {
        if (index === 0) {
            return acc;
        } else {
            const lastLayout = arr[index - 1];
            const spaceBetween = current.x - (lastLayout.x + lastLayout.w);
            return acc + spaceBetween;
        }
    }, 0);

    // 求选中布局的平均间距
    const avgSpace = spaceBetweenSum / (selectedLayoutItems.length - 1);
    selectedLayoutItems.forEach((layout, index, arr) => {
        if (index !== 0) {
            const lastLayout = arr[index - 1];
            layout.x = lastLayout.x + lastLayout.w + avgSpace;
        }
    });

    liteLayout.updateSpot();
}

function verticalDisHander(contextParams) {
    const { layout, selectedKeys, liteLayout } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);

    selectedLayoutItems.sort((first, second) => {
        return first.y - second.y;
    });

    // 求选中布局的间距总和
    const spaceBetweenSum = selectedLayoutItems.reduce((acc, current, index, arr) => {
        if (index === 0) {
            return acc;
        } else {
            const lastLayout = arr[index - 1];
            const spaceBetween = current.y - (lastLayout.y + lastLayout.h);
            return acc + spaceBetween;
        }
    }, 0);

    // 求选中布局的平均间距
    const avgSpace = spaceBetweenSum / (selectedLayoutItems.length - 1);
    selectedLayoutItems.forEach((layout, index, arr) => {
        if (index !== 0) {
            const lastLayout = arr[index - 1];
            layout.y = lastLayout.y + lastLayout.h + avgSpace;
        }
    });

    liteLayout.updateSpot();
}

function lockDisabled(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;
    const layoutItem = getItemOnTreeById(layout, i);
    if (layoutItem) {
        return !!layoutItem.static;
    }
}

function lockHandler(contextParams) {
    const { layout, selectedKeys } = contextParams;
    if (selectedKeys.length < 1) return;

    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    selectedLayoutItems.forEach((item) => {
        Vue.set(item, 'static', true);
    });
}

function unLockDisabled(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;
    const layoutItem = getItemOnTreeById(layout, i);
    if (layoutItem) {
        return !layoutItem.static;
    }
}

function unLockHandler(contextParams) {
    const { layout, i } = contextParams;
    if (i == undefined) return;
    const layoutItem = getItemOnTreeById(layout, i);
    if (layoutItem) {
        Vue.set(layoutItem, 'static', false);
    }
}

function groupHandler(contextParams) {}

function unGroupHandler(contextParams) {}

function gridLayoutHandler(contextParams) {
    const { gridLayoutInstance } = contextParams;
    if (gridLayoutInstance) {
        gridLayoutInstance.layoutMode = layoutMode.grid;
    }
}
function gridLayoutDisabled(contextParams) {
    const { gridLayoutInstance } = contextParams;
    return gridLayoutInstance?.layoutMode === layoutMode.grid;
}
function pixelLayoutHandler(contextParams) {
    const { gridLayoutInstance } = contextParams;
    if (gridLayoutInstance) {
        gridLayoutInstance.layoutMode = layoutMode.pixel;
    }
}
function pixelLayoutDisabled(contextParams) {
    const { gridLayoutInstance } = contextParams;
    return gridLayoutInstance?.layoutMode === layoutMode.pixel;
}
function handleEqualWidth(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        selectedLayoutItems.forEach((item) => {
            item.w = findLayoutItem.w;
        });
    }

    liteLayout.updateSpot();
}
function handleEqualHeight(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        selectedLayoutItems.forEach((item) => {
            item.h = findLayoutItem.h;
        });
    }

    liteLayout.updateSpot();
}
function handleEqualSize(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        selectedLayoutItems.forEach((item) => {
            item.w = findLayoutItem.w;
            item.h = findLayoutItem.h;
        });
    }

    liteLayout.updateSpot();
}

function handleVerticalCenter(contextParams) {
    const { layout, selectedKeys, i, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        const centerY = findLayoutItem.y + findLayoutItem.h / 2;
        selectedLayoutItems.forEach((item) => {
            item.y = centerY - item.h / 2;
        });

        liteLayout.updateSpot();
    }
}

function handleHorizontalCenter(contextParams) {
    const { layout, selectedKeys, liteLayout } = contextParams;
    const findLayoutItem = getItemOnTreeById(layout, i);
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    if (findLayoutItem) {
        const centerX = findLayoutItem.x + findLayoutItem.w / 2;
        selectedLayoutItems.forEach((item) => {
            item.x = centerX - item.w / 2;
        });
    }

    liteLayout.updateSpot();
}

function showDiabled(contextParams) {
    const { layout, selectedKeys, liteLayout } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    return selectedLayoutItems.every((item) => !item.hidden);
}

function handleShow(contextParams) {
    const { layout, selectedKeys } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    selectedLayoutItems.forEach((item) => {
        item.hidden = false;
    });
}

function hiddenDiabled(contextParams) {
    const { layout, selectedKeys } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    return selectedLayoutItems.every((item) => item.hidden);
}

function handleHidden(contextParams) {
    const { layout, selectedKeys } = contextParams;
    const selectedLayoutItems = filterItemOnTreeByIds(layout, selectedKeys);
    selectedLayoutItems.forEach((item) => {
        item.hidden = true;
    });
}
