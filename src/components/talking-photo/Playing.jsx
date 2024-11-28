import { useRef, useState } from 'react'

import { getAudioDuration } from './utils/media'

const Playing = ({ url, onClear, transparent = false }) => {
  // 播放状态
  const [playing, setPlaying] = useState(false)
  // 播放进度百分比 0 - 2000
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef()

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <div
      className={`flex items-center gap-2.5 p-3 ${transparent ? '' : 'rounded-3xl bg-[#F7F7F7]'}`}
    >
      {onClear && (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.49313 3.64446L8.5 3.5C8.5 2.67157 9.17157 2 10 2H15C15.7797 2 16.4204 2.59489 16.4931 3.35554L16.5 3.5C16.5 4.32843 17.1716 5 18 5H20.5C21.0523 5 21.5 5.44772 21.5 6C21.5 6.55228 21.0523 7 20.5 7H4.5C3.94772 7 3.5 6.55228 3.5 6C3.5 5.44772 3.94772 5 4.5 5H7C7.7797 5 8.42045 4.40511 8.49313 3.64446ZM5.66561 9H19.3344C19.8867 9 20.3344 9.44772 20.3344 10C20.3344 10.0509 20.3305 10.1017 20.3228 10.1521L18.8914 19.4562C18.6662 20.9197 17.407 22 15.9262 22H9.07376C7.59304 22 6.33379 20.9197 6.10864 19.4562L4.67724 10.1521C4.59326 9.60619 4.96769 9.09561 5.51355 9.01163L5.58936 9.00291L5.66561 9Z"
            fill="black"
            fillOpacity="0.8"
          />
        </svg>
      )}
      <span className="text-sm">{duration}s</span>
      <Progress progress={progress} />
      <div
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-full xl:cursor-pointer"
        onClick={toggle}
      >
        <svg
          height="32"
          width="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={playing ? 'hidden' : 'inline-block'}
        >
          <g fill="none" fillRule="evenodd">
            <circle fillOpacity=".08" fill="#15162E" cx="16" cy="16" r="16" />
            <path
              d="M11 12.495v7.01a3 3 0 0 0 4.622 2.524l5.453-3.505a3 3 0 0 0 0-5.048l-5.453-3.505A3 3 0 0 0 11 12.495z"
              fill="#1E1F22"
            />
          </g>
        </svg>
        <div className={`h-3 w-3 rounded-sm bg-[#15162E] ${playing ? 'inline-block' : 'hidden'}`} />
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 ${
            progress ? 'inline-block' : 'hidden'
          }`}
        >
          <svg height="32" width="32" viewBox="0 0 700 700">
            <circle
              cx="350"
              cy="350"
              r="300"
              fill="none"
              stroke="rgba(30,31,34, 0.12)"
              strokeWidth="60"
              strokeLinecap="round"
            />
            <circle
              className="progress"
              cx="350"
              cy="350"
              r="300"
              fill="none"
              stroke="#4626ff"
              strokeWidth="60"
              strokeLinecap="round"
              strokeDasharray={`${progress},2000`}
              transform="rotate(-90, 350,350)"
            />
          </svg>
        </div>
      </div>
      <audio
        ref={audioRef}
        className="hidden"
        src={url}
        onLoadedMetadata={async (e) => {
          let duration = Math.floor(e.currentTarget.duration)
          if (duration === Infinity) {
            duration = await getAudioDuration(url)
          }
          setDuration(duration)
        }}
        onTimeUpdate={(e) => {
          const percent = (e.currentTarget.currentTime / duration) * 2000
          setProgress(percent)
        }}
        onEnded={() => {
          setPlaying(false)
          setProgress(0)
        }}
      />
    </div>
  )
}

const Progress = ({ progress = 0 }) => {
  return (
    <svg
      width="158"
      height="24"
      viewBox="0 0 158 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const x = i * 6
        let y = 6
        let height = 12

        if (i === 2) {
          y = 5
          height = 14
        }
        if (i === 3) {
          y = 4
          height = 16
        }
        if ([4, 5].includes(i)) {
          y = 2
          height = 20
        }
        if ([6, 7, 8, 9, 10, 11, 12, 13, 14].includes(i)) {
          y = 4
          height = 16
        }
        if ([15, 16, 17, 18].includes(i)) {
          y = 0
          height = 24
        }
        if ([19, 20].includes(i)) {
          y = 2
          height = 20
        }
        if ([21, 22, 23, 24].includes(i)) {
          y = 4
          height = 16
        }
        if ([25, 26].includes(i)) {
          y = 6
          height = 12
        }

        const barProgress = (i / 27) * 2000
        const fill = progress !== 0 && barProgress <= progress ? '#6723FF' : 'black'

        const opacity = progress !== 0 && barProgress <= progress ? 1 : 0.4

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="2"
            height={height}
            rx="1"
            fill={fill}
            fillOpacity={opacity}
          />
        )
      })}
    </svg>
  )
}

export default Playing
