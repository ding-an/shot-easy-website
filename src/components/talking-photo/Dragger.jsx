import {useDropzone} from 'react-dropzone'

import { useMemoizedFn } from 'ahooks'

import Playing from './Playing'
import { getWindowLocation, redirectTo } from './utils/route'


const Dragger = ({ onChange, value, icon, btnProps, tips, accept, onClear }) => {
  const isLoggedIn = !!localStorage.getItem('user')
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: 1,
    multiple: false,
    onDrop: (files, fileRejections) => {
      const msg = fileRejections[0]?.errors?.[0]?.message
      if (msg) {
        alert('File type not supported')
        return
      }
      onChange(files[0])
    }
  })

  // 如果未登录，跳转到登录页面
  const onDropClick = useMemoizedFn(async (e) => {
    if (!isLoggedIn) {
      e.stopPropagation()
      const { pathname } = await getWindowLocation()
      redirectTo(`/login?from=${pathname}`)
    }
  })

  const addIcon = (
    <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 16.5L12 8.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12.5L8 12.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const isImage = value?.file?.type.includes('image')

  return (
    <div className="h-full w-full bg-white xl:min-h-[213px]">
      <div
        className={`flex flex-col items-center justify-center gap-y-4 rounded-2xl border border-dashed bg-[#F7F7F7] p-4 xl:cursor-pointer xl:rounded-2.5xl xl:py-12 ${value ? 'border-transparent' : 'border-[#6723FF]'}`}
        {...getRootProps({ onClick: onDropClick })}
      >
        <input {...getInputProps()} />
        {value?.url ? (
          <>
            {isImage && (
              <div className="relative h-14 w-14 rounded-full xl:h-24 xl:w-24">
                <img
                  src={value.url}
                  alt=""
                  className="h-full w-full rounded-full object-cover object-center"
                />
                <div className="absolute bottom-0 right-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-[#6723FF] xl:h-8 xl:w-8">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3 xl:h-4 xl:w-4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5H14L12 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11H2L4 13"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
            {!isImage && (
              <div className="rounded-2xl border border-black/20 bg-white">
                <Playing url={value.url} onClear={onClear} transparent />
              </div>
            )}
          </>
        ) : (
          <>
            <img src={icon} alt="" className="h-12 w-12 xl:h-18 xl:w-18" />
            <button className="btn btn-primary" type="button">
              {addIcon}
              <span>{btnProps?.text}</span>
            </button>
            <div className="text-xs text-black/60">{tips}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dragger
