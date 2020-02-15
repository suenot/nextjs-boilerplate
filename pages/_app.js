import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// i18next
import {appWithTranslation} from '~/init/i18n'

// Styles provider
import theme from '../styles/theme'
import { Provider } from 'mobx-react'
import globalStore, { fetchInitialStoreState } from '../stores/global'

import { Context } from './test/context'

class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = {
      globalStore
    }
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps (appContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()

    return {
      ...appProps,
      initialStoreState
    }
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps (props, state) {
    state.globalStore.hydrate(props.initialStoreState)
    return state
  }

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps } = this.props

    const removeTodo = () => {
      return 'removeTodo'
    }

    const toggleTodo = () => {
      return 'toggleTodo'
    }

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
				<Context.Provider value={{
					removeTodo,
					toggleTodo
				}}>
					<Provider globalStore={this.state.globalStore}>
						<ThemeProvider theme={theme}>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</Provider>
				</Context.Provider>
      </React.Fragment>
    )
  }
}

export default appWithTranslation(MyApp)
