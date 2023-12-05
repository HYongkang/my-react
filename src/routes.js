import Home from "./pages/Home";
import Login from "./pages/login/Login";
import RightRelate from "./pages/rule/RightRelate";
import Flow from "./pages/Flow";
import LeftFactor from "./pages/rule/LeftFactor";
import LeftRelate from "./pages/rule/LeftRelate";
import RightFactor from "./pages/rule/RightFactor";

const routes = [
    {
      path: '/',
      exact: true,
      component: Login
    },
    {
      path: '/Home',
      exact: true,
      component: Home
    },
    {
      path: '/rule',
      exact: true,
      children: [
        {
          path: '/rule/LeftFactor',
          exact: true,
          component: LeftFactor
        },
        {
          path: '/rule/RightFactor',
          exact: true,
          component: RightFactor
        },
        {
          path: '/rule/LeftRelate',
          exact: true,
          component: LeftRelate
        },
        {
          path: '/rule/RightRelate',
          exact: true,
          component: RightRelate
        }
      ]
    },
    {
      path: '/Flow',
      exact: true,
      component: Flow
    }
  ];
  
export default routes;