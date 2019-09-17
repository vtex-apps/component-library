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
      addons.addPanel('storybookjs/knobs/panel', {
        title: 'Knobs',
        // eslint-disable-next-line react/display-name
        render: props => (
          <KnobPannel
            key={props.key}
            active={props.active}
            api={window.sbAPI}
            theme={{
              color: {
                // Official color palette
                primary: '#FF4785',
                // coral
                secondary: '#1EA7FD',
                // ocean
                tertiary: '#FAFBFC',
                ancillary: '#22a699',
                // for code
                // Complimentary
                orange: '#FC521F',
                gold: '#FFAE00',
                green: '#66BF3C',
                seafoam: '#37D5D3',
                purple: '#6F2CAC',
                ultraviolet: '#2A0481',
                // Monochrome
                lightest: '#FFFFFF',
                lighter: '#F8F8F8',
                light: '#F3F3F3',
                mediumlight: '#EEEEEE',
                medium: '#DDDDDD',
                mediumdark: '#999999',
                dark: '#666666',
                darker: '#444444',
                darkest: '#333333',
                // For borders
                border: 'rgba(0,0,0,.1)',
                // Status
                positive: '#66BF3C',
                negative: '#FF4400',
                warning: '#E69D00',
                critical: '#FFFFFF',
                defaultText: '#333333',
                inverseText: '#FFFFFF',
              },
              typography: {
                fonts: {
                  base: [
                    '"Nunito Sans"',
                    '-apple-system',
                    '".SFNSText-Regular"',
                    '"San Francisco"',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    '"Helvetica Neue"',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                  ].join(', '),
                  mono: [
                    '"Operator Mono"',
                    '"Fira Code Retina"',
                    '"Fira Code"',
                    '"FiraCode-Retina"',
                    '"Andale Mono"',
                    '"Lucida Console"',
                    'Consolas',
                    'Monaco',
                    'monospace',
                  ].join(', '),
                },
                weight: {
                  regular: 400,
                  bold: 700,
                  black: 900,
                },
                size: {
                  s1: 12,
                  s2: 14,
                  s3: 16,
                  m1: 20,
                  m2: 24,
                  m3: 28,
                  l1: 32,
                  l2: 40,
                  l3: 48,
                  code: 90,
                },
              },
              background: {
                app: '#F6F9FC',
                bar: '#FFFFFF',
                content: '#FFFFFF',
                gridCellSize: 10,
                hoverable: 'rgba(0,0,0,.05)',
                // hover state for items in a list
                // Notification, error, and warning backgrounds
                positive: '#E1FFD4',
                negative: '#FEDED2',
                warning: '#FFF5CF',
                critical: '#FF4400',
              },
            }}
          />
        ),
      })
    }
  }

  public componentWillMount() {
    if (window && window.sbAPI) {
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
