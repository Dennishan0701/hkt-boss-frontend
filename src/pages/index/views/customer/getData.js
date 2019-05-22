import { $axios } from '@/api/common';
import { state } from '@/store';
export const getBasicInfo = async (id) => {
  const res = await $axios.post('/api/profile/basic-info', {
    lead_id: id,
  });
  // console.log('res', res);
  if (res.status) return res.data.data;
  return {};
};

export const statisticsInfo = async (id) => {
  const res = await $axios.post('/api/profile/statistics-info', {
    lead_id: id,
  });
  // console.log('res', res);
  if (res.status) return res.data.data;
  return {};
};

export const updateInfo = async (id, type, val) => {
  const obj = {
    lead_id: id,
  };
  obj[type] = val;
  const res = await $axios.post('/api/profile/update-info', obj);
  if (res.status) return true;
  return false;
};

export const iconStatus = async (id) => {
  const res = await $axios.post('/api/profile/tag-status', {
    lead_id: id,
  });
  if (res.status) return res.data.data;
  return false;
};

// 获取字段
export const getFieldOptions = async (field) => {
  // "recommend_type"
  // grade 年级
  let res = [];
  const data = await $axios.post('/api/config/field_options/get', {
    field,
  });
  if (data.status) {
    if (typeof field === 'string') {
      res = data.data.data[field].map(item => {
        const { value, id, key } = item
        return {
          value,
          id,
          key,
        }
      })
    }
    if (Array.isArray(field)) {
      res = data.data.data
    }
  }
  return res;
};

// 停止分配
