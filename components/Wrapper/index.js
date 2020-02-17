import React from 'react';
import PropTypes from 'prop-types';

import { i18n, withTranslation } from '~/server/i18n';
import { inject, observer } from 'mobx-react'
import {getNodeEnv} from '~/server/env'

import {Colors} from './colors'
import {Sys, Media} from './helpers'

function Wrapper(props) {

  props.getInitialProps = async ({ req }) => {
    return { ...props.getInitialProps,
      namespacesRequired: ['common', 'test'],
      currentLanguage: req ? req.language : i18n.language,
    };
  };

	const env = getNodeEnv()
	const {isProd, isDev} = env

	props.defaultProps = { ...props.defaultProps,
		env,
		width: new Media(),
		colors: (val) => new Colors(val),
		sys: new Sys({isProd, isDev}),
		changeLanguage: () => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
	}

  props.propTypes = { ...props.propTypes,
    t: PropTypes.func.isRequired
  };


  props = inject('globalStore')(observer(props))
  props = withTranslation('common')(props)

  return props;
}


export default Wrapper
