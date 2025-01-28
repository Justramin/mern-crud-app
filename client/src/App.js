
import './App.css';
import AdminDashboad from './components/AdminDashboard/AdminDashboard';
import AdminAddUser from './components/AdminAddUser/AdminAddUser';
import AdminEditUser from './components/AdminEditUser/AdminEditUser';
import UserSignUp from './components/UserSignUp/UserSignUp';
import UserProfile from './components/UserHomePage/UserHomePage'
import UserLogin from './components/UserLogin/UserLogin'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AdminLogin from './components/AdminLogin/AdminLogin';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<UserLogin />,
    },
    {
      path:"/home",
      element:<UserProfile />,
    },
    {
      path:"/signup",
      element:<UserSignUp />,
    },
    {
      path:"/adminlogin",
      element:<AdminLogin />,
    },
    {
      path:"/admin",
      element:<AdminDashboad />,
    },
    {
      path:"/admin/add",
      element:<AdminAddUser />,
    },
    {
      path:"/admin/update/:id",
      element:<AdminEditUser />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
