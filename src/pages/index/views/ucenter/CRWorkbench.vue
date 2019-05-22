<template>
    <div class="workbench-content">
        <!--面包屑-->
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>CR个人工作台</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--头部-->
        <!--<div class="workbench-head">-->
        <!--<div class="workbenchTitle">-->
        <!--<p class="tit">今日名单分配情况</p>-->
        <!--<p class="see7">查看近7日</p>-->
        <!--</div>-->
        <!--<ul class="workbenchData">-->
        <!--<li>-->
        <!--<p class="workDate">-->
        <!--12.07<br>-->
        <!--<span>分配名单数</span>-->
        <!--</p>-->
        <!--<p class="workNum">20000</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p class="workDate">-->
        <!--12.07<br>-->
        <!--<span>分配名单数</span>-->
        <!--</p>-->
        <!--<p class="workNum">788</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p class="workDate">-->
        <!--12.07<br>-->
        <!--<span>分配名单数</span>-->
        <!--</p>-->
        <!--<p class="workNum">40%</p>-->
        <!--</li>-->
        <!--</ul>-->
        <!--<ul class="reminder">-->
        <!--<li>待办提醒</li>-->
        <!--<li>您有3条新名单待跟进，请在2小时内及时拨打！ <span>2018-12-12  15：00</span></li>-->
        <!--<li>1、您有3条新名单待跟进，请在2小时内及时拨打！ <span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">1、您有3条新名单待跟进，请在2小时内及时拨打！<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">1、您有3条新名单待跟进，请在2小时内及时拨打！<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">1、您有3条新名单待跟进，请在2小时内及时拨打！<span>2018-12-12  15：00</span></li>-->
        <!--<li class="hasRead">2、您的保护名单xxx同学还有3天就被收回，请及时跟进!<span>2018-12-12  15：00</span></li>-->
        <!--</ul>-->
        <!--</div>-->
        <div class="workbench-head2">
            <div class="headLeft">
                <img src="../../../../assets/image/head.png" alt="头像">
                <p>梁朝伟</p>
                <p>XXXX战队</p>
            </div>
            <div class="headRight">
                <ul class="workbenchData">
                    <li>
                        <p class="workDate">今日新分配</p>
                        <p class="workNum">20000</p>
                    </li>
                    <li>
                        <p class="workDate">今日新领取</p>
                        <p class="workNum">788</p>
                    </li>
                    <li>
                        <p class="workDate">今日待更进</p>
                        <p class="workNum">40</p>
                    </li>
                    <li>
                        <p class="workDate">将逾期名单</p>
                        <p class="workNum">40</p>
                    </li>
                </ul>
                <p class="stayIn">本周待更进: 1234</p>
            </div>
        </div>

        <!--中部-->
        <div class="workbench-container">
            <!--中部标题-->
            <Tabs type="card" :animated="false" class="tabs" @on-click="changeTab">
                <TabPane name="all" label="首页"></TabPane>
                <TabPane name="aNew" label="今日新名单"></TabPane>
                <TabPane name="tmkForWash" label="今日待跟进"></TabPane>
                <TabPane name="tmkWashed" label="将逾期名单"></TabPane>
                <TabPane name="dataCenter" label="今日已跟进"></TabPane>
            </Tabs>
            <!--中部内容-->
            <div class="workbench-Body">
                <div class="bodyLeft">
                    <div class="bar1">
                        <div class="workbenchTitle">
                            <p class="tit">本月业绩完成情况</p>
                            <button type="button" class="submit">定标</button>
                        </div>
                        <ul class="completStatus">
                            <li>
                                <p class="workDate">12月<span>定标额</span></p>
                                <p class="workNum">业绩<span>20000</span></p>
                                <p class="workNum">人数<span>200</span></p>
                            </li>
                            <li>
                                <p class="workDate">12月<span>已完成</span></p>
                                <p class="workNum">业绩<span>20000</span></p>
                                <p class="workNum">人数<span>200</span></p>
                            </li>
                            <li>
                                <p class="workDate">12月<span>百分比</span></p>
                                <p class="workNum">业绩<span>20000</span></p>
                                <p class="workNum">人数<span>200</span></p>
                            </li>
                        </ul>
                        <div class="workForm">
                            <!--<ul class="formTitle">-->
                            <!--<li :class="{active:titleIndex==0}" @click="formTitle(0)">业绩</li>-->
                            <!--<li :class="{active:titleIndex==1}" @click="formTitle(1)">人数</li>-->
                            <!--</ul>-->
                            <div v-show="titleIndex==0" style="margin-left: 10px">
                                <div id="myChart" :style="{width: '440px', height: '380px'}"></div>
                            </div>
                            <div v-show="titleIndex==1">
                                <!--<div id="myChart2" :style="{width: '620px', height: '420px'}"></div>-->
                            </div>
                        </div>
                    </div>
                    <!--本月业绩报表-->
                    <div class="performance">
                        <p class="tableTitle">本月业绩报表</p>
                        <!--表格内容-->
                        <div class="tableData1">
                            <ul>
                                <li>
                                    <span>成交人数</span><span>3</span>
                                </li>
                                <li>
                                    <span>累计保护名单数</span><span>3</span>
                                </li>
                                <li>
                                    <span>预约试听数</span><span>3000</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span>实收金额</span><span>¥ 25，000</span>
                                </li>
                                <li>
                                    <span>累计跟进学员数</span><span>3</span>
                                </li>
                                <li>
                                    <span>实际试听数</span><span>3000</span>
                                </li>
                            </ul>
                        </div>
                        <ul class="tableData2">
                            <li>
                                <p class="workDate">总转换率</p>
                                <p class="workNum">0.25%</p>
                            </li>
                            <li>
                                <p class="workDate">试听转换率</p>
                                <p class="workNum">30%</p>
                            </li>
                            <li>
                                <p class="workDate">实际试听率</p>
                                <p class="workNum">20%</p>
                            </li>
                        </ul>
                    </div>
                    <!--本月DPS情况-->
                    <div class="DPS">
                        <div id="myChart2" :style="{width: '440px', height: '380px'}"></div>
                    </div>

                    <!--本月团队业绩报表-->
                    <!--<div class="performance tableContent">-->
                    <!--<p class="tableTitle">本月团队业绩报表</p>-->
                    <!--&lt;!&ndash;表格内容&ndash;&gt;-->
                    <!--<Table class="tableData" :columns="tableHeaders" :data="tableList" border></Table>-->
                    <!--</div>-->
                </div>
                <div class="bodyRight">
                    <div class="workbench-top">
                        <p class="rightTitle">去线索池领取优质线索</p>
                        <div class="dataList">
                            <p class="dataTitle">
                                <span>今日新名单</span>
                                <span class="more">更多</span>
                            </p>
                            <div class="data">
                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>
                            </div>
                        </div>
                        <div class="dataList">
                            <p class="dataTitle">
                                <span>今日待更进</span>
                                <span class="more">更多</span>
                            </p>
                            <div class="data">
                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>
                            </div>
                        </div>
                        <div class="dataList">
                            <p class="dataTitle">
                                <span>将逾期名单</span>
                                <span class="more">更多</span>
                            </p>
                            <div class="data">
                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>

                                <ul>
                                    <li>吴彦祖1</li>
                                    <li>1333244421</li>
                                    <li>初一</li>
                                    <li>数学</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="workbench-foot">
                        <div class="achieveHead">
                            <ul class="achieveTitle">
                                <li :class="{active:achieveIndex==0}" @click="achieveTitle(0)">本月</li>
                                <li :class="{active:achieveIndex==1}" @click="achieveTitle(1)">今天</li>
                            </ul>
                            <Select class="role" v-model="role" style="width:60px">
                                <Option :key="0" :value="0">个人</Option>
                                <Option :key="1" :value="1">团队</Option>
                            </Select>
                        </div>
                        <div class="workAchieve">
                            <div class="ranking">
                                <p class="rankTit">个人业绩排行榜</p>
                                <ul class="rankBody">
                                    <li>
                                        <span><img src="../../../../assets/image/n1.png" alt="第1名"></span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span><img src="../../../../assets/image/n2.png" alt="第2名"></span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span><img src="../../../../assets/image/n3.png" alt="第3名"></span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>4、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>5、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>6、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>7、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>8、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>9、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                    <li>
                                        <span>10、</span>
                                        <span>吴彦祖</span>
                                        <span>1，333，000</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!--尾部-->
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import '../../../../assets/css/workbench.less';
</style>
<script>

  export default {
    data() {
      return {
        titleIndex: 0,//点击业绩或者人数按钮
        achieveIndex: 0,//点击本月或者今天按钮
        tableHeaders: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '成交人数',
            key: 'age'
          },
          {
            title: '实收金额',
            key: 'address'
          },
          {
            title: '工作性质',
            key: 'address'
          },
          {
            title: '课时级别',
            key: 'address'
          },
          {
            title: '课时级别',
            key: 'address'
          },
          {
            title: '课时级别',
            key: 'address'
          },
          {
            title: '课时级别',
            key: 'address'
          },
          {
            title: '课时级别',
            key: 'address'
          },
        ],
        tableList: [
          {
            name: 'John Brown',
            age: 18,
            address: '123',
            date: '2016-10-03'
          },
        ],
        chart: null,
        option: {
          title: {
            x: '150',                 // 水平安放位置，默认为左对齐，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'top',
            //textAlign: null
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 标题边框颜色
            borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
            itemGap: 10,               // 主副标题纵向间隔，单位px，默认为10，
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#61B363'          // 主标题文字颜色
            },
            text: ''
          },
          color: ['#61B363'],
          tooltip: {
            trigger: 'axis'
          },
          //图例--折线提示提示
          legend: {
            x: 'center',
            y: '30',
            borderColor: '#6699FF',//边框颜色
            textStyle: {
              color: '#1e90ff'          // 图例文字颜色
            },
            data: ["12月", "第一周", "第二周", "第三周", "第四周"]
          },
          calculable: true,
          xAxis: {
            boundaryGap: false,
            data: ["12月", "第一周", "第二周", "第三周", "第四周"],
            // x轴的字体样式
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ABB2BF',
                fontSize: '12'
              }
            },
            // x轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#CACFDA',
                width: 1,   //这里是坐标轴的宽度,可以去掉
              }
            },
            // 控制网格线是否显示
            splitLine: {
              show: false,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['red']
              }
            },
          },
          yAxis: {
            type: 'value',
            // y轴的字体样式
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ABB2BF',
                fontSize: '12'
              }
            },
            // y轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#CACFDA',
                width: 1,                  //这里是坐标轴的宽度
              }
            },
            // 控制网格线是否显示
            splitLine: {
              show: false,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['red']
              }
            },
          },
          series: [{
            name: '业绩',//系列名称，用于tooltip的显示名称
            type: 'line',//折现图
            label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
              normal: {
                show: true,//是否显示标签
                position: 'right',//标签的位置
                textStyle: { // 默认使用全局文本样式，详见TEXTSTYLE
                  color: '#61B363',
                  fontSize: '12'
                }
              }
            },
            symbol: 'circle',//拐点样式
            symbolSize: 8,//拐点大小
            itemStyle: {//折线拐点标志的样式
              color: "#61B363",//设置折线点颜色
            },
            lineStyle: {
              color: "rgba(97,179,99,0.2)"//折线颜色
            },
            areaStyle: {//区域填充样式
              color: 'rgba(97,179,99,0.1)' //改变区域颜色
            },
            data: [0, 17000, 71000, 102000, 221000]
          }]
        },
        //DPS表格
        option2: {
          backgroundColor: "",//图表背景颜色
          title: {
            x: 'left',// 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right'// ¦ {number}（x坐标，单位px）
            y: 'top',//垂直安放位置
            //textAlign: null // 水平对齐方式，默认根据x设置自动调整
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 标题边框颜色
            borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
            itemGap: 10,               // 主副标题之间的间距，纵向间隔，单位px，默认为10，
            text: '本月DPS情况',
            textStyle: {// 主标题文字颜色
              fontSize: 14,
              fontWeight: 'normal',
              color: '#656E7D'
            },
            subtext: '',//副标题
            subtextStyle: {}//副标题文本样式
          },
          tooltip: {//鼠标事件
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line'   // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {//图例
          //     data: ["2012", "2013", "2014", "2015", "2016", "2017", "成立至今"],
          //     // data:[],
          //     icon: "rect", //设置图例的图形形状，circle为圆，rect为矩形
          //     itemWidth: 15, //图例标记的图形宽度[ default: 25 ]
          //     itemHeight: 15, //图例标记的图形高度。[ default: 14 ]
          //     itemGap: 15, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
          //     // left: 'auto', //图例组件离容器右侧的距离
          //     align: "auto",
          //     bottom: 10,
          //     textStyle: {
          //         fontSize: 12,
          //         color: "#ccc"
          //     }
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',//该轴的类型为值轴
            axisLabel: {// x轴的字体样式
              show: true,
              textStyle: {
                color: '#ABB2BF',
                fontSize: '12'
              }
            },
            axisLine: {// x轴的颜色和宽度
              lineStyle: {
                color: '#CACFDA',
                width: 1,   //这里是坐标轴的宽度,可以去掉
              }
            },
            splitLine: {// 控制网格线是否显示
              show: false,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['red']
              }
            },
          },
          yAxis: {
            type: 'category',//该轴的类型为类目轴( type 可以为value或者category， 即确定该轴为值轴或者类目轴)
            data: ['移交CR', '业绩确认', '业绩提交', '意向付费', '试听', '排课', '沟通中'],
            // y轴的字体样式
            axisLabel: {
              show: true,
              textStyle: {
                color: '#656E7D',
                fontSize: '14'
              }
            },
            // y轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#CACFDA',
                width: 1,                  //这里是坐标轴的宽度
              }
            }
          },
          series: [//系列列表。每个系列通过 type 决定自己的图表类型
            {
              type: 'bar',//柱状图
              label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                show: true,
                position: 'right', //默认自适应，水平布局为'top'，垂直布局为'right'，可选为'inside'|'left'|'right'|'top'|'bottom'
                textStyle: { // 默认使用全局文本样式，详见TEXTSTYLE
                  color: '#ABB2BF',
                  fontSize: '12'
                }
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    // build a color map as your need.
                    var colorList = [
                      '#E5DFFB', '#FFEFD6', '#E7F8FF', '#F2F8E9',
                      '#E5DFFB', '#FFEFD6', '#E7F8FF', '#F2F8E9'
                    ];
                    return colorList[params.dataIndex]
                  },

                }
              },
              barWidth: '12px',//柱状图每个宽度
              // barGap: '20px',            // 柱间距离，默认为柱形宽度的30%，可设固定值
              // barCategoryGap: '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
              data: [320, 302, 301, 334, 390, 330, 320]
            }
          ]
        },
        role: 0,
      }
    },
    computed: {}
    ,
    created() {
    },
    mounted() {
      this.drawLine();
      this.drawLine2();
    },
    methods: {
      changeTab(index) {

      },
      formTitle(val) {//点击业绩或者人数按钮
        this.titleIndex = val;
      },
      achieveTitle(val) {//点击本月或者今天按钮
        this.achieveIndex = val;
      }
      ,
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(
          this.option
        );
      }
      ,
      drawLine2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        // // 绘制图表
        myChart2.setOption(
          this.option2
        );

      }
    }
  }
</script>
