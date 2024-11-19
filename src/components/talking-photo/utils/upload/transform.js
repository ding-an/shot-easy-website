import {fetchFile , toBlobURL} from '@ffmpeg/util'
import { CDN_HOST } from '../../controller/enums'

// 视频转音频
export const transVideoToAudio = async (file) => {
  const load = async () => {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg')
    const ffmpeg = new FFmpeg()
    await ffmpeg.load({
      coreURL: await toBlobURL(`${CDN_HOST}/js/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${CDN_HOST}/js/ffmpeg-core.wasm`, 'application/wasm')
    })
    return ffmpeg
  }
  try {
    if (typeof window === 'undefined')
      throw new Error('FFmpeg can only be used in a browser environment.')
    const ffmpeg = await load()
    // const uint8Array = await readFileAsArrayBuffer(file)
    // 将视频文件写入缓存
    await ffmpeg.writeFile(file.name, await fetchFile(file))

    // 执行FFmpeg命令，转换视频为音频
    await ffmpeg.exec([
      '-i',
      file.name,
      '-vn',
      '-ar',
      '44100',
      '-ac',
      '2',
      '-b:a',
      '192k',
      'output.mp3'
    ])

    // 读取输出文件
    const data = await ffmpeg.readFile('output.mp3')
    const audio = new File([data.buffer], file.name + '.mp3', { type: 'audio/mp3' })
    return audio
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
