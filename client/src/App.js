import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import Signin from './pages/Signin';
import Register from './pages/Register';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/About';
import NewPostForm from './components/NewPostForm';
import PostDetailsPage from './pages/PostDetailsPage.jsx';
import { isUserAuthenticated } from './utils/auth.js';

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { 
        path: 'signin',
        element: <Signin />
      },
      { 
        path: 'register',
        element: <Register />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'newPost',
        element: <NewPostForm />
      },
      {
        path: 'posts/:postId',
        id: 'post-detail',
        element: <PostDetailsPage />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
