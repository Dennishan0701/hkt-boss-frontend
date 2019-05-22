import { $axios } from '@/api/common'
// import { state } from '@/store';

export const switchingDistributeState = (that, operationType) => {
  if (that.selectionRows.length > 1) {
    that.$Message.warning('一次只能处理一个！')
  } else if (that.selectionRows.length === 1) {
    that.$Modal.confirm({
      title: '请问',
      content: '真的要这样子干吗？',
      onOk: async () => {
        try {
          await $axios.post('/api/users/switchingDistributeState', {
            id: that.selectionRows[0].users_id,
            operation_type: operationType, // 'stop' || 'recovery'
          })
        } catch (error) {
          console.log(error)
        }
      },
    })
  }
}

export const leaveOffice = async that => {
  if (that.selectionRows.length > 1) {
    that.$Message.warning('一次只能处理一个！')
  } else if (that.selectionRows.length === 1) {
    that.$Modal.confirm({
      title: '请问',
      content: '真的要这样子干吗？',
      onOk: async () => {
        try {
        const res = await $axios.post('/api/users/leave-office', {
            user_id: that.selectionRows[0].users_id,
          })
          const {data: {message} = {}} =res;
          that.getTableData()
          that.$Message.info(message)
        } catch (error) {
          console.log('离职交接错误', error)
        }
      },
    })
  }
}

export const changeStudentStatus = async ({ids, student_status}) => {
  let res = false
  try {
    await $axios.post('/api/customers/changeStatus', {
      ids,
      student_status
    }).then(data => {
      if (data.status) {
        res = true
      }
    })
  } catch (error) {
    console.log('error')
  }
  return res
}

export const codeWidthStyle = {
    "basic_info_subject_format": 70,
    "basic_info_province_format": 80,
    "basic_info_city_format": 120,
    "basic_info_county_format": 100,
    "leads_tmk_status_format": 120,
    "leads_lead_quality_format": 120,
    "created_user_name": 120,
    "leads_created_at": 140,
    "leads_distribution_method_format": 100,
    "leads_entry_mode_format": 100,
    "leads_recommend_type_format": 100,
    "leads_referee_type_format": 120,
    "tracking_redundancy_latest_tmk_tracking_remark": 200,
    "distribution_records_created_at": 140,
    "tracking_redundancy_first_cc_tracking_at": 140,
    "tracking_redundancy_latest_connectivity_format": 120,
    "auditor_name": 120,
    "channel_name": 120,
    "orders_actual_amount": 120,
    "orders_audit_at": 160,
    "orders_class_hour_grade_format": 120,
    "orders_created_at": 160,
    "orders_giveaway_class_hour": 120,
    "orders_grade_format": 80,
    "orders_last_payment_at": 140,
    "orders_order_channel_format": 120,
    "orders_order_no": 160,
    "orders_refund_status_format": 120,
    "orders_standard_amount": 120,
    "orders_standard_class_hour": 120,
    "orders_subject_format": 80,
    "orders_submitter_format": 120,
    "orders_subscription": 120,
    "basic_info_grade_format": 70,
    "basic_info_mobile": 160,
    "basic_info_name": 120,
    "basic_info_textbook_format": 160,
    "cc_name": 120,
    "class_eaches_class_hour_consumption_format": 100,
    "class_eaches_class_planned_start": 180,
    "class_eaches_class_status_format": 120,
    "class_eaches_class_type_format": 120,
    "class_eaches_grade_format": 80,
    "class_eaches_subject_format": 80,
    "cr_name": 120,
    "teacher_name": 120,
    "tmk_name": 120,
}
