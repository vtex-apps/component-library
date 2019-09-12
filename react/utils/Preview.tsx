/* eslint-disable no-console */
import React from 'react'
import {
  GET_CURRENT_STORY,
  SET_CURRENT_STORY,
  GET_STORIES,
  SET_STORIES,
  STORIES_CONFIGURED,
  SELECT_STORY,
  STORY_ADDED,
  STORY_CHANGED,
  FORCE_RE_RENDER,
  REGISTER_SUBSCRIPTION,
  STORY_INIT,
  STORY_RENDER,
  STORY_RENDERED,
} from '@storybook/core-events'

interface Props {
  story: string
}

export default class Preview extends React.Component<Props> {
  public state: object
  public constructor(props: Props) {
    super(props)
    this.state = {}
  }

  public componentDidMount() {
    console.log('[PREVIEW MOUNTED] api: ', this.props)
    // window.StorybookApi.on(SELECT_STORY, (kind: any, story: any) => {
    //   console.log('[PREVIEW - STORY SELECTED] Kind: ', kind, ' story: ', story)
    // })
  }

  public render() {
    return <div style={{ margin: 20 }}>selected sotry: {this.props.story}</div>
  }
}
