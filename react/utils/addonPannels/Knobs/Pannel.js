import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
// import qs from 'qs'
import { document } from 'global'
import { styled } from '@storybook/theming'
import copy from 'copy-to-clipboard'

import { STORY_CHANGED } from '@storybook/core-events'
import {
  TabWrapper,
  TabsState,
  ActionBar,
  Link,
  ScrollArea,
} from '@storybook/components'
// forked components
import Placeholder from './Placeholder.tsx'

import Types from './types'
import PropForm from './PropForm'

const getTimestamp = () => +new Date()

export const DEFAULT_GROUP_ID = 'Other'

const PanelWrapper = styled(({ children, className, theme }) => (
  <ScrollArea horizontal vertical className={className} theme={theme}>
    {children}
  </ScrollArea>
))({
  height: '100%',
  width: '100%',
})

class KnobPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      knobs: {},
    }
    this.options = {}

    this.lastEdit = getTimestamp()
    this.loadedFromUrl = false
  }

  componentDidMount() {
    this.mounted = true
    const { api } = this.props
    api.on('storybookjs/knobs/set', this.setKnobs)
    api.on('storybookjs/knobs/set-options', this.setOptions)

    this.stopListeningOnStory = api.on(STORY_CHANGED, () => {
      if (this.mounted) {
        this.setKnobs({ knobs: {} })
      }
      this.setKnobs({ knobs: {} })
    })
  }

  componentWillUnmount() {
    this.mounted = false
    const { api } = this.props

    api.off('storybookjs/knobs/set', this.setKnobs)
    this.stopListeningOnStory()
  }

  setOptions = (options = { timestamps: false }) => {
    this.options = options
  }

  setKnobs = ({ knobs, timestamp }) => {
    const queryParams = {}
    const { api } = this.props

    if (!this.options.timestamps || !timestamp || this.lastEdit <= timestamp) {
      Object.keys(knobs).forEach(name => {
        const knob = knobs[name]
        // For the first time, get values from the URL and set them.
        if (!this.loadedFromUrl) {
          const urlValue = api.getQueryParam(`knob-${name}`)

          // If the knob value present in url
          if (urlValue !== undefined) {
            const value = Types[knob.type].deserialize(urlValue)
            knob.value = value
            queryParams[`knob-${name}`] = Types[knob.type].serialize(value)

            api.emit('storybookjs/knobs/change', knob)
          }
        }
      })

      api.setQueryParams(queryParams)
      this.setState({ knobs })

      this.loadedFromUrl = true
    }
  }

  reset = () => {
    const { api } = this.props

    api.emit('storybookjs/knobs/reset')
  }

  copy = () => {
    const { location } = document
    const query = window.Qs.parse(location.search, { ignoreQueryPrefix: true })
    const { knobs } = this.state

    Object.entries(knobs).forEach(([name, knob]) => {
      query[`knob-${name}`] = Types[knob.type].serialize(knob.value)
    })

    copy(
      `${location.origin + location.pathname}?${window.Qs.stringify(query, {
        encode: false,
      })}`
    )

    // TODO: show some notification of this
  }

  emitChange = changedKnob => {
    const { api } = this.props

    api.emit('storybookjs/knobs/change', changedKnob)
  }

  handleChange = changedKnob => {
    this.lastEdit = getTimestamp()
    const { api } = this.props
    const { knobs } = this.state
    const { name } = changedKnob
    const newKnobs = { ...knobs }
    newKnobs[name] = {
      ...newKnobs[name],
      ...changedKnob,
    }

    this.setState({ knobs: newKnobs }, () => {
      this.emitChange(changedKnob)

      const queryParams = {}

      Object.keys(newKnobs).forEach(n => {
        const knob = newKnobs[n]
        queryParams[`knob-${n}`] = Types[knob.type].serialize(knob.value)
      })

      api.setQueryParams(queryParams)
    })
  }

  handleClick = knob => {
    const { api } = this.props

    api.emit('storybookjs/knobs/click', knob)
  }

  render() {
    const { knobs } = this.state
    const { active: panelActive } = this.props
    if (!panelActive) {
      return null
    }

    const theme = {
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
    }

    const groups = {}
    const groupIds = []

    const knobKeysArray = Object.keys(knobs).filter(key => knobs[key].used)

    knobKeysArray.forEach(key => {
      const knobKeyGroupId = knobs[key].groupId || DEFAULT_GROUP_ID
      groupIds.push(knobKeyGroupId)
      groups[knobKeyGroupId] = {
        render: ({ active }) => (
          <TabWrapper key={knobKeyGroupId} active={active} theme={theme}>
            <PropForm
              // false positive
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              knobs={knobsArray.filter(
                knob => (knob.groupId || DEFAULT_GROUP_ID) === knobKeyGroupId
              )}
              onFieldChange={this.handleChange}
              onFieldClick={this.handleClick}
            />
          </TabWrapper>
        ),
        title: knobKeyGroupId,
      }
    })

    const knobsArray = knobKeysArray.map(key => knobs[key])

    if (knobsArray.length === 0) {
      return (
        <Placeholder theme={theme}>
          <Fragment>No knobs found</Fragment>
          <Fragment>
            Learn how to{' '}
            <Link
              theme={theme}
              href="https://github.com/storybookjs/storybook/tree/master/addons/knobs"
              target="_blank"
              withArrow>
              dynamically interact with components
            </Link>
          </Fragment>
        </Placeholder>
      )
    }

    // Always sort DEFAULT_GROUP_ID (ungrouped) tab last without changing the remaining tabs
    const sortEntries = g => {
      const unsortedKeys = Object.keys(g)
      if (unsortedKeys.indexOf(DEFAULT_GROUP_ID) !== -1) {
        const sortedKeys = unsortedKeys.filter(key => key !== DEFAULT_GROUP_ID)
        sortedKeys.push(DEFAULT_GROUP_ID)
        return sortedKeys.map(key => [key, g[key]])
      }
      return Object.entries(g)
    }

    const entries = sortEntries(groups)

    return (
      <Fragment>
        <PanelWrapper theme={theme}>
          {entries.length > 1 ? (
            <TabsState theme={theme}>
              {entries.map(([k, v]) => (
                <div id={k} key={k} title={v.title}>
                  {v.render}
                </div>
              ))}
            </TabsState>
          ) : (
            <PropForm
              knobs={knobsArray}
              onFieldChange={this.handleChange}
              onFieldClick={this.handleClick}
            />
          )}
        </PanelWrapper>
        <ActionBar
          theme={theme}
          actionItems={[
            { title: 'Copy', onClick: this.copy },
            { title: 'Reset', onClick: this.reset },
          ]}
        />
      </Fragment>
    )
  }
}

KnobPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  onReset: PropTypes.object, // eslint-disable-line
  api: PropTypes.shape({
    on: PropTypes.func,
    off: PropTypes.func,
    getQueryParam: PropTypes.func,
    setQueryParams: PropTypes.func,
    emit: PropTypes.func,
  }).isRequired,
  theme: PropTypes.any,
}

export default KnobPanel
