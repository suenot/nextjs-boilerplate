import PropTypes from 'prop-types';
import { i18n, withTranslation } from './i18n';
import { inject, observer } from 'mobx-react'


function Wrapper(RES) {

  RES.getInitialProps = async ({ req }) => {
    return {
      ...RES.getInitialProps,
      namespacesRequired: ['common', 'test'],
      currentLanguage: req ? req.language : i18n.language,
    };
  };

  RES.propTypes = {
    ...RES.propTypes,
    t: PropTypes.func.isRequired
  };


  RES = inject('globalStore')(observer(RES))
  RES = withTranslation('common')(RES)

  return RES;
}


export default Wrapper
