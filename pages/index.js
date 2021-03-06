import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';


// material
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import ProTip from './src/ProTip'
import Link, {LinkClick} from '~/components/Link'

// env
import { Context } from '~/context/'

// components
import Wrapper from '~/components/Wrapper/'

const useStyles = makeStyles(theme => ({

	demo: {
		fontSize: 10,
		padding: theme.spacing(3),
		border: `solid 1px rgba(255,255,255, .1)`,
		textAlign: 'center',
	},

}));


function About (props) {

	const { globalStore, t, width, changeLanguage, colors, env, sys, query, router } = props

	const classes = useStyles()
  const { removeTodo, toggleTodo } = useContext(Context)

	const color = 'rgb(100, 100, 100)'
	const lighten = colors(color).lighten(.3)
	const darken = colors(color).darken(.3)
	const inverse = colors(color).inverse()
	const negate = colors(color).negate()
	const opacity = colors(color).opacity(.4)

  return (
		<div>
				<div className={classes.demo}>
					Styled container
				</div>

				<Box my={2}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>

	      <Box my={4}>
	        <Typography variant='h4' component='h1' gutterBottom>
	          Next.js {query.lang}
	        </Typography>

					<div>
						Config {env.RESTURL_SPEAKERS}
					</div>

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
					onClick={() => {
						alert('Use menu')
					} }
				>
					{ t('change-locale') }
				</Button>

        <Button variant='contained' color='primary' component={Link} naked href='/'>
          Button with Link component
        </Button>

				<Button variant='contained' color='primary'
					onClick={() => {

						LinkClick({
							route: 'index',
							params: {
								something: 'yex'
							}
						})

					}}
					>
          Button with onClick
        </Button>

				<Link href='/' color='secondary'>
          Link component
        </Link>

        <ProTip />
      </Box>
  	</div>
  )
}

// About.getInitialProps = ({ req }) => {
//   return {
//     namespacesRequired: ['common', 'test'],
//     currentLanguage: req ? req.language : i18n.language
//   };
// };

// About.propTypes = {
//   t: PropTypes.func.isRequired
// };

export default Wrapper(About, {
	is_protected: true,
	navbar: true,
	footer: true,
})
