<!--
 * @Author: DuCongcong
 * @Description: 当前配置的数据源下的所有表的列表
 * @Date: 2020-10-27 11:33:52
 * @LastEditTime: 2021-02-01 12:20:10
-->
<template>
    <div class="table-list">
        <div class="loading" v-if="loading">
            <a-spin />
        </div>
        <div class="data">
            <a-input-search @change="search" allow-clear v-model="keyword" placeholder="输入表名" />
            <div id="tableContainer" ref="scrollRef" @scroll="handleScroll" class="data-list">
                <a-collapse v-if="data && data.length > 0" @change="handleTableSelct" accordion>
                    <a-collapse-panel
                        class="data-list-item"
                        v-for="item in data"
                        :key="item.tableName"
                        @dragstart.native="handleDragstart($event, item)"
                        @drag.native="handleDrag"
                        @dragend.native="handleDragEnd($event, item)"
                        draggable
                    >
                        <template slot="header" ref="dragTableRef">
                            <svg-icon :style="{ color: '#25792c', position: 'absolute', 'font-size': '20px', left: '13px' }" icon-class="table"></svg-icon>
                            <div class="table-name" :title="item.tableName">{{ item.tableName }}</div>
                            <div class="table-des" :title="item.tableDes">{{ item.tableDes }}</div>
                        </template>
                        <div class="field-loading" v-if="item.loading">
                            <a-spin />
                        </div>
                        <div class="field-item" v-for="(filed, flag) in item.tableFiled" :key="flag">
                            <span class="field-item__name" :title="filed.remark + '(' + filed.name + ')'">
                                <svg-icon :icon-class="fieldIconMap[filed.type]"></svg-icon>
                                {{ filed.remark }} ({{ filed.name }})
                            </span>
                        </div>
                    </a-collapse-panel>
                </a-collapse>
            </div>
        </div>

        <div class="drag" ref="dragTableRef" v-show="isDrag">{{ dragItem }}</div>
    </div>
</template>

