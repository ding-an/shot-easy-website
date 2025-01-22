import { createPortal } from 'react-dom'



interface LoadingProps {
  content?: string
}

const Loading = ({ content }: LoadingProps) => {

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#000c]">
      <div className="flex h-full w-full flex-col items-center justify-center text-white">
        <img src="/images/loading.svg" width={80} height={80} />
        <div className="mt-2 text-base text-white">{content || 'Processing...'}</div>
      </div>
    </div>,
    document.body
  )
}

export default Loading
