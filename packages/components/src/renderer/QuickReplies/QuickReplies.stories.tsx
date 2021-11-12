import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { QuickReplies } from '..'
import { LiteStore } from '../../typings'
import { defaultMessageConfig } from '../../utils'
import Keyboard from '../Keyboard'
import { Button } from './Button'

export default {
  title: 'QuickReplies',
  component: QuickReplies
} as ComponentMeta<typeof QuickReplies>

class ComposerStateManager {
  public locked = false

  public setLocked = () => {
    this.locked = true
  }
}

class BasicLiteStore implements LiteStore {
  public composer = new ComposerStateManager()
}

const Template: ComponentStory<typeof QuickReplies> = (args) => {
  const [shown, setShown] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setShown(true)
    }, 1)
  }, [setShown])
  return (
    <>
      {shown && <QuickReplies {...args} />}
      <Keyboard>
        <textarea placeholder="placeholder composer" disabled={args.config.store?.composer.locked} />
      </Keyboard>
    </>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  text: 'What do you want to do?',
  disableFreeText: false,
  choices: [
    {
      title: 'Play Paintball',
      value: 'PAYLOAD_PLAY_PAINTBALL'
    },
    {
      title: 'Eat Pizza',
      value: 'PAYLOAD_EAT_PIZZA'
    },
    {
      title: 'Upload an image',
      value: 'BOTPRESS.IMAGE_UPLOAD'
    },
    {
      title: 'Upload a file',
      value: 'BOTPRESS.FILE_UPLOAD'
    }
  ],
  config: {
    ...defaultMessageConfig,
    store: new BasicLiteStore(),
    onSendData: async (data) => {
      alert(`onSendData called with: ${JSON.stringify(data)}`)
    },
    onFileUpload: async (label: string, payload: any, file: File) => {
      alert(
        `onFileUpload called with: { label: ${label}, payload: ${JSON.stringify(payload)}, file: <File object name: ${
          file.name
        } size: ${file.size}> }`
      )
    }
  }
}

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const QuickReplyButton = ButtonTemplate.bind({})

QuickReplyButton.args = {
  label: 'click me!',
  payload: 'BUTTON_PAYLOAD',
  onFileUpload: async (label, payload, file) => {
    alert(
      `onFileUpload called with: { label: ${label}, payload: ${JSON.stringify(payload)}, file: <File object name: ${
        file.name
      } size: ${file.size}> }`
    )
  },
  preventDoubleClick: true,
  onButtonClick: (label, payload) => {
    alert(`onButtonClick called with: { label: ${label}, payload: ${payload} }`)
  },
  onUploadError: (error) => {
    alert(`onUploadError called with: ${error}`)
  }
}