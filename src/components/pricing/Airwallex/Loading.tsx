import { createPortal } from 'react-dom'

const Loading = () => {
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-[#000c]">
      <div className="flex h-full w-full flex-col items-center justify-center text-white">
        <img src="/images/loading.svg" width={80} height={80} />
        <div className="mt-2 text-base text-white">Processing...</div>
      </div>
    </div>,
    document.body
  )
}

export default Loading
