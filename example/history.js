/*
 * @Description: 图表操作历史记录
 * @Author: 杜聪聪
 */
import _ from 'lodash';

const history = {
    namespaced: true,
    state: {
        snapshoots: [], // 保存图表操作的快照列表
        cursor: -1, // 指向图表数组的指针，通过移动指针进行撤销和回退的操作

        /**
         * 标记当前快照是否是存在于快照列表。由于'撤销'和'恢复'操作都会引起Record操作，
         * 因此在Undo和Redo的时候不应该被记录。
         * */
        isHistory: false,

        maxSnapshootCount: 30 // 快照列表中存储的最大快照数量
    },
    mutations: {
        distoryHistory(state) {
            state.snapshoots = [];
            state.cursor = -1;
        }
    },

    actions: {
        /**
         * 初始化快照列表
         */
        InitHistory({ state, rootState }) {
            state.snapshoots = [];
            state.cursor = -1;
            const editDashboard = _.cloneDeep(rootState.dashboard.editDashboard);
            state.snapshoots.push(editDashboard);
            // 每次记录快照，指针都应该指向最新快照
            state.cursor = state.snapshoots.length - 1;
        },
        /**
         * 把当前editDashBoard的快照存放到snapshoots中。
         * (当editDashboard发生改变的时候，会触发当前action)
         */
        Record({ state, rootState }) {
            if (state.isHistory) {
                state.isHistory = false;
                return;
            }

            const editDashboard = _.cloneDeep(rootState.dashboard.editDashboard);
            // 如果指针没有指向最新的快照的时候，后面的历史记录都应当被销毁掉
            while (state.cursor < state.snapshoots.length - 1) {
                state.snapshoots.pop();
            }

            if (state.snapshoots.length >= state.maxSnapshootCount) {
                state.snapshoots.shift();
            }
            state.snapshoots.push(editDashboard);
            // 每次记录快照都指针都应该指向最新快照
            state.cursor = state.snapshoots.length - 1;
        },

        /**
         * 撤销
         */
        Undo({ state, rootState, commit }) {
            if (state.cursor > 0) {
                state.cursor -= 1;
                const snapshoot = _.cloneDeep(state.snapshoots[state.cursor]);

                // 标记当前快照已经存在于快照列表中
                state.isHistory = true;

                const boardIndex = rootState.dashboard.list.findIndex(board => board.id === snapshoot.id);
                if (boardIndex > -1) {
                    rootState.dashboard.list.splice(boardIndex, 1, snapshoot);
                }
                snapshoot.updateDate = rootState.dashboard.editDashboard.updateDate;
                commit('dashboard/SET_EDIT_DASHBOARD', snapshoot, { root: true });
            }
        },

        /**
         * 恢复（重做）
         */
        Redo({ state, rootState, commit }) {
            if (state.cursor < state.snapshoots.length - 1) {
                state.cursor += 1;
                const snapshoot = _.cloneDeep(state.snapshoots[state.cursor]);

                // 标记当前快照已经存在于快照列表中
                state.isHistory = true;

                const boardIndex = rootState.dashboard.list.findIndex(board => board.id === snapshoot.id);
                if (boardIndex > -1) {
                    rootState.dashboard.list.splice(boardIndex, 1, snapshoot);
                }

                snapshoot.updateDate = rootState.dashboard.editDashboard.updateDate;
                commit('dashboard/SET_EDIT_DASHBOARD', snapshoot, { root: true });
            }
        }
    },
    getters: {
        canUndo(state) {
            return state.cursor > 0;
        },
        canRedo(state) {
            return state.cursor < state.snapshoots.length - 1;
        }
    }
};

export default history;
