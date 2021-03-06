// import React from 'react'
// import PropTypes from 'prop-types';

// material
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

// helpers
import {getNodeEnv} from '~/server/env'

function Footer () {

	const env = getNodeEnv()

  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}

      <MuiLink color='inherit' href={env.siteUrl}>
        {env.projectName}
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const FooterWrapper = WrappedComponent => {
  class Wrapper extends React.Component {

		static async getInitialProps(ctx) {
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
      // Return props.
      return { ...pageProps }
    }

		render() {
			return (
        <div>
          <WrappedComponent {...this.props} />
  				<Footer />
        </div>
			)
		}

	}

	return Wrapper;
}
export default FooterWrapper
