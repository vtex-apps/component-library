/* eslint-disable no-console */
import React from 'react'
import addons, { mockChannel } from '@storybook/addons'
import Channel from '@storybook/channels'
import { Provider } from '@storybook/ui'
import { create } from '@storybook/theming/create'
import { configure } from '@storybook/react'
import { dependencies } from '../../manifest.json'

import Button from 'vtex.button/index'
import Stories from 'vtex.button/stories'

export default class ReactProvider extends Provider {
  public channel: Channel
  public state: any

  public constructor() {
    super()
    addons.setChannel(mockChannel())
    this.channel = addons.getChannel()
    this.state = {}
  }

  public getElements(type: any) {
    console.log('get Elements ', type)
    return {}
  }

  public renderPreview() {
    return (
      <>
        <p>This is the Preview and this is button:</p>
        <Button />
      </>
    )
  }

  public handleAPI(api: any) {
    console.log('handler API ', api)
    api.setOptions({
      name: 'VTEX component library',
      showStoriesPanel: true,
      theme: create({ colorPrimary: 'hotpink', colorSecondary: 'orangered' }),
    })
    const apps = Object.keys(dependencies)
    console.log('APPS: ', apps)
    // const Button = require(`${apps[0]}/index`)
    // .then(butt => console.log('THEN BUTT: ', butt))
    // .catch(err => console.log(err))
    console.log('BUTTON: ', Button)
    // const buttonStories = import(`${apps[0]}/stories`)
    //   .then(butt => console.log('THEN BUTT: ', butt))
    //   .catch(err => console.log(err))
    // console.log('Stori: ', buttonStories)
    console.log('STORi ', Stories)
    api.setStories([
      {
        kind: apps[0],
        stories: [],
      },
      // {
      //   kind: 'Test',
      //   stories: [() => <Button />],
      // },
    ])
    // You can use to listen to the story change and update the preview.
    // api.onStory((kind: any, story: any) => {
    //   this.globalState.emit('change', kind, story)
    // })
  }
}
