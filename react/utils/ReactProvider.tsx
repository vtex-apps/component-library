import React from 'react'
import addons, { mockChannel } from '@storybook/addons'
import Channel from '@storybook/channels'
import { Provider } from '@storybook/ui'

export default class ReactProvider extends Provider {
  public channel: Channel

  public constructor() {
    super()
    addons.setChannel(mockChannel())
    this.channel = addons.getChannel()
  }

  public getElements(type: any) {
    // eslint-disable-next-line no-console
    console.log('get Elements ', type)
    return {}
  }

  public renderPreview() {
    return <>This is the Preview</>
  }

  public handleAPI(api: any) {
    // no need to do anything for now.
    // eslint-disable-next-line no-console
    console.log('handler API ', api)
  }
}
