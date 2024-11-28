import { useRef, useState } from 'react'


// 语音选择器
const VoiceSelect = ({ items, value, onChange }) => {
  const audioRef = useRef(null)
  const [isLoading, setIsLoading] = useState({
    status: false,
    id: ''
  })

  return (
    <ul className="flex flex-wrap gap-2 xl:gap-3">
      {items.map((item) => {
        const selected = value?.id === item.id

        const handleClick = () => {
          onChange?.(item)
          const audio = audioRef.current
          if (audio) {
            setIsLoading({
              status: true,
              id: item.id
            })
            audio.src = item.fileUrl
            audio.play()
          }
        }
        return (
          <li
            key={item.id}
            className={`flex h-12 items-center justify-center gap-1 rounded-xl border bg-[#F7F7F7] xl:h-10 xl:w-[calc(50%-6px)] xl:cursor-pointer ${selected ? 'border-[#6723FF]' : 'border-[#F7F7F7]'} w-full`}
            onClick={handleClick}
          >
            {isLoading.status && isLoading.id === item.id && (
              <span className="loading-spinner loading-xs loading" />
            )}
            {item.name}
          </li>
        )
      })}
      <audio
        ref={audioRef}
        className="hidden"
        onLoadedData={() => {
          setIsLoading({
            status: false,
            id: ''
          })
        }}
      />
    </ul>
  )
}

export default VoiceSelect
