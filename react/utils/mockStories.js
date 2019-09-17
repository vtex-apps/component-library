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
  addDecorator(withKnobs)

  const SimpleComponent = ({ children }) => <div>{children}</div>

  console.log('mocking stories...', api)
  // api.setOptions({ theme: THEME })
  storiesOf('web framework|example', module)
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

  storiesOf('store|shelf', module)
    .add('default', () => <SimpleComponent>This is a shelf</SimpleComponent>, {
      notes: 'button variation click',
    })
    .add(
      'complex',
      () => <SimpleComponent>This is a complex shelf</SimpleComponent>,
      {
        notes: 'button variation click',
      }
    )

  storiesOf('admin|vtex.button', module)
    .addDecorator(withKnobs)
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

  storiesOf('admin|gocommerce.input', module)
    .add('small', () => <Input size="small" />, {
      notes: 'button variation click',
    })
    .add('large', () => <Input size="large" />, {
      notes: 'button variation click',
    })
}

export default mockStories
