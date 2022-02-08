
import routes from './router'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ErrorBoundary from '../commons/errorboundary'
import { Suspense, useState } from 'react'

import Menu from '@mui/icons-material/Menu'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ButtonBase from '@mui/material/ButtonBase'

import { styled, Theme, CSSObject } from '@mui/material/styles';

import css from './App.module.css'

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function App() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Drawer variant="permanent" open={open}>
      <div className={css.drawer_header}>
        <ButtonBase
          style={{ padding: "8px 16px" }}
          color='inherit'
          aria-label="open drawer"
          sx={{
            marginRight: '16px',
          }}
          onClick={toggleDrawer}
        >
          <Menu />
        </ButtonBase>
        <div className={css.drawer_header_title}>
          My Tool
        </div>
      </div>
      <List>
        {routes.filter(route => route.showInSideBar).map((route, index) => (
          <ListItem onClick={() => nav(route.path)} button key={index}>
            <ListItemIcon>
              {route.menuIcon}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <ErrorBoundary>
        <Suspense fallback={
          <div>loading page...</div>
        }>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Box>
  </Box >
}

export default App
