import moment from 'moment';
import { $axios } from '@/api/common';

export const dealWithScheduleCourse = (availableTimeArr, plannedTimeArr, dateIndex, timePointIndex) => {
  const beforeHalfHouer = {
    planned: plannedTimeArr[dateIndex].dailyArr[timePointIndex - 1],
    available: availableTimeArr[dateIndex].dailyArr[timePointIndex - 1],
  },
    afterHalfHouer = {
      planned: plannedTimeArr[dateIndex].dailyArr[timePointIndex + 1],
      available: availableTimeArr[dateIndex].dailyArr[timePointIndex + 1],
    },
    date = plannedTimeArr[dateIndex].date;

  if (timePointIndex % 2 === 0 && afterHalfHouer.available && !afterHalfHouer.planned) {
    // 如果在整点的时候点击的话
    // 检测下半小时有空闲
    return {
      start: moment(date)
        .add(timePointIndex * 30, 'minutes')
        .format('HH:mm'),
      end: moment(date)
        .add((timePointIndex + 2) * 30, 'minutes')
        .format('HH:mm'),
      startPoint: timePointIndex,
      endPoint: timePointIndex + 1,
    };
  } else if (
    timePointIndex % 2 === 1 &&
    beforeHalfHouer.available &&
    !beforeHalfHouer.planned
  ) {
    // 在半点的时候点击，且前半小时有空闲
    return {
      start: moment(date)
        .add((timePointIndex - 1) * 30, 'minutes')
        .format('HH:mm'),
      end: moment(date)
        .add((timePointIndex - 1 + 2) * 30, 'minutes')
        .format('HH:mm'),
      startPoint: timePointIndex - 1,
      endPoint: timePointIndex,
    };
  } else if (
    timePointIndex % 2 === 1 &&
    afterHalfHouer.available &&
    !afterHalfHouer.planned
  ) {
    // 半小时的时候点的，但是前半小时没有空闲，后半小时有空闲
    return {
      start: moment(date)
        .add(timePointIndex * 30, 'minutes')
        .format('HH:mm'),
      end: moment(date)
        .add((timePointIndex + 2) * 30, 'minutes')
        .format('HH:mm'),
      startPoint: timePointIndex,
      endPoint: timePointIndex + 1,
    };
  }
  // 前后半小时都没有空闲
  return {
    start: moment(date)
      .add(timePointIndex * 30, 'minutes')
      .format('HH:mm'),
    end: moment(date)
      .add((timePointIndex + 1) * 30, 'minutes')
      .format('HH:mm'),
    startPoint: timePointIndex,
    endPoint: timePointIndex,
  };
};

export const getAvailableTimeGrids = async ({template_number, tr_id}) => {
  const res = await $axios.post('/php/teacher/getAvailableTimeGrids', { template_number, tr_id })
  const {data: {data}={}} = res
  const weeks =['MON','TUE','WED','THU','FRI','SAT','SUN',]
  const arr = [
    // [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    // [6, 7, 8, 10, 11, 12, 13, 14, 15, 16,18, 19, 20]
    [],[],[],[],[],[],[],
  ]
  data.map((i)=> {
    if (i.is_available !== 0) {
      // arr[i.weekday - 1] = []
      arr[i.weekday - 1].push(+i.start_time.split(':')[0])
    }
  })
  const timeArrReturn = arr.map((t, index)=> {
    let arrSort = t.sort(function sortNum(a, b) {return a - b;})
    let timeArr = []
    for (let index = 0; index < arrSort.length; index++) {
      if (arrSort[index + 1] - arrSort[index] > 1) {
        timeArr.push(arrSort[index] + 1);
        timeArr.push(arrSort[index + 1]);
      } else if (index === 0) {
        timeArr.push(arrSort[index])
      } else if (index === arrSort.length - 1) {
        timeArr.push(arrSort[index] + 1)
      } else if (arrSort[index + 1] - arrSort[index] === 1) {
        // console.log('1')
      } else if (arrSort[index + 1] - arrSort[index] < 1) {
        // console.log('有误')
      } 
    }
    const availableTime = []
    for (let index = 0; index < timeArr.length; index += 2) {
      availableTime.push({
        start_time: timeArr[index] + ':00',
        end_time: timeArr[index + 1] + ':00'
      })
    }
    return {
      weekday: weeks[index],
      'available_time': availableTime
    }
  })
// console.log('timeArrReturn', JSON.stringify(timeArrReturn))
  return timeArrReturn;
}