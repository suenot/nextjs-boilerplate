Best boilerplate for ReactJs project

# Libraries

 - Theme with [Material UI](https://material-ui.com/)
 - Framework [NextJS](https://nextjs.org/)
 - LocalStorage with [MobX](https://github.com/mobxjs/mobx-react)
 - Eslint
 - [Express server](https://expressjs.com/)
 - Multilingual with [I18Next](https://www.i18next.com/)

### In future

 - [Helmet](https://helmetjs.github.io/)

# Configs

|Name  |File  |Call  |
|--|--|--|
|Mobx Storage  |/stores/global.js  |`{props.globalStore.*}`  |
|Global variables (dev/prod)   |/server/env.js  |`{props.env.*}`  |
|Languages   |/server/configs/languages.js  | |
|Routes  |/server/routes.js  |  |
|Locales  |/public/static/locales/*/  |  |

# Props
All props works only with `'~/components/Wrapper/'` component inside `/pages/somepage.js`

#### Dynamic width detection
```javascript
const {width} = props
{width.only('sm') ? true : false}
{width.down('sm') ? true : false}
{width.up('sm') ? true : false}
{width.between('xs','sm') ? true : false}
```
#### Dynamic colors preparation
```javascript
const {color} = props
const color = 'rgb(100, 100, 100)'
const lighten = colors(color).lighten(.3)
const darken = colors(color).darken(.3)
const inverse = colors(color).inverse()
const negate = colors(color).negate()
const opacity = colors(c).opacity(.4)
```

#### SSR translations
```javascript
const {t} = props
const text = t('string_example', {var: 'ok'})
```

#### Env props
```javascript
const {sys, env} = props

//In milliseconds
wait sys.sleep(10)

//print in dev mode
sys.print(true, false, 'Some string', 'etc...')

//Translation with extension: 1 month, 3 months, 10 months
sys.plural({key: 'string', number: 1, number_hidden: false})

sys.navigator() //Browser language
```
#### Pages wrapper
```javascript
import Wrapper from '~/components/Wrapper/'

function Index(props) {
	return (
		<div>
			Wrapped content
		</div>
	)
}
export default Wrapper(Index, {
	is_protected: true, //Authorization needed
	navbar: true, //Show global navbar
	footer: true, //Default footer
})
```

# Installation

```console
$ git clone https://github.com/markolofsen/nextjs-boilerplate.git
$ cd nextjs-boilerplate
$ yarn
$ yarn dev
```
