import React, { Component } from 'react'
import Router from 'next/router'
// import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
  // const Auth = new AuthService('http://localhost')
  class AuthService {
    constructor() {
    }
    loggedIn() {
      return false;
    }
  }
  const Auth = new AuthService()

  return class Authenticated extends Component {
    static async getInitialProps(ctx) {
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = AuthComponent.getInitialProps && (await AuthComponent.getInitialProps(ctx))
      // Return props.
      return { ...pageProps }
    }
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
      }
    }
    componentDidMount() {
      if (!Auth.loggedIn()) {
        // Router.push('/')
        // alert('push')
        this.setState({ isLoading: true })
      } else {
        this.setState({ isLoading: false })
      }

    }
    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <AuthComponent {...this.props} auth={Auth} />
          )}
        </div>
      )
    }
  }
}
