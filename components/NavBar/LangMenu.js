import React, {useEffect, setState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';


import L, {Link} from '~/server/routes'
import { i18n } from '~/server/i18n';


import {languages} from '~/server/configs/languages';
import {Get} from '~/components/Wrapper/helpers'

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

	const query = Get.query()

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	const changeLanguage = async (lang) => {
		handleClose()

		let route = L.Router.router.route.substr(1)
		if(!route) route = 'index'

		// i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')

		await i18n.changeLanguage(lang)
		let q = query

		delete q.lng
		delete q.subpath

		L.Router.pushRoute(route, {...q, lang})
	}

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {languages.map((item, index) => (
          <MenuItem key={index} selected={item.value === query.lang} onClick={async() => await changeLanguage(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
