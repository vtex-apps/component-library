import React from 'react'
import qs from './utils/qs.js'

declare global {
  interface Window {
    Qs: any
    sbAPI: any
    __STORYBOOK_CLIENT_API__: any
  }
}
export default class App extends React.Component {
  public async componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('CDM', qs)
    window.Qs = qs()
    await import('./utils/addons')

    // Storybook UI has to be imported dynamically cuz it depends on Qs being on the window
    import('./utils/StoryBookUI').then(renderStorybookUI => {
      import('./utils/ReactProvider').then(ReactProvider => {
        // import('./utils/addons')
        const roolEl = document.getElementById('component-library-root')
        renderStorybookUI.default(roolEl, new ReactProvider.default())
      })
    })
  }

  public render() {
    return <div id="component-library-root"></div>
  }
}
