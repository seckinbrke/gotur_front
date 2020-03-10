import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { history } from '../App';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => history.push({ pathname: '/dashboard' })}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Siparişler" />
    </ListItem>
    <ListItem button onClick={() => history.push({ pathname: '/urunler' })}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Ürünler" />
    </ListItem>
    <ListItem button onClick={() => history.push({ pathname: '/urunekle' })}>
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Ürün Ekleme" />
    </ListItem>


  </div>
);

export const secondaryListItems = (
  <div>

  </div>
);