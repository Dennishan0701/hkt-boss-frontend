<template>
  <!-- official-class-record aliased OCR -->
  <div class="formalCon official-class-record OCR" style="padding:30px 0px">
    <!-- 正式课记录表格 2019年5月21日新增 -->
    <div class="tableContent">
      <Table
        class="tableData OCR-classPlan__table"
        @on-selection-change="selectChange"
        :columns="officialHeaders"
        :data="officialColnums"
        border
      >
        <!-- 课后反馈 -->
        <template slot-scope="{ row, index }" slot="feedback">
          <Tooltip
            v-if="isNeedTip(row.standard_class_feedback)"
            :content="row.standard_class_feedback"
            max-width="200" placement="left"
          >
            <div class="overline-2">{{ row.standard_class_feedback }}</div>
          </Tooltip>
          <span v-else>{{ row.standard_class_feedback }}</span>
          <!-- <p class="btn4" @click="viewDetails(row, index)">查看详情</p> -->
        </template>
      </Table>
      <!-- 分页 -->
      <Page
        :total="pagination.total"
        show-sizer
        show-elevator
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        show-total
      />
    </div>
    <!-- 课程列表 -->
    <ul class="formalHead" v-if="false">
      <li v-for="(sub, index) in subjects" :key="index"
        :class="{'active': currentSub === index}"
        @click="changeSub(index)"
      >{{ sub.name }}
      </li>
    </ul>
    <!-- 课程计划 -->
    <div class="formalBody archivalInfo" v-if="false">
      <div class="OCR-classPlan">
        <div class="OCR-classPlan__wrapper clearfix">
          <template v-for="(val, key, index) in subjects[currentSub].plan">
            <div class="OCR-classPlan__item" :key="key"
              v-if="key !== 'fill'"
              :class="[`OCR-classPlan__item--${subjects[currentSub].plan.fill.includes(index) ? 'fill' : 'col3'}`]"
            >
              <span class="OCR-classPlan__label">{{ key }}</span>
              <p class="OCR-classPlan__content">{{ val }}</p>
            </div>
          </template>
        </div>
      </div>

      <div class="formalTable module" v-if="false">
        <p class="formalTitle">
          当前授课老师 ：
          <span>{{ currentTeacher }}老师</span>
        </p>
        <div class="OCR-title">
          待上课列表
          <div class="button-wrapper">
            <button
              class="action-button submit"
              type="button"
              @click="adjustClass"
            >课程调整</button>
          </div>
        </div>
        <div class="tableContent">
          <Table
            class="tableData OCR-classPlan__table"
            @on-selection-change="selectChange"
            :columns="subjects[currentSub].pending.headers"
            :data="subjects[currentSub].pending.content"
            border
          >
            <!-- <template slot-scope="{ row, index }" slot="action">
              <p class="btn4" @click="viewDetails(row, index)">查看详情</p>
            </template> -->
          </Table>
          <!-- <Page
            :total="formalTotal"
            show-sizer
            show-elevator
            @on-change="followUpPageChange"
            @on-page-size-change="followUpPageSizeChange"
            show-total
          /> -->
        </div>

        <div class="OCR-title">已上课列表</div>
      </div>
    </div>
    <Modal
      ref="adjust-modal"
      title="课程调整申请"
      class="OCR-modal archivalInfo"
      v-model="adjust.visible"
      :loading="adjust.loading"
      :mask-closable="false"
      @on-ok="confirmAdjust"
      @on-cancel="cancelAdjust"
      hidden
    >
      <Form :label-width="96" class="module">
        <div class="OCR-title">
          学习要求
        </div>
        <FormItem label="年级：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <FormItem label="科目：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <FormItem label="教材版本：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <FormItem label="上课形式：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <FormItem label="上课老师：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <FormItem label="上课形式：" style="width: 216px;">
          <Input v-model="requirements.learning.grade"/>
        </FormItem>
        <div class="OCR-title">
          老师要求
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import './style.less';

import main from './script.js';

export default main;
</script>