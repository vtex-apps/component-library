/* eslint-disable no-console */
import React from 'react'
import Preview from './Preview'
import mockStories from '../utils/mockStories'

import addons from '@storybook/addons'
import createChannel from '@storybook/channel-postmessage'
import Channel from '@storybook/channels'
import { Provider } from '@storybook/ui'
import { create } from '@storybook/theming'
import {
  CHANNEL_CREATED,
  GET_CURRENT_STORY,
  SET_CURRENT_STORY,
  GET_STORIES,
  SET_STORIES,
  STORIES_CONFIGURED,
  SELECT_STORY,
  PREVIEW_KEYDOWN,
  STORY_ADDED,
  STORY_CHANGED,
  STORY_UNCHANGED,
  FORCE_RE_RENDER,
  REGISTER_SUBSCRIPTION,
  STORY_INIT,
  STORY_RENDER,
  STORY_RENDERED,
  STORY_MISSING,
  STORY_ERRORED,
  STORY_THREW_EXCEPTION,
} from '@storybook/core-events'

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
    console.log('get Elements ', type)
    return {}
  }

  public renderPreview(story: string) {
    return <Preview story={story} />
  }

  public handleAPI(api: any) {
    console.log('handler API ', api)
    api.setOptions({
      theme: create({
        base: 'dark',
        brandTitle: 'VTEX',
        brandUrl: 'https://vtex.github.io/brand/static/media/logo.2f3fc60b.svg',
        colorPrimary: 'hotpink',
        colorSecondary: 'orangered',
      }),
    })

    api.on(STORY_CHANGED, (kind: any, story: any) => {
      console.log('[STORY CHANGED] - Kind: ', kind, ' story: ', story)
      this.globalState.emit('change', kind, story)
    })

    api.on(SELECT_STORY, (kind: any, story: any) => {
      console.log('[SELECT STORY] - Kind: ', kind, ' story: ', story)
      this.globalState.emit('select', kind, story)
    })

    // api.on(STORY_INIT, (kind: any, story: any) => {
    //   console.log('[STORY INIT] - Kind: ', kind, ' story: ', story)
    //   this.globalState.emit('init', kind, story)
    // })

    mockStories()
  }
}
