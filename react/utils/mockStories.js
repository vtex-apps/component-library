/* eslint-disable no-console */
import React from 'react'
// import addons from '@storybook/addons'
import { storiesOf, addDecorator, addParameters } from '@storybook/react'
import { create } from '@storybook/theming'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { Button, Input } from 'vtex.styleguide'

const mockStories = api => {
  const THEME = create({
    base: 'light',
    brandTitle: 'VTEX components',
    // brandImage: 'https://vtex.github.io/brand/static/media/logo.2f3fc60b.svg',
    // colorPrimary: 'hotpink',
    // colorSecondary: 'orangered',
  })

  addParameters({
    options: {
      theme: THEME,
    },
  })

  const SimpleComponent = ({ children }) => <div>{children}</div>

  console.log('mocking stories...', api)

  const stories = storiesOf('web framework|components', module)
    .add(
      'with text',
      () => <SimpleComponent>This is the text</SimpleComponent>,
      {
        notes: 'example text simple component',
      }
    )
    .add(
      'with emoji',
      () => {
        console.log('I MOUNT')
        return <SimpleComponent>✨ ❤️ 🍪</SimpleComponent>
      },
      {
        notes: 'example emoji simple component',
      }
    )
    .add(
      'default',
      () => (
        <Button
          variation={select(
            'variation',
            {
              primary: 'primary',
              secondary: 'secondary',
              tertiary: 'tertiary',
            },
            'primary',
            'vtex.button@1.x-variation-select'
          )}
          onClick={action('onClick')}
          block={boolean(false)}>
          {text('Button') || 'cliquitos'}
        </Button>
      ),
      {
        notes: 'button variation click',
      }
    )
    .add('group', () => <Button variation="secondary">Secondary</Button>, {
      notes: 'button variation click',
    })
    .add('withIcon', () => <Button variation="tertiary">Tertiary</Button>, {
      notes: 'button variation click',
    })

  stories.addDecorator(withKnobs)
}

export default mockStories
