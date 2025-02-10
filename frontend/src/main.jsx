import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import JobScreen from './screens/JobScreen.jsx';
import CourseScreen from './screens/CourseScreen.jsx';
import ResumeScreen from './screens/ResumeScreen.jsx';
import JobDetailScreen from './screens/JobDetailScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CourseInfo from './screens/CourseInfo.jsx';
import CourseProgress from './screens/CourseProgress.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/update-profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/jobs' element={<JobScreen />}/>
      <Route path='/job-info/:jobId' element={<JobDetailScreen/>}/>
      <Route path='/courses/:courseId'element={<CourseInfo/>} />
      <Route path='/courses/:courseId/course-progress' element={<CourseProgress/>}/>
      <Route path='/courses' element={<CourseScreen />}/>
      <Route path='/profile' element={<ResumeScreen/>}/>
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
