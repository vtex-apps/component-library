import React from 'react'
import addons, { mockChannel } from '@storybook/addons'
import Channel from '@storybook/channels'
import renderStorybookUI, { Provider } from '@storybook/ui'

addons.setChannel(mockChannel())

class ReactProvider extends Provider {
  public channel: Channel

  public constructor() {
    super()
    this.channel = addons.getChannel()
  }

  public getElements(type: any) {
    // eslint-disable-next-line no-console
    console.log('get Elements ', type)
    return {}
  }

  public renderPreview() {
    return <p>This is the Preview</p>
  }

  public handleAPI(api: any) {
    // no need to do anything for now.
    // eslint-disable-next-line no-console
    console.log('handler API ', api)
  }
}

export default class App extends React.Component {
  public componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('CDM')
    const roolEl = document.getElementById('component-library-root')
    // eslint-disable-next-line no-console
    console.log('root el: ', roolEl, ReactProvider)
    renderStorybookUI(roolEl, new ReactProvider())
  }

  public render() {
    return <div id="component-library-root"></div>
  }
}
