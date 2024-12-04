import { useRef } from 'react'

const TextArea = ({
  className,
  value,
  onChange,
  placeholder,
  extral,
  maxLength
}) => {
  const textareaRef = useRef(null)
  const length = maxLength || 500

  const onClear = (e) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div
      className={`relative rounded-2xl border border-[#F7F7F7] bg-[#F7F7F7] p-3 pb-12 focus-within:border-[#6723FF] xl:rounded-2.5xl xl:p-4 xl:pb-14 ${className}`}
    >
      <textarea
        ref={textareaRef}
        className="textarea h-full w-full resize-none !border-none bg-transparent p-0 text-sm !outline-none xl:text-base"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={length}
      />
      <div
        className="absolute bottom-0 left-0 right-0 flex h-12 items-center px-3 xl:h-14 xl:px-4"
        onClick={() => {
          textareaRef.current?.focus()
        }}
      >
        <div className="flex-1">{extral}</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-main/40 xl:text-sm">
            {value?.length ?? 0}/{length}
          </div>
          <div
            className="h-6 w-6 rounded-full bg-black/10 hover:bg-black/15 active:bg-black/20 xl:cursor-pointer"
            onClick={onClear}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M10 10L14 14"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 10L10 14"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextArea
