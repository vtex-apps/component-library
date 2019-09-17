/* eslint-disable no-console */
import React from 'react'
import mockStories from './mockStories'

// addon pannels
import addons from '@storybook/addons'
import KnobPannel from '../utils/addonPannels/Knobs'

interface PreviewProps {
  storyID: string
}

export default class ReactPreview extends React.Component<PreviewProps> {
  public state: any
  public constructor(props: PreviewProps) {
    super(props)

    this.state = {}
  }

  public componentDidMount() {
    if (window && window.sbAPI) {
      console.log('has? ', addons.hasChannel())
      // adds pannels for registered addons
      addons.addPanel('testelitos', {
        title: 'Mock',
        render: (props: any) =>
          props.active && <div style={{ margin: 20 }}>Mocko</div>,
      })
      addons.addPanel('vtex/vtex-base-addon/default-pannel', {
        title: 'Mockito',
        render: (props: any) =>
          props.active && (
            <div style={{ margin: 20 }}>
              Mockito, i am a panel{' '}
              {`active ${props.active}, key: ${props.key}`}
            </div>
          ),
      })
      // window.__STORYBOOK_ADDONS.register('storybookjs/knobs', _api => {
      addons.addPanel('storybookjs/knobs/panel', {
        title: 'Knobs',
        // eslint-disable-next-line react/display-name
        render: props => (
          <KnobPannel
            key={props.key}
            active={props.active}
            api={window.sbAPI}
            // api={_api}
          />
        ),
      })
      // })
    }
  }

  public componentWillMount() {
    if (window && window.sbAPI) {
      // register addons ?
      // console.log('SETTING ADDONS ON CLIENT API')
      // window.__STORYBOOK_CLIENT_API__.setAddon([
      //   'vtex/vtex-base-addon',
      //   'storybookjs/knobs',
      // ])
      // for now they are mocked, but they should be dynamically imported from IO apps
      mockStories(window.sbAPI)
    }
  }

  public render() {
    const { storyID } = this.props
    console.log('redering preview!')
    if (window && window.__STORYBOOK_CLIENT_API__) {
      const rawStories = window.__STORYBOOK_CLIENT_API__.raw()
      const story = rawStories.find((story: any) => story.id === storyID)
      console.log('[PREVIEW RENDER]: ', story)
      return <div style={{ margin: 20 }}>{story.storyFn()}</div>
    }
    return <div style={{ margin: 20 }}>{storyID}</div>
  }
}
