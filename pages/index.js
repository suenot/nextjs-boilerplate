import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';


import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import ProTip from './src/ProTip'
import Link from '~/components/Link'

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Context } from './test/context'

// i18next
import {i18n} from '~/init/i18n'
import Wrapper from '~/components/Wrapper/'


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

const useStyles = makeStyles(theme => ({

	demo: {
		fontSize: 10,
		padding: theme.spacing(3),
		border: `solid 1px rgba(255,255,255, .1)`,
		textAlign: 'center',
	},

}));

function About ({ globalStore, t, width, currentLanguage }) {

	const classes = useStyles()
  const { removeTodo, toggleTodo } = useContext(Context)

  return (
    <Container maxWidth='sm'>

			<div className={classes.demo}>
				Styled container
			</div>

      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js {currentLanguage}
        </Typography>

				<p>
					<span>widthUp: {width.up('sm').toString()}</span>
					<br />
					<span>widthDown: {width.down('sm').toString()}</span>
					<br />
					<span>widthOnly: {width.only('sm').toString()}</span>
					<br />
					<span>widthBetween: {width.between('sm','md').toString()}</span>
				</p>

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
