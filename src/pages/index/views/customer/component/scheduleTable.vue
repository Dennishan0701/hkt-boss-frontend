<template>
  <div class='main-table'>
    <div class="main-body">
      <div class="left-title col">
        <div
          class="time-list title-odd-bg"
          v-for="hour in dayList"
          :key="hour"
        >
          <div>{{hour}}</div>
        </div>
      </div>
      <div
        class="right-body col"
        v-for="(item, index) in availableTimeArr"
        :key="`miao${index}`"
      >
        <div class="day-title gap title-odd-bg">
          <div>{{item.weekday}}</div>
        </div>
        <div class="day-title gap title-odd-bg">
          <div>{{plannedTimeArr[index] && plannedTimeArr[index].date}}</div>
        </div>
        <div
          class="time-gap gap"
          :class="`${i && 'time-free' || ''} ${plannedTimeArr[index] && plannedTimeArr[index].dailyArr[itemIndex] && 'time-free-but-palnned' || ''} ${plannedTimeArr[index] && plannedTimeArr[index].dailyArr[itemIndex] === false ? 'free-unplanned-hover' : ''}`"
          v-for="(i, itemIndex) in item.dailyArr"
          v-show="itemIndex >= 12"
          :key="'item' + itemIndex"
          @click="scheduleCourseClick(i, plannedTimeArr[index] && plannedTimeArr[index].dailyArr[itemIndex], plannedTimeArr[index].date, index, itemIndex)"
        >{{plannedTimeArr[index] && plannedTimeArr[index].dailyArr[itemIndex] !== true ? plannedTimeArr[index].dailyArr[itemIndex] : ''}}</div>
          <!-- @mouseover="overStyle(index, itemIndex, i, plannedTimeArr[index] && plannedTimeArr[index].dailyArr[itemIndex])"
          @mouseout="outStyle(index)" -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { dealWithScheduleCourse, getAvailableTimeGrids } from './dealWithScheduleCourse'
