/* eslint-disable no-console */
import React from 'react'

import addons from '@storybook/addons'
import createChannel from '@storybook/channel-postmessage'
import Channel from '@storybook/channels'
import { Provider } from '@storybook/ui'
import Preview from './ReactPreview'
import { CHANNEL_CREATED } from '@storybook/core-events'

// addons registry
// import './addons'

export default class ReactProvider extends Provider {
  public channel: Channel
  public state: any

  public constructor() {
    super()
    const ch = createChannel({ page: 'manager' })
    addons.setChannel(ch)
    ch.emit(CHANNEL_CREATED)
    this.channel = addons.getChannel()
    this.state = {}
  }

  public getElements(type: any) {
    return addons.getElements(type)
  }

  public renderPreview(story: string) {
    return <Preview storyID={story} />
  }

  public handleAPI(api: any) {
    console.log('initiating handler API... ', api)
    addons.loadAddons(api)

    // define stuff in window so i can play with it
    window.sbAPI = api
    window.addons = addons
  }
}
