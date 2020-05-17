import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CompanyLogo from '../../svg-icons/CompanyLogo';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import CoffeeBeansIcon from '../../svg-icons/CoffeeBeansIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../../context/AuthContext';
import Orders from './Orders';
import Coffee from './Coffee';
import BrewingEquipment from './BrewingEquipment';
import Gifts from './Gifts';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      width: DRAWER_WIDTH,
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  nestedListItem: {
    paddingLeft: theme.spacing(9),
  },
  companyLogo: {
    width: '14rem !important',
    [theme.breakpoints.up('md')]: {
      width: '17rem !important',
    },
  },
  appBar: {
    backgroundColor: '#57a197',

    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    background: '#fff',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    padding: theme.spacing(2),
  },
}));

type Props = RouteComponentProps & {
  handleLogout: () => void;
};

function Dashboard({ handleLogout, match }: Props) {
  const classes = useStyles();
  const { authState } = React.useContext(AuthContext);

  const [
    profileMenuAnchorEl,
    setProfileMenuAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const [isNestedItemCollapsed, setIsNestedItemCollapsed] = React.useState(
    false
  );

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setProfileMenuAnchorEl(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setProfileMenuAnchorEl(null);
  }

  function handleNestedItemCollapse() {
    setIsNestedItemCollapsed(!isNestedItemCollapsed);
  }

  function handleDrawerToggle() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function getInitials(name: string | null) {
    if (name === null) return;

    const split = name.split(' ');
    const firstNameInitial = split[0][0];
    const lastNameInitial = split[1][0];

    return `${firstNameInitial}${lastNameInitial}`;
  }

  const StyledBadge = withStyles({
    badge: {
      right: 0,
      top: 9,
    },
  })(Badge);

  const avatar = (
    <Avatar className={classes.avatar}>
      {getInitials(authState.authUser)}
    </Avatar>
  );

  // PROFILE MENU
  const profileMenu = (
    <>
      <IconButton onClick={handleProfileMenuOpen}>{avatar}</IconButton>
      <Menu
        anchorEl={profileMenuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      >
        <div className={classes.avatarBox}>
          {avatar}
          <p style={{ marginLeft: '1.5rem' }}>{authState.authUser}</p>
        </div>
        <Divider />
        <MenuItem>
          <p>My profile</p>
        </MenuItem>
        <MenuItem>
          <StyledBadge badgeContent={2} color="primary">
            <p>Messages</p>
          </StyledBadge>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <p>Log out</p>
        </MenuItem>
      </Menu>
    </>
  );

  // DRAWER
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* DASHBOARD */}
        <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* ORDERS */}
        <ListItem button component={Link} to="/admin/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        {/* PRODUCTS */}
        <ListItem button onClick={handleNestedItemCollapse}>
          <ListItemIcon>
            <CoffeeBeansIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {isNestedItemCollapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* NESTED PRODUCTS */}
        <Collapse in={isNestedItemCollapsed} timeout="auto">
          <List>
            {/* COFFEE */}
            <ListItem
              button
              className={classes.nestedListItem}
              component={Link}
              to="/admin/products/coffee"
            >
              <ListItemText primary="Coffee" />
            </ListItem>
            {/* BREWING EQUIPMENT */}
            <ListItem
              button
              className={classes.nestedListItem}
              component={Link}
              to="/admin/products/brewing-equipment"
            >
              <ListItemText primary="Brewing equipment" />
            </ListItem>
            <ListItem
              button
              className={classes.nestedListItem}
              component={Link}
              to="/admin/products/gifts"
            >
              <ListItemText primary="Gifts" />
            </ListItem>
          </List>
        </Collapse>
        {/* CUSTOMERS */}
        <ListItem button component={Link} to="/admin/customers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      {/* HEADER */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon className={classes.menuButton} />
          </IconButton>
          <CompanyLogo className={classes.companyLogo} />
          {/* MOBILE */}
          <div className={classes.sectionMobile}>{profileMenu}</div>
          {/* DESKTOP */}
          <div className={classes.sectionDesktop}>{profileMenu}</div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* MOBILE */}
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* DESKTOP */}
        <Hidden smDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* necessary for content to be below app bar */}
        <div className={classes.appBarSpacer} />
        {/* <Route path={`${match.path}/products`} */}
        <Route path={`${match.path}/orders`} component={Orders} />
        <Route path={`${match.path}/products/coffee`} component={Coffee} />
        <Route
          path={`${match.path}/products/brewing-equipment`}
          component={BrewingEquipment}
        />
        <Route path={`${match.path}/products/gifts`} component={Gifts} />
      </main>
    </div>
  );
}

export default withRouter(Dashboard);