export default {
  props: [
    // "propsAvailavleTime",
    "propsPlannedTime",
    "scheduleCourseWithTable",
    "trid"
    ],
  data() {
    return {
      changeToRedPoint: {},
      availableTimeArr: [],
      plannedTimeArr: [],
      dayList: [
        "时间",
        '06:00-07:00',
        '07:00-08:00',
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00',
        '17:00-18:00',
        '18:00-19:00',
        '19:00-20:00',
        '20:00-21:00',
        '21:00-22:00',
        '22:00-23:00',
        '23:00-24:00',
      ],
      propsAvailavleTime: [
        { weekday: 'MON', 'available_time': [] },
        { weekday: 'TUE', 'available_time': [] },
        { weekday: 'WED', 'available_time': [] },
        { weekday: 'THU', 'available_time': [] },
        { weekday: 'FRI', 'available_time': [] },
        { weekday: 'SAT', 'available_time': [] },
        { weekday: 'SUN', 'available_time': [] },
      ],
      // propsPlannedTime:
      //   [
      //     { date: '2019-3-10', 'planned_time': [{ start_time: '1:00', 'end_time': '2:30' }, { start_time: '7:00', 'end_time': '8:30' }, { start_time: '10:00', 'end_time': '12:00' }, { start_time: '20:00', 'end_time': '21:00' }] },
      //     { date: '2019-3-11', 'planned_time': [{ start_time: '9:00', 'end_time': '10:00' }, { start_time: '10:30', 'end_time': '12:30' }] },
      //     { date: '2019-3-12', 'planned_time': [{ start_time: '7:00', 'end_time': '8:00' }] },
      //     { date: '2019-3-13', 'planned_time': [{ start_time: '14:00', 'end_time': '15:30' }, { start_time: '18:00', 'end_time': '19:00' }, { start_time: '21:00', 'end_time': '23:00' }] },
      //     { date: '2019-3-14', 'planned_time': [{ start_time: '12:00', 'end_time': '13:00' }] },
      //     { date: '2019-3-15', 'planned_time': [{ start_time: '14:00', 'end_time': '16:00' }] },
      //     { date: '2019-3-16', 'planned_time': [{ start_time: '14:00', 'end_time': '15:30' }, { start_time: '18:00', 'end_time': '19:00' }, { start_time: '21:00', 'end_time': '23:00' }] }
      //   ]
    }
  },
  methods: {
    availavleTimeArray(propsAvailavleTime) {
      let arr = propsAvailavleTime.map(i => {
        let dailyArr = [];
        dailyArr[47] = null;
        let day = i.available_time.map(t => {
          let start = t.start_time.split(':')[0];
          let end = t.end_time.split(':')[0]
          let duration = end - start;

          for (let index = +start * 2; index < +end * 2; index++) {
            dailyArr[index] = '1';
          }
        }

        )
        return { weekday: i.weekday, dailyArr }
      })
      return arr
    },
    plannedTime(propsPlannedTime) {
      let arr = propsPlannedTime.map(i => {
        let dailyArr = [];
        dailyArr[47] = null;
        let day = i.planned_time.map(t => {
          let zero = moment(`${i.date} 00:00`),
            start = moment(`${i.date} ${t.start_time}`).diff(zero, 'minutes') / 30,
            end = moment(`${i.date} ${t.end_time}`).diff(zero, 'minutes') / 30,
            duration = end - start;
          for (let index = +start; index < +end; index++) {
            dailyArr[index] = true;
          }
          dailyArr[~~(duration / 2) + (duration % 2) + start - 1] = `${t.grade_format || ''} ${t.subject_format || ''} ${t.student_name || ''}`;
        })

        return {
          date: i.date,
          weekday: moment(i.date).day(),
          dailyArr
        }
      });
      let newArr = [];
      arr.map(o => {
        newArr[o.weekday === 0 ? 6 : o.weekday - 1 ] = {
          date: o.date,
          dailyArr: o.dailyArr
        }
      })
      // console.log('newArr', newArr, arr)
      return newArr
    },
    scheduleCourseClick(free, palnned, date, dateIndex, timePoint) {
      const returnObj = dealWithScheduleCourse(this.availableTimeArr, this.plannedTimeArr, dateIndex, timePoint);
      free && !palnned && this.scheduleCourseWithTable(date, returnObj.start, returnObj.end);
    },
    overStyle(dateIndex, timePointIndex, free, palnned) {
      if (free && !palnned) {
        const returnObj = dealWithScheduleCourse(this.availableTimeArr, this.plannedTimeArr, dateIndex, timePointIndex);
        for (let index = returnObj.startPoint; index <= returnObj.endPoint; index++) {
          // this.plannedTimeArr[dateIndex].dailyArr[index] = 'b'
          this.$set(this.plannedTimeArr[dateIndex].dailyArr, index, false)
        }
        this.changeToRedPoint = returnObj;
      } else {
        this.changeToRedPoint = {};
      }

    },
    outStyle(dateIndex) {
      if (this.changeToRedPoint.startPoint) {
        for (let index = this.changeToRedPoint.startPoint; index <= this.changeToRedPoint.endPoint; index++) {
          // this.plannedTimeArr[dateIndex].dailyArr[index] = 'b'
          this.$set(this.plannedTimeArr[dateIndex].dailyArr, index, null)
        }
      }
    }
  },
  watch: {
    "propsPlannedTime": function (value) {
      this.plannedTimeArr = this.plannedTime(value);
    },
    trid: async function (value) {
      // console.log('trid', this.trid )
      // this.trid &&  console.log('await getAvailableTimeGrids();',await getAvailableTimeGrids(this.trid))
      if (this.trid ) this.propsAvailavleTime = await getAvailableTimeGrids(this.trid)
      this.availableTimeArr = this.availavleTimeArray(this.propsAvailavleTime);
    }
  },
  mounted() {
    this.availableTimeArr = this.availavleTimeArray(this.propsAvailavleTime);
    this.plannedTimeArr = this.plannedTime(this.propsPlannedTime);
  }
}
</script>

<style scoped>
.main-table {
  width: 100%;
}
.main-body {
  width: 100%;
  display: flex;
}
.col {
  flex: 1;
  border-left: solid 1px #ecedef;
  border-top: solid 1px #ecedef;
}
.col:nth-child(1) {
  border-left: none;
}
.col:nth-of-type(odd) {
}
.left-title {
  display: flex;
  flex-direction: column;
}
.time-list {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ecedef;
}
.right-body {
  display: flex;
  flex-direction: column;
}
.gap {
  display: flex;
  flex: 1;
  min-height: 20px;
  justify-content: center;
  align-content: center;
}

.gap:nth-of-type(even) {
  /* flex: 1; */
  border-bottom: 1px solid #ecedef;
}
.time-free {
  background-color: #c3e1ef;
  cursor: pointer;
}
.gap.time-free-but-palnned {
  background-color: #f1cae1;
  border-top-color: #f1cae1;
  border-bottom-color: #f1cae1;
  cursor: default;
}
.gap.free-unplanned-hover {
    background-color: #f1cae1;
  border-top-color: #ecedef;
  border-bottom-color: #ecedef;
}
.right-body:nth-child(even) > .day-title {
  background-color: #e2f0f6;
}
.gap.title-odd-bg {
  background-color: #eef6fc;
}
.time-list.title-odd-bg:nth-child(1) {
  background-color: #eef6fc;
}
</style>

