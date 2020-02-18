import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// material
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

// icons...
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// helpers
import {Media} from '../Wrapper/helpers'
import {getNodeEnv} from '~/server/env'

// components
import MenuToolbar from './MenuToolbar'
import LeftMenu from './LeftMenu'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
	title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

	const useDesktop = (use) => {
		if(Media.up('md')) {
			return use
		}
		return undefined;
	}

	const env = getNodeEnv()


  return (
    <div className={classes.root}>
      <CssBaseline />
			<HideOnScroll {...props}>
	      <AppBar
	        position="fixed"
	        className={
						useDesktop(clsx(classes.appBar, {[classes.appBarShift]: open}))
					}
	      >
	        <Toolbar>
	          <IconButton
	            color="inherit"
	            aria-label="open drawer"
	            onClick={handleDrawerOpen}
	            edge="start"
	            className={
								useDesktop(clsx(classes.menuButton, open && classes.hide))
							}
	          >
	            <MenuIcon />
	          </IconButton>

						<Typography className={classes.title} variant="h6" noWrap>
							{env.projectName}
						</Typography>

						<MenuToolbar />

	        </Toolbar>
	      </AppBar>
			</HideOnScroll>

      <Drawer
        className={classes.drawer}
        variant={useDesktop('persistent')}
				onClose={handleDrawerClose}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <LeftMenu />
      </Drawer>
      <main
        className={
					useDesktop(clsx(classes.content, {[classes.contentShift]: open}))
				}
      >
        <div className={classes.drawerHeader} />

				<Container maxWidth='lg'>
	        {props.children}
	      </Container>

      </main>
    </div>
  );
}



function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const NavWrapper = WrappedComponent => {
  class Wrapper extends React.Component {

		static async getInitialProps(ctx) {
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
      // Return props.
      return { ...pageProps }
    }

		render() {
			return (
				<PersistentDrawerLeft>
					<WrappedComponent {...this.props} />
				</PersistentDrawerLeft>
			)
		}

	}

	return Wrapper;
}
export default NavWrapper