<script>
import api from '@/api/dsConsole';
import * as icons from '@/utils/icons';
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'tableList',
    props: {
        graph: [Object, String]
    },
    data() {
        return {
            loading: false,
            fieldIconMap: icons.datasetIcon.metadata,

            page: {
                size: 20,
                index: 0,
                cache: 2 // data中最多缓存两页
            },

            keyword: '',
            tableList: [],
            dataPool: [],
            data: [],

            dragItem: '',
            isDrag: false,
            clientY: 0,
            clientX: 0
        };
    },
    computed: {
        ...mapState({
            editDataset: state => state['data/dataset'].editDataset
        }),
        ...mapGetters({
            getDatasourceBy: 'datasource/getDatasourceBy'
        })
    },
    watch: {
        editDataset: {
            immediate: true,
            deep: true,
            handler() {
                this.getTableList();
            }
        }
    },
    mounted() {},
    methods: {
        /**
         * @description: 获取当前数据源下的所有表信息
         */
        getTableList() {
            this.tableList = [];
            if (!this.editDataset.datasourceId) {
                return;
            }
            this.loading = true;
            this.$store.dispatch('datasource/generateDatasourceList').then(() => {
                const datasource = this.getDatasourceBy(this.editDataset.datasourceId);
                if (!datasource?.signId) {
                    this.loading = false;
                    return;
                }
                api.getTableList(datasource.signId)
                    .then(res => {
                        let data = res.data.rst;
                        if (Array.isArray(data) && data.length > 0) {
                            this.tableList = data.map(item => {
                                let obj = {
                                    tableName: item.first,
                                    tableDes: item.second ?? '',
                                    tableFiled: [],
                                    loading: true
                                };
                                return obj;
                            });
                        }
                        this.search();
                        this.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            });
        },

        search(value) {
            this.resetPage();

            // 根据关键字从modelList过滤出来的数据作为数据池
            if (value) {
                this.data = [];
                this.loading = true;

                new Promise(resolve => {
                    const result = this.tableList.filter(item => item.tableName.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1);
                    resolve(result);
                }).then(res => {
                    this.dataPool = res;
                    this.nextPage();
                    this.loading = false;
                });
                // 将modelList直接作为数据池
            } else {
                this.data = [];
                this.dataPool = this.tableList;
                this.nextPage();
            }
        },

        handleScroll: _.throttle(function(e) {
            const dom = e.target;
            const c = dom.scrollHeight - dom.scrollTop <= dom.clientHeight;
            if (c) {
                this.nextPage();
            } else if (dom.scrollTop <= 0) {
                this.upperPage();
            }
        }, 300),

        nextPage() {
            const begin = this.page.size * this.page.index;
            // 没有更多数据了
            if (begin > this.dataPool.length) {
                return;
            }
            const end = begin + this.page.size;
            const pageData = this.dataPool.slice(begin, end);
            this.data = this.data.concat(pageData);
            this.page.index += 1;

            const cacheCount = this.page.size * this.page.cache;
            // 数据长度超过设置的缓存页数才丢弃缓存中的第一个数据
            if (this.data.length > cacheCount) {
                this.data.splice(0, this.page.size);
                this.$nextTick(() => {
                    const dom = document.getElementById('tableContainer');
                    dom.scrollTo(0, dom.scrollTop - 47 * pageData.length);
                });
            }
        },

        upperPage() {
            // 如果当前页序号减去缓存的页数的号等于或者小于起始页，说明前面没有数据了
            if (this.page.index <= this.page.cache) {
                return;
            }
            this.page.index -= this.page.cache;
            const end = this.page.size * this.page.index;
            const begin = end - this.page.size;
            const pageData = this.dataPool.slice(begin, end);
            this.data = pageData.concat(this.data);

            const cacheCount = this.page.size * this.page.cache;
            // 数据长度超过设置的缓存页数才丢弃缓存中的最后一页数据
            if (this.data.length > cacheCount) {
                this.data.splice(this.data.length - pageData.length, this.data.length);
                this.$nextTick(() => {
                    const dom = document.getElementById('tableContainer');
                    dom.scrollTo(0, dom.scrollTop + 47 * pageData.length);
                });
            }
        },

        resetPage() {
            this.page.index = 0;
            this.page.size = 20;
        },

        /**
         * @description: 获取表中的所有字段
         */
        handleTableSelct(tableName) {
            if (tableName === undefined) {
                return;
            }

            const modelData = this.tableList.find(item => item.tableName === tableName);
            this.getTableData(tableName)
                .then(data => {
                    if (modelData) {
                        modelData.tableFiled = data;
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                })
                .finally(() => {
                    modelData.loading = false;
                });
        },

        getTableData(tableName) {
            const datasource = this.getDatasourceBy(this.editDataset.datasourceId);

            return new Promise((resolve, reject) => {
                api.getColumnList(tableName, datasource.signId)
                    .then(res => {
                        let data = res.data.rst;
                        if (Array.isArray(data) && data.length > 0) {
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        handleDrag(e) {
            const dragTableRef = this.$refs.dragTableRef;
            dragTableRef.style.top = `${e.clientY - this.clientY + e.target.offsetHeight / 2}px`;
            dragTableRef.style.left = `${e.clientX - this.clientX - e.target.offsetWidth / 2}px`;
        },

        async handleDragstart(e, item) {
            if (!this.graph) {
                return;
            }
            const img = new Image();
            e.dataTransfer.setDragImage(img, 10, 10);

            this.dragItem = item.tableName;
            this.isDrag = true;

            const listRect = document.getElementById('tableContainer').getBoundingClientRect();
            this.clientY = listRect.y;
            this.clientX = listRect.x;

            const dragTableRef = this.$refs.dragTableRef;
            dragTableRef.style.top = `${e.clientY - this.clientY + e.target.offsetHeight / 2}px`;
            dragTableRef.style.left = `${e.clientX - this.clientX - e.target.offsetWidth / 2}px`;

            item.isTable = true;
            this.graph.set('modelData', item);

            this.getTableData(item.tableName).then(data => {
                item.tableFiled = data;
            });
        },

        handleDragEnd() {
            if (this.graph) {
                this.graph.set('modelData', null);
            }
            this.dragItem = '';

            this.isDrag = false;
            const dragTableRef = this.$refs.dragTableRef;
            dragTableRef.style.top = '0px';
            dragTableRef.style.left = '0px';
        }
    }
};
</script>

<style lang="scss" scoped>
.table-list {
    height: 100%;
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    .data {
        padding: 8px;
        height: 100%;
        .data-list {
            height: calc(100% - 42px);
            overflow: auto;
            margin-top: 10px;
            .table-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .table-des {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 10px;
                opacity: 0.6;
            }
            .field-loading {
                text-align: center;
            }
            .field-item {
                padding: 5px 0;
                line-height: 20px;
                border-bottom: 1px solid #e8e8e8;
                height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                &:last-child {
                    border-bottom: 0;
                }
                .field-item__name {
                    white-space: nowrap;
                    .svg-icon {
                        color: #25792c;
                        font-size: 20px;
                        left: 20px;
                    }
                }
            }
            .data-list-item {
                cursor: move;
                -moz-user-select: none;
                -webkit-user-select: none;
                position: relative;
            }
        }
    }
    .drag {
        width: 200px;
        height: 38px;
        border: 2px dashed $secondary-color;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.8);
        position: absolute;
        white-space: nowrap;
        background: rgba(255, 255, 255);
        line-height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        pointer-events: none;
    }
}
</style>

<style lang="scss">
.table-list {
    .ant-collapse {
        background: #ffffff;
    }
    .ant-collapse .ant-collapse-item .ant-collapse-header {
        padding: 12px 6px 12px 36px;
        cursor: move;
    }
}
</style>
