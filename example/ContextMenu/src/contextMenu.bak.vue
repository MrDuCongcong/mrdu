<template>
    <ul ref="container" class="editor-context-menu" v-show="showMenu" :style="contextPos" @click.stop="() => {}">
        <li
            v-for="(menu, index) in menus"
            v-show="menu.show"
            :key="index"
            :title="!menu.separate ? menu.name : ''"
            @mousedown.stop
            @click.stop="menuClick(menu, $event)"
            :class="['context-menu-item', { 'context-menu-selected': menu.selected, disabled: disabled(menu), separate: menu.separate }]"
        >
            <div v-if="!menu.separate && menu.icon" :class="['editor-icon', menu.icon]"></div>
            <div v-if="!menu.separate && menu.iconSvg" class="editor-icon">
                <i-icon
                    :style="{ color: disabled(menu) ? '#ccc' : '#000' }"
                    style="position: absolute; top: 2px; left: 2px; font-size: 16px; width: 16px; height: 16px"
                    :icon-class="menu.iconSvg"
                ></i-icon>
            </div>
            {{ !menu.separate ? menu.name : '' }}
            <div v-if="!menu.separate" class="extend">
                <template v-if="menu.selected">
                    <i-icon style="font-size: 18px; color: #000" :icon-class="'checked'"></i-icon>
                </template>
                <template v-else>
                    {{ menu.shortcut }}
                </template>
            </div>

            <div :v-if="!menu.separate" class="menu-item-next"></div>
        </li>
    </ul>
</template>

<script>
import { addWindowEventListener, removeWindowEventListener } from '../helpers/DOM';

