import React from 'react'
import { storiesOf } from '@storybook/react'
// import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { Button, Input } from 'vtex.styleguide'

const SimpleComponent = ({ children }) => <div>{children}</div>

const mockStories = () => {
  storiesOf('web framework|example', module)
    .add(
      'with text',
      () => <SimpleComponent>This is the text</SimpleComponent>,
      {
        notes: 'example text simple component',
      }
    )
    .add('with emoji', () => <SimpleComponent>✨ ❤️ 🍪</SimpleComponent>, {
      notes: 'example emoji simple component',
    })

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
    .add('primary', () => <Button variation="primary">Primary</Button>, {
      notes: 'button variation click',
    })
    .add('secondary', () => <Button variation="secondary">Secondary</Button>, {
      notes: 'button variation click',
    })
    .add('tertiary', () => <Button variation="tertiary">Tertiary</Button>, {
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
