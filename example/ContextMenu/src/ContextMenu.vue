<template>
    <div class="context-menu" v-show="showMenu" @mouseenter.stop="handleMouseEnter" :style="contextPos">
        <menu-list ref="menuRef" :container="menuContainer" :menus="menus" :evt="evt" :context="context"></menu-list>
    </div>
</template>

<script>
import MenuList from './MenuList';
import Vue from 'vue';

export default {
    name: 'ContextMenu',
    components: {
        MenuList,
    },
    provide() {
        return {
            eventBus: this.eventBus,
        };
    },
    props: {
        menus: {
            type: Array,
            default: function () {
                return [];
            },
        },
        visiable: {
            type: Boolean,
            default: false,
        },
        evt: {
            type: MouseEvent,
        },
        container: [String | Object],
        scale: {
            type: Number,
            default() {
                return 1;
            },
        },
    },
    data() {
        return {
            eventBus: new Vue(),
            context: null,
            showMenu: false,
            /**
             * 承载菜单的容器
             */
            menuContainer: null,

            top: 0,
            left: 0,
        };
    },
    computed: {
        contextPos() {
            return { top: this.top / this.scale + 'px', left: this.left / this.scale + 'px' };
        },
    },
    watch: {
        visiable(newVal) {
            this.showMenu = newVal;
        },
        evt(evt) {
            this.context = evt?.context;
            this.showMenu = true;
            this.$nextTick(() => {
                this.initConstData();
                const parentDom = this.$el.parentNode;
                const parentRect = parentDom.getBoundingClientRect();

                this.left = evt.pageX + parentDom.scrollLeft - parentRect.x;
                this.top = evt.pageY + parentDom.scrollTop - parentRect.y;

                this.$el.dispatchEvent(new MouseEvent('mouseenter'));
            });
        },
    },
    created() {
        this.eventBus.$on('closeMenu', this.closeMenu);
    },
    mounted() {
        this.initConstData();
        window.addEventListener('click', this.closeMenu);
    },
    beforeDestroy() {
        this.eventBus.$off('closeMenu', this.closeMenu);
        window.removeEventListener('click', this.closeMenu);
    },
    methods: {
        initConstData() {
            if (this.container) {
                let targetEl = this.container;
                if (typeof this.container === 'string') {
                    targetEl = document.querySelector(this.container);
                }
                this.menuContainer = targetEl;
            } else {
                this.menuContainer = this.$el.parentNode?.offsetParent;
            }
        },
        closeMenu() {
            this.showMenu = false;
        },
        handleMouseEnter(event) {
            this.$refs.menuRef.show(event);
        },
    },
};
</script>

<style lang="scss" scoped>
.context-menu {
    position: absolute;
}
</style>
