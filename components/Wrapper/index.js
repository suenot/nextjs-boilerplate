import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { i18n, withTranslation } from '~/init/i18n';
import { inject, observer } from 'mobx-react'


function Wrapper(props) {

  props.getInitialProps = async ({ req }) => {
    return {
      ...props.getInitialProps,
      namespacesRequired: ['common', 'test'],
      currentLanguage: req ? req.language : i18n.language,
    };
  };

	props.defaultProps = {

		// Material dynamic breakpoints...
		widthUp: (size) => useMediaQuery(useTheme().breakpoints.up(size)),
		widthDown: (size) => useMediaQuery(useTheme().breakpoints.down(size)),
		widthOnly: (size) => useMediaQuery(useTheme().breakpoints.only(size)),
		widthBetween: (a,b) => useMediaQuery(useTheme().breakpoints.between(a,b)),
		
	}

  props.propTypes = {
    ...props.propTypes,
    t: PropTypes.func.isRequired
  };


  props = inject('globalStore')(observer(props))
  props = withTranslation('common')(props)

  return props;
}


export default Wrapper
