const Result = ({
  previewUrl,
  text,
  onSave,
  onTryAgain,
  onClose,
  footer
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/80">
      <div className="mx-auto flex h-full w-[80.2vw] flex-col gap-4 py-6 xl:w-[480px]">
        <div className="relative flex min-h-0 flex-1 flex-col justify-center">
        <video
              src={previewUrl}
              className="max-auto max-h-full rounded-3xl object-contain object-center xl:rounded-4xl"
              role="presentation"
              preload="auto"
              playsInline
              controls
              autoPlay
              controlsList="nodownload"
            />
          <div
            className="absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-full rounded-full bg-white/10 p-1 backdrop-blur-[32px] hover:bg-white/20 active:bg-white/25 xl:h-12 xl:w-12 xl:translate-x-[200%] xl:translate-y-0 xl:cursor-pointer xl:p-3"
            onClick={onClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 16L16 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16L8 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {text && <div className="hidden text-white/60 xl:block xl:text-sm">{text}</div>}
        {footer ? (
          footer
        ) : (
          <div className="flex items-center justify-center gap-x-3">
            <button
              className="btn bg-white text-black hover:bg-white/80 active:bg-white/90"
              onClick={onSave}
            >
              Save
            </button>
            <button className="btn btn-primary" onClick={onTryAgain}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result
