import { useMemoizedFn } from 'ahooks'

import Loading from './Loading'
import Result from './Result'
import { downloadImage } from './utils/download'

import { useStore } from './store'

const Preview = () => {
  const { generating, taskDetail, setTaskDetail } = useStore()

  const handleClose = useMemoizedFn(() => {
    setTaskDetail(null)
  })

  const handleSave = useMemoizedFn((data) => {
    downloadImage(data?.fileInfos[0].fileUrl)
  })

  const handleTryAgain = useMemoizedFn(() => {
    handleClose()
  })

  return (
    <>
      {generating && <Loading text="Generating..." />}
      {taskDetail && (
        <Result
          previewUrl={taskDetail.fileInfos[0]?.fileUrl}
          text={taskDetail.text}
          onSave={() => handleSave(taskDetail)}
          onTryAgain={handleTryAgain}
          onClose={handleClose}
          type={0}
        />
      )}
    </>
  )
}

export default Preview
