import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { withRouter } from 'next/router'

import { i18n, withTranslation } from '~/server/i18n';
import { inject, observer } from 'mobx-react'
import {getNodeEnv} from '~/server/env'

import {Colors} from './colors'
import {Sys, Media} from './helpers'
// import L, {Link} from '~/server/routes'


const Wrapper = WrappedComponent => {

	const env = getNodeEnv()
	const {isProd, isDev} = env

  class Wrapper extends React.Component {

		static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
	    return {
	      namespacesRequired: ['common'],
				query,
	    };
	  };

		static defaultProps = {
			env,
			width: new Media(),
			colors: (val) => new Colors(val),
			sys: new Sys({isProd, isDev}),
		}

	  static propTypes = {
	    t: PropTypes.func.isRequired
	  };

		componentDidMount() {
			const {query} = this.props
			i18n.changeLanguage(query.lang)
		}

    render() {
      return (
				<WrappedComponent
					{...this.props}
				/> )
    }
  }

	let obj = Wrapper
	obj = inject('globalStore')(observer(obj))
	obj = withTranslation('common')(obj)
	obj = withRouter(obj)

  return obj;
};

export default Wrapper
