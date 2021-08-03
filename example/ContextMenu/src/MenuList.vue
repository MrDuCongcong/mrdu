<template>
    <div class="menu-list" :style="contextPos">
        <ul ref="container" class="menu-list-container" @click.stop="() => {}">
            <li
                v-for="(menu, index) in menus"
                v-show="showMenuItem(menu)"
                :key="index"
                :title="!menu.separate ? menu.name : ''"
                @mouseenter="handleMouseenter(menu, $event)"
                @mouseleave="handleMouseleave"
                @mousedown.stop
                @click.stop="handleClick(menu, $event)"
                :class="['list-item', { 'list-item-selected': menu.selected, disabled: disabled(menu), separate: menu.separate }]"
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

                <div v-if="!menu.separate && menu.children && menu.children.length" class="list-item-next"></div>
            </li>
        </ul>
        <menu-list
            ref="menuRef"
            v-if="childMenu.length"
            :menus="childMenu"
            :evt="evt"
            :context="context"
            :container="container"
            @mouse-enter-child="handleMouseEnterChild"
            @mouse-leave-child="handleMouseLeaveChild"
        ></menu-list>
    </div>
</template>

<script>
export default {
    name: 'MenuList',
    inject: ['eventBus'],
    props: {
        menus: {
            type: Array,
            default: function () {
                return [];
            },
        },
        evt: {
            type: MouseEvent,
        },
        context: {
            type: Object,
        },
        container: '',
    },
    data() {
        return {
            top: 0,
            left: 0,

            childMenu: [],
            paddingTop: 0,

            timeout: null,
            hideTimeout: 100,
            showTimeout: 100,
            mouseInChild: false,
        };
    },
    computed: {
        contextPos() {
            return { top: this.top + 'px', left: this.left + 'px' };
        },
    },
    mounted() {
        this.eventBus.$on('closeMenu', this.handleCloseMenu);
        const paddingTop = window.getComputedStyle(this.$refs.container).paddingTop;
        this.paddingTop = parseInt(paddingTop);
    },
    methods: {
        show(evt) {
            this.$nextTick(() => {
                const menuRect = this.$el.getBoundingClientRect();
                const containerRect = this.container.getBoundingClientRect();
                const parentRect = this.$parent.$el.getBoundingClientRect();
                const targetRect = evt.target.getBoundingClientRect();

                let offsetLeft = parentRect.width;
                let offsetTop = targetRect.top - parentRect.top - this.paddingTop;
                if (parentRect.left + parentRect.width + menuRect.width > containerRect.left + containerRect.width) {
                    offsetLeft = -menuRect.width;
                }
                if (parentRect.top + menuRect.height > containerRect.top + containerRect.height) {
                    offsetTop = -menuRect.height - this.paddingTop;
                }

                this.left = offsetLeft;
                this.top = offsetTop;
            });
        },
        showMenuItem(item) {
            return typeof item.show === 'function' ? item.show() : typeof item.show === 'boolean' ? item.show : true;
        },
        disabled(menu) {
            return typeof menu.disabled === 'function' ? menu.disabled(this.context) : typeof menu.disabled === 'boolean' ? menu.disabled : false;
        },
        handleMouseenter(menu, event) {
            event.stopPropagation();
            this.$emit('mouse-enter-child');
            if (menu.children && menu.children.length) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.childMenu = menu.children;
                    this.$nextTick(() => {
                        this.$refs.menuRef.show(event);
                    });
                }, this.showTimeout);
            }
        },
        handleMouseleave() {
            this.$emit('mouse-leave-child');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                if (!this.mouseInChild) this.childMenu = [];
            }, this.hideTimeout);
        },
        handleClick(menu) {
            if (!this.disabled(menu) && !menu.children) {
                if (typeof menu.action == 'function') {
                    menu.action(Object.assign({ e: this.evt }, this.context, menu.context));
                }
                this.eventBus.$emit('closeMenu');
            }
        },
        handleMouseEnterChild() {
            this.mouseInChild = true;
        },
        handleMouseLeaveChild() {
            this.mouseInChild = false;
        },
        handleCloseMenu() {
            this.mouseInChild = false;
            this.childMenu = [];
        },
    },
    beforeDestroy() {
        this.eventBus.$off('closeMenu', this.handleCloseMenu);
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

.menu-list {
    position: absolute;
    z-index: 1000000000;
    .menu-list-container {
        padding: 4px 0px;
        background: #fafafa;
        border-radius: 4px;
        border: 1px solid rgb(180, 180, 180);
        box-shadow: 0 0 6px rgba(141, 141, 141, 0.85);
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
            text-align: left;
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
                &.icon_level {
                    background-position: 0px -725px;
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
                &.icon_align {
                    background-position: -20px -723px;
                }
                &.ico_AlignUp {
                    background-position: 0px -640px;
                }
                &.ico_AlignDown {
                    background-position: -21px -640px;
                }
                &.ico_AlignLeft {
                    background-position: 0px -660px;
                }
                &.ico_AlignRight {
                    background-position: -21px -660px;
                }
                &.ico_vertical-center {
                    background-position: -41px -640px;
                }
                &.ico_horizontal-center {
                    background-position: -40px -660px;
                }
                &.icon_distribute {
                    background-position: -3px -743px;
                }
                &.ico_HorizontalDis {
                    background-position: -40px -703px;
                }
                &.ico_VerticalDis {
                    background-position: -20px -703px;
                }
                &.templateSwitch {
                    background-position: 0px -680px;
                }
                &.formatPainter {
                    background-position: -20px -743px;
                }
                &.formatPainter_copy {
                    background-position: -40px -743px;
                }
                &.formatPainter_paste {
                    background-position: 0px -763px;
                }
                &.icon_size {
                    background-position: -40px -723px;
                }
                &.ico_equal-width {
                    background-position: -40px -680px;
                }
                &.ico_equal-height {
                    background-position: -20px -680px;
                }
                &.ico_equal-size {
                    background-position: -1px -702px;
                }
                &.ico_group {
                    background-position: -21px -763px;
                }
                &.ico_ungroup {
                    background-position: -40px -763px;
                }
                &.icon_show {
                    background-position: -40px -120px;
                }
                &.icon_hidden {
                    background-position: -3px -783px;
                }
            }

            .list-item-next {
                background: url('../../../assets/img/layout/editor.png') no-repeat;
                position: absolute;
                top: 3px;
                right: 5px;
                height: 20px;
                width: 15px;
                background-position: -49px -40px;
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
        li.disabled {
            .editor-icon {
                &.icon_show {
                    background-position: -17px -640px;
                }
                &.icon_hidden {
                    background-position: 0px -640px;
                }
            }
        }
        li.list-item-selected {
            background-color: rgb(202, 212, 245);
        }
    }
}
</style>
