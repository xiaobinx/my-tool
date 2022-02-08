import Home from '@mui/icons-material/Home'
import BugReportIcon from '@mui/icons-material/BugReport';
import Main from './pages/Main'
import P404 from './pages/P404'
import TestDemo from './pages/TestDemo'

const routes = [{
  path: "/",
  element: <Main />,
  showInSideBar: true,
  name: "Home",
  menuIcon: <Home />
}, {
  path: "/TestDemo",
  element: <TestDemo />,
  showInSideBar: true,
  name: "Test Demo",
  menuIcon: <BugReportIcon />
}, {
  path: "*",
  element: <P404 />,
}
]

export default routes