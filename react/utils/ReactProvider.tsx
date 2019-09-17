/* eslint-disable no-console */
import React from 'react'

import addons from '@storybook/addons'
import createChannel from '@storybook/channel-postmessage'
import Channel from '@storybook/channels'
import { Provider } from '@storybook/ui'
import Preview from './ReactPreview'

// addons registry
// import './addons'

export default class ReactProvider extends Provider {
  public channel: Channel
  public state: any

  public constructor() {
    super()
    const ch = createChannel({ page: 'manager' })
    addons.setChannel(ch)
    this.channel = addons.getChannel()
    this.state = {}
  }

  public getElements(type: any) {
    // still don't know what this is for...
    console.log('getElements: ', type)
    return addons.getElements(type)
    // if (type === 'panel') {
    //   return addons.getElements(type)
    // }
    // return {}
  }

  public renderPreview(story: string) {
    return <Preview storyID={story} />
  }

  public handleAPI(api: any) {
    console.log('initiating handler API... ', api)

    // define stuff in window so i can play with it
    window.sbAPI = api
    window.addons = addons
  }
}
