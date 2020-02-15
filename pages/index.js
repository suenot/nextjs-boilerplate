import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';


import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import ProTip from './src/ProTip'
import Link from '~/components/Link'


import { Context } from './test/context'

// i18next
import Wrapper from '../i18n/Wrapper'
import { i18n } from '../i18n/';

function Copyright () {

  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}

      <MuiLink color='inherit' href='https://material-ui.com/'>
        Your Website!
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function About ({ globalStore, t, currentLanguage }) {

  const { removeTodo, toggleTodo } = useContext(Context)

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js {currentLanguage}
        </Typography>

        <Button variant='contained' color='primary' onClick={() => {
          globalStore.updateCounter()
        }}>
          Mobx {globalStore.counter}
        </Button>


	      <Button variant='contained' color='primary' onClick={() => {
	        const s = removeTodo()

	        alert(s) // eslint-disable-line
	      }}>removeTodo</Button>

				<Button
					variant='contained' color='primary'
					onClick={ () =>
						i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
					}
				>
					{ t('change-locale') }
				</Button>

        <Button variant='contained' color='primary' component={Link} naked href='/'>
          Go to the main page
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

// About.getInitialProps = async ({ req }) => {
//   return {
//     namespacesRequired: ['common', 'test'],
//     currentLanguage: req ? req.language : i18n.language
//   };
// };

// About.propTypes = {
//   t: PropTypes.func.isRequired
// };


export default Wrapper(About)
