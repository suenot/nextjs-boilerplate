import React from 'react';

import PropTypes from 'prop-types';


import { i18n, withTranslation } from './i18n';
import { inject, observer } from 'mobx-react'
// import {withStyles} from '@material-ui/core/styles';


function Wrapper(props) {


  props.getInitialProps = async ({ req }) => {
    return {
      ...props.getInitialProps,
      namespacesRequired: ['common', 'test'],
      currentLanguage: req ? req.language : i18n.language,
    };
  };

  props.propTypes = {
    ...props.propTypes,
    t: PropTypes.func.isRequired
  };


  props = inject('globalStore')(observer(props))
  props = withTranslation('common')(props)
  // props = withStyles(styles, { withTheme: false })

  return props;
}


export default Wrapper
