import { useRef } from 'react'
import { useMount, useUnmount, useMemoizedFn } from 'ahooks'

import { getTalkingPhotoSettings, createTalkingPhotoTask } from './controller'
import { getProcessingTask, getTaskDetails } from './controller/task'
import { TaskStatus } from './controller/enums'
import { getWindowLocation, redirectTo } from './utils/route'
import handleUpload from './utils/upload'
import useMultipartUpload from './useMultipartUpload'
import { tryCatch } from './utils/media'
import { transVideoToAudio } from './utils/upload/transform'
import { AudioContentFrom } from './controller/enums'
import { useStore } from './store'

const useHandlers = () => {
  const isLoggedIn = !!localStorage.getItem('user')
  const { contentFrom, setSettings, resetStore, setState } = useStore((state) => ({
    contentFrom: state.contentFrom,
    setSettings: state.setSettings,
    resetStore: state.resetStore,
    setState: state.setState,
    setTaskDetail: state.setTaskDetail
  }))
  const { handleUpload: handleMultipartUpload } = useMultipartUpload('TALKING_PHOTO')

  const timer = useRef(null)

  // 创建任务
  const create = useMemoizedFn(async (values) => {
    try {
      if (!isLoggedIn) {
        const { pathname } = await getWindowLocation()
        redirectTo(`/login?from=${pathname}`)
        return
      }
      setState('generating', true)

      // 上传图片
      const { fileId } = await handleUpload(values.imageFile.file, 'TALKING_PHOTO', {
        isCompress: false
      })

      const params = {
        imageFileId: fileId,
      }

      // 如果内容来源是音频，则删除 content 字段
      if (contentFrom === AudioContentFrom.AUDIO) {
        // 如果上传的是视频，则转换为音频
        if (values.voiceFile.file.type.includes('video')) {
          values.voiceFile.file = await transVideoToAudio(values.voiceFile.file)
        }

        // 上传音频
        const { data, error } = await tryCatch(handleMultipartUpload(values.voiceFile.file))
        if (error) {
          throw new Error(error.message)
        }
        params.voiceFileId = data.fileId
      } else {
        params.content = values.content
        params.voiceId = values.voice.id
      }

      const res = await createTalkingPhotoTask(params)
      getTaskStatus(res.taskId)
    } catch (err) {
      setState('generating', false)
      alert(err.message)
    }
  })

  // 获取任务状态
  const getTaskStatus = useMemoizedFn(async (taskId) => {
    try {
      const res = await getProcessingTask(taskId)
      const task = res[0]
      if (task.status === TaskStatus.CREATING) {
        timer.current = setTimeout(() => getTaskStatus(taskId), 2000)
        return
      } else if (task.status === TaskStatus.SUCCEED) {
        // 设置任务详情
        const res = await getTaskDetails(taskId)
        setState('generating', false)
        setTaskDetail(res)
      } else {
        setState('generating', false)
        alert('Failed to generate audio')
      }
    } catch (err) {
      setState('generating', false) 
      alert(err.message)
    }
  })

  useMount(async () => {
    try {
      const res = await getTalkingPhotoSettings()
      setSettings(res)
    } catch (err) {
      console.log(err.message)
    }
  })

  useUnmount(() => {
resetStore()
    // 清除定时器
    if (timer.current) {
      clearTimeout(timer.current)
    }
  })

  return {
    create,
  }

}

export default useHandlers
