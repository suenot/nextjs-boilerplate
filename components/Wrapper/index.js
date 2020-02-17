import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { i18n, withTranslation } from '~/server/i18n';
import { inject, observer } from 'mobx-react'
import {getNodeEnv} from '~/server/env'

import {Colors} from './colors'
import {Sys} from './sys'

function Wrapper(props) {

  props.getInitialProps = async ({ req }) => {
    return { ...props.getInitialProps,
      namespacesRequired: ['common', 'test'],
      currentLanguage: req ? req.language : i18n.language,
    };
  };

	function defaultProps() {
		const env = getNodeEnv()
		const {isProd, isDev} = env

		return {
			...props.defaultProps,
			env,

			// Material dynamic breakpoints...
			width: new class {
				constructor() {
					// this.theme = this.up()
				}
				up(size) { return useMediaQuery(useTheme().breakpoints.up(size)) }
				down(size) { return useMediaQuery(useTheme().breakpoints.down(size)) }
				only(size) { return useMediaQuery(useTheme().breakpoints.only(size)) }
				between(a,b) { return useMediaQuery(useTheme().breakpoints.between(a,b)) }
			},

			colors: (val) => new Colors(val),
			sys: new Sys({isProd, isDev}),

		}
	}

	props.defaultProps = defaultProps()

  props.propTypes = { ...props.propTypes,
    t: PropTypes.func.isRequired
  };


  props = inject('globalStore')(observer(props))
  props = withTranslation('common')(props)

  return props;
}


export default Wrapper
