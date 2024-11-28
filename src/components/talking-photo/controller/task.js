import { get, post } from "@utils/request";


// 获取进行中的任务
export async function getProcessingTask(taskId) {
  const res = await get('/users/me/tasks/processing', { taskIds: [taskId] })
  return res.data
}


// 查询指定任务
export const getTaskDetails = async (taskId) => {
  const res = await get(`/users/me/tasks/${taskId}`)
  return res.data
}

// 重新发起任务
export async function recreateTask(taskId) {
  const json = await post(`/users/me/tasks/${taskId}/recreate`)
  return json.data
}
