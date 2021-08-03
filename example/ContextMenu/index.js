import ContextMenu from './src/ContextMenu.vue';

ContextMenu.install = function (Vue) {
    Vue.component(ContextMenu.name, ContextMenu);
};

export default ContextMenu;
