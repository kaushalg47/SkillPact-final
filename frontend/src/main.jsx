import React from 'react';
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
import CompanyInfo from './screens/CompanyInfo.jsx';
import EditCompany from './screens/EditCompany.jsx';
import CompanyJobs from './screens/CompanyJobs.jsx';
import Applicants from './screens/Applicants.jsx';
import PostJobs from './screens/PostJobs.jsx';
import CourseInfo from './screens/CourseInfoScreen.jsx';
import CourseVideos from './screens/CourseVideos.jsx';
import CompanyRegisterScreen from "../src/screens/CompanyRegisterScreen.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/update-profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/company-info/edit' element={<EditCompany />} />
      <Route path='/create-company' element={<CompanyRegisterScreen />} />
      <Route path='/jobs' element={<JobScreen />}/>
      <Route path='/job-info/:jobId' element={<JobDetailScreen/>}/>
      <Route path='/courses' element={<CourseScreen />}/>
      <Route path='/courses/:courseId' element={<CourseInfo/>} />
      <Route path='/course-content/:courseId' element={<CourseVideos/>}/>
      <Route path='/profile' element={<ResumeScreen/>}/>
      <Route path='/company-info' element={<CompanyInfo/>}/>
      <Route path='/company-jobs' element={<CompanyJobs/>}/>
      <Route path='/company-jobs/:jobId' element={<Applicants/>}/>
      <Route path='/post-jobs' element={<PostJobs/>}/>
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
