<style lang="less" scoped>

</style>

<template>
    <div class="lead-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/compSetting/org">公司设置</BreadcrumbItem>
                <BreadcrumbItem>公司信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
    </div>
</template>
<script>
  import {isMenu} from '@/api/common';
    export default {
        data() {
            return {
            }
        },
        mounted() {

        },
        methods: {
          isMenu,
        }
    }

</script>
