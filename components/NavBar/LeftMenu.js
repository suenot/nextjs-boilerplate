// material
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


const menu1 = [
  {
    label: 'Inbox',
    icon: 'mail',
  },
  {
    label: 'Starred',
    icon: 'mail',
  },
  {
    label: 'Send email',
    icon: 'mail',
  },
  {
    label: 'Drafts',
    icon: 'mail',
  },
]

export default function LeftMenu() {

  function renderMenu(arr) {
    return (
      <List>
        {arr.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    )
  }
  return (
    <div>
      {renderMenu(menu1)}
      <Divider />
      {renderMenu(menu1)}
    </div>
  )
}
