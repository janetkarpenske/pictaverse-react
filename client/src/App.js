import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//import HomePage from './pages/HomePage';
//import EventsPage, { loader as eventsLoader } from './pages/Events';
//import EventDetailPage, { loader as eventDetailLoader } from './pages/EventDetail';
//import NewEventPage, { action as newEventAction } from './pages/NewEvent';
//import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
//import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import Signin from './pages/Signin';
import Register from './pages/Register';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { path: 'signin',
        element: <Signin />
      },
      { path: 'register',
        element: <Register />
      }
    ]
  },

])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
