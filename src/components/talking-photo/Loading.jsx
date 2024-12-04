import { createPortal } from 'react-dom'

const Loading = ({ text }) => {
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50">
      <div className="flex h-full w-full items-center justify-center bg-black/80">
        <div className="w-[43%] xl:w-[240px]">
          <div className="aspect-h-1 aspect-w-1 rounded-4xl bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="h-11 w-11 xl:h-12 xl:w-12">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                >
                  <rect
                    x="2"
                    y="2"
                    width="44"
                    height="44"
                    rx="22"
                    stroke="#6723FF"
                    strokeOpacity="0.2"
                    strokeWidth="4"
                  />
                  <path
                    d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2"
                    stroke="#6723FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mt-4 text-base">{text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Loading
