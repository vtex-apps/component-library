import React from 'react'
import qs from './utils/qs.js'

declare global {
  interface Window {
    Qs: any
  }
}
export default class App extends React.Component {
  public componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('CDM')
    window.Qs = qs

    // Storybook UI has to be imported dynamically cuz it depends on Qs being on the window
    import('./utils/StoryBookUI').then(renderStorybookUI => {
      import('./utils/ReactProvider').then(ReactProvider => {
        const roolEl = document.getElementById('component-library-root')
        renderStorybookUI.default(roolEl, new ReactProvider.default())
      })
    })
  }

  public render() {
    return <div id="component-library-root"></div>
  }
}