export default {
    name: 'context-menu',
    props: {
        items: {
            type: Array,
            default: function () {
                return [];
            },
        },
        show: {
            type: Boolean,
            default: false,
        },
        evt: {
            type: MouseEvent,
        },
    },
    data() {
        return {
            menus: [],
            top: 0,
            left: 0,
            context: null,
            showMenu: false,
        };
    },
    computed: {
        contextPos() {
            return { top: this.top + 'px', left: this.left + 'px' };
        },
    },
    watch: {
        evt(newVal) {
            this.context = newVal.context;
            this.render();
            this.showMenu = true;
            this.$nextTick(() => {
                const containerRect = this.$refs.container.getBoundingClientRect();
                const parentDom = this.$el.parentNode;

                const parentRect = parentDom.getBoundingClientRect();

                let offsetLeft = newVal.pageX + parentDom.scrollLeft - parentRect.x;
                let offsetTop = newVal.pageY + parentDom.scrollTop - parentRect.y;

                if (offsetLeft + containerRect.width > parentDom.offsetParent.offsetWidth + parentDom.offsetParent.offsetLeft - parentRect.x)
                    offsetLeft = offsetLeft - containerRect.width;
                if (offsetTop + containerRect.height > parentDom.offsetParent.offsetHeight + parentDom.offsetParent.offsetTop - parentRect.y)
                    offsetTop = offsetTop - containerRect.height;

                this.left = offsetLeft;
                this.top = offsetTop;
            });
        },
        items() {
            //this.render();
        },
        show(newVal) {
            this.showMenu = newVal;
        },
    },
    created() {
        addWindowEventListener('click', this.closeMenu);
    },
    beforeDestroy() {
        removeWindowEventListener('click', this.closeMenu);
    },
    mounted() {},
    methods: {
        closeMenu(evt) {
            let path = evt?.path;
            let state = true;
            let showMenu = false;
            let index = 0;
            if (path) {
                while (state) {
                    index++;
                    let p = path.shift();
                    let classList = p.classList;

                    if (classList && classList.contains('editor-context-menu')) {
                        state = false;
                        showMenu = true;
                    }
                    if (!path.length || index > 4) state = false;
                }
            }
            if (this.showMenu && !showMenu) this.showMenu = false;
        },
        render() {
            if (this?.items?.length) {
                this.menus = this.items.map((item) => {
                    return {
                        type: item.type,
                        name: item.name,
                        shortcut: item.shortcut,
                        selected: item.selected,
                        action: item.action,
                        icon: item.icon,
                        iconSvg: item.iconSvg,
                        separate: item.separate ? true : false,
                        disabled: item.disabled,
                        context: item.context,
                        render: item.render,
                        show: typeof item.show === 'function' ? item.show() : typeof item.show === 'boolean' ? item.show : true,
                    };
                });
            } else {
                this.menus = [];
            }
        },
        disabled(menu) {
            return typeof menu.disabled === 'function' ? menu.disabled(this.context) : typeof menu.disabled === 'boolean' ? menu.disabled : false;
        },
        menuClick(menu) {
            if (!this.disabled(menu)) {
                if (typeof menu.action == 'function') {
                    menu.action(Object.assign({ e: this.evt }, this.context, menu.context));
                }
                //menu.action && this.$emit('contextChange', menu, this.context);
                this.showMenu = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.editor-icon {
    background: url('../../../assets/img/layout/editor.png') no-repeat;
    height: 20px;
    width: 20px;
}

.disabled .editor-icon {
    background-image: url('../../../assets/img/layout/editor_disabled.png');
}

.editor-context-menu {
    padding: 4px 0px;
    position: absolute;
    background: #fafafa;
    border-radius: 4px;
    border: 1px solid rgb(180, 180, 180);
    box-shadow: 0 0 6px rgba(141, 141, 141, 0.85);
    z-index: 1000000000;
    li {
        font-family: 'Microsoft Yahei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 12px;
        line-height: 26px;
        width: 185px;
        cursor: pointer;
        position: relative;
        color: #333;
        padding: 0px 30px;
        //text-indent: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .editor-icon {
            position: absolute;
            top: 3px;
            left: 5px;

            &.cut {
                background-position: 0px -480px;
            }
            &.copy {
                background-position: -20px -480px;
            }
            &.paste {
                background-position: -40px -480px;
            }
            &.paste_p {
                background-position: -40px -540px;
            }
            &.ico_front {
                background-position: -40px -400px;
            }
            &.ico_back {
                background-position: 0px -420px;
            }
            &.ico_preview {
                background-position: 0px -560px;
            }
            &.ico_next {
                background-position: -20px -560px;
            }
            &.ico_lock {
                background-position: -40px -140px;
            }
            &.ico_unlock {
                background-position: -40px -120px;
            }
            &.remove {
                background-position: 0px -500px;
            }
            &.edittext {
                background-position: 0px -540px;
            }
            &.link {
                background-position: -20px -420px;
            }
            &.ico_AlignUp {
                background-position: 0px -640px;
            }
            &.ico_AlignDown {
                background-position: -20px -640px;
            }
            &.ico_AlignLeft {
                background-position: 0px -660px;
            }
            &.ico_AlignRight {
                background-position: -20px -660px;
            }
            &.ico_HorizontalDis {
                background-position: -40px -660px;
            }
            &.ico_VerticalDis {
                background-position: -40px -640px;
            }
            &.templateSwitch {
                background-position: 0px -680px;
            }
            &.formatPainter {
                background-position: 0px -680px;
            }
            &.formatPainter_copy {
                background-position: 0px -680px;
            }
            &.formatPainter_paste {
                background-position: 0px -680px;
            }
        }

        .menu-item-next {
            background: url('../../../assets/img/layout/editor.png') no-repeat;
            position: absolute;
            top: 3px;
            right: 5px;
            height: 20px;
            width: 15px;
            background-position: -48px -40px;
        }

        .extend {
            position: absolute;
            right: 10px;
            top: 0px;
            color: #777;
            text-align: right;
        }
        &:hover {
            background-color: #eee;
        }

        &.disabled {
            color: #ccc;
            cursor: default;
            .extend {
                color: #ccc;
            }
            &:hover {
                color: #ccc;
                background-color: transparent;
                background-image: none;
                filter: none;
                text-shadow: none;
            }
        }
        &.separate {
            height: 0px;
            border-top: #ccc solid 1px;
            margin: 4px 0;
        }
    }
    li.context-menu-selected {
        background-color: rgb(202, 212, 245);
    }
}
</style>
