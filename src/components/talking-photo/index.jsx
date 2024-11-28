import { useMemoizedFn } from 'ahooks'

import Form, { FormItem } from './Form'
import TextArea from './TextArea'

import VoiceSelect from './VoiceSelect'
import { AudioContentFrom } from './controller/enums'
import Dragger from './Dragger'
import Preview from './Preview'
import Radio from './Radio'
import { useStore,TalkingPhotoProvider } from './store'
import useHandlers from './useHandlers'

const Page = () => {
  const { formValues, setFormValue, settings, generating, contentFrom, setContentFrom } = useStore()
  const { create } = useHandlers()

  const optional = contentFrom === AudioContentFrom.TEXT ? formValues.content : formValues.voiceFile
  const disabled =
    (contentFrom === AudioContentFrom.TEXT && !formValues.voice) ||
    (contentFrom === AudioContentFrom.AUDIO && !formValues.voiceFile) ||
    !formValues.imageFile ||
    !optional

  const onSubmit = useMemoizedFn(async (e) => {
    e.preventDefault()
    create(formValues)
  })

  return (
    <div className="size-full p-4 xl:p-5">
      <Form onSubmit={onSubmit}>
        <Dragger
          icon="/images/talking-photo/img.png"
          onChange={(file) =>
            setFormValue('imageFile', {
              url: URL.createObjectURL(file),
              file
            })
          }
          value={formValues.imageFile}
          btnProps={{
            text: 'Upload/Drop Image'
          }}
          tips="JPG, PNG, JPEG, WEBP"
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/webp': ['.webp']
          }}
        />
        <FormItem
          label={
            <div className="flex w-full items-center justify-between">
              <span>Audio </span>
              <div className="flex-1 pl-1 text-right">
                <Radio
                  items={[
                    { key: AudioContentFrom.TEXT, label: 'Generate Audio' },
                    { key: AudioContentFrom.AUDIO, label: 'Import Audio' }
                  ]}
                  value={contentFrom}
                  onChange={setContentFrom}
                />
              </div>
            </div>
          }
        >
          {contentFrom === AudioContentFrom.TEXT && (
            <TextArea
              className="h-[140px] xl:h-[168px]"
              value={formValues.content}
              onChange={(v) => setFormValue('content', v)}
              placeholder="Start typing here or paste any text you want to turn it into lifelike speech..."
              maxLength={settings?.contentSize}
            />
          )}
          {contentFrom === AudioContentFrom.AUDIO && (
            <Dragger
              icon="/images/talking-photo/folder.png"
              onChange={(file) =>
                setFormValue('voiceFile', {
                  url: URL.createObjectURL(file),
                  file
                })
              }
              onClear={() => setFormValue('voiceFile', null)}
              value={formValues.voiceFile}
              btnProps={{
                text: 'Upload an audio file'
              }}
              tips="Supported Formats: mp3, wav, mp4; Max: 1 minute or 200MB"
              accept={{
                'audio/mp3': ['.mp3'],
                'audio/wav': ['.wav'],
                'audio/mp4': ['.mp4']
              }}
            />
          )}
        </FormItem>

        {contentFrom === AudioContentFrom.TEXT && (
          <FormItem label="Select a Voice">
            <VoiceSelect
              items={settings?.systemVoiceList || []}
              value={formValues.voice}
              onChange={(v) => setFormValue('voice', v)}
            />
          </FormItem>
        )}
              <button
            type="submit"
            className={`btn btn-primary w-full ${disabled ? 'btn-disabled' : ''}`}
          >
            {generating && <span className="loading loading-spinner loading-sm" />}
            Generate
          </button>
      </Form>
      <Preview />
    </div>
  )
}

export default function() {
  return (
    <TalkingPhotoProvider>
      <Page />
    </TalkingPhotoProvider>
  )
}
