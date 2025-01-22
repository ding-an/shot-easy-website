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
            Promo Code: {code} <img src="/public/images/copy.svg" onClick={copyToClipboard} className="cursor-pointer" />
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
