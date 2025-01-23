import copy from 'copy-to-clipboard'

import { btn } from './style'


const ResultModal = ({ code, onClose }) => {
  const copyToClipboard = () => {
    copy(code)
    alert('Copied')
  }
  return (
    <div className="modal-center modal modal-open bg-black/60">
      <div className="modal-box relative rounded-2.5xl bg-[#323f52] py-8 px-5 text-center leading-none xl:max-w-[400px] xl:p-10">
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-12 w-12 xl:h-16 xl:w-16"
        >
          <g fill="none" fillRule="evenodd">
            <circle fill="#30A46C" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 32 8 8 16-16"
            />
          </g>
        </svg>
        <div className="mt-4 text-[17px] font-semibold text-white xl:mt-6 xl:text-xl">
          Payment succesful!
        </div>
        {code && (
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/60 xl:mt-4 xl:text-xl">
            Promo Code: {code}<svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              onClick={copyToClipboard} className="cursor-pointer"
            >
              <path
                d="M11 2a2 2 0 0 1 1.998 1.9L13 4v6a2 2 0 0 1-1.9 1.998L11 12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2 2 2 0 0 1 1.9-1.998L7 2h4zM9 5H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm2-2H7a1 1 0 0 0-.997.925L6 4h3a2 2 0 0 1 2 2v5a1 1 0 0 0 .997-.925L12 10V4a1 1 0 0 0-.925-.997L11 3z"
                fill="#FFF"
                fill-rule="nonzero"
                fill-opacity=".88"
              />
            </svg>
          </div>
        )}
        <div className="modal-action mt-5 xl:mt-8">
          <button className={`${btn} !h-12 w-full !leading-12 text-white`} onClick={onClose}>
            Got It
          </button>
        </div>
        <label className="btn btn-circle btn-sm absolute right-2 top-2" onClick={onClose}>
          ✕
        </label>
      </div>
    </div>
  )
}

export default ResultModal
