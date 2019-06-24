import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  SupervisedUserCircle, Gamepad, TableChart,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/**
 * Component that renders the application bar and the menu drawer
 */
function ButtonAppBar({ LeaderBoard }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <NavLink to="/">
          <ListItem button>
            <ListItemIcon><SupervisedUserCircle /></ListItemIcon>
            <ListItemText primary="Player selection" />
          </ListItem>
        </NavLink>

        <NavLink to="/game">
          <ListItem button>
            <ListItemIcon><Gamepad /></ListItemIcon>
            <ListItemText primary="Start again" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/leaderboard"
          onClick={() => {
            LeaderBoard.getGames();
          }}
        >

          <ListItem
            button
          >
            <ListItemIcon><TableChart /></ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItem>

        </NavLink>

      </List>

    </div>
  );


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Janken
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}

ButtonAppBar.defaultProps = {
  LeaderBoard: {},
};

ButtonAppBar.propTypes = {
  LeaderBoard: PropTypes.object,
};

export default inject('LeaderBoard')(observer(ButtonAppBar));
