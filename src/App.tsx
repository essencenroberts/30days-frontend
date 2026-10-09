// import { useState } from 'react''
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';

// monitor
import ProtectedRoute from './components/routes/ProtectedRoute';

import PublicRoute from './components/routes/PublicRoute';

// import Layouts
import AppLayout from './components/layout/AppLayout';
import PublicLayout from './components/layout/PublicLayout';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewChallenge from './pages/NewChallenge';
import PostEditor from './pages/PostEditor';
import NotFound from './pages/NotFoundPage';
import ChallengePlan from './pages/ChallengePlanPage';
import Home from './pages/Home';


function App() {


  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Navigate to='/dashboard' replace />} /> replace with Home */}

        {/* // logged out - Public only routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route  path='/login' element={<Login />}/>

            <Route path='/register' element={<Register />} />
          </Route>
          
        </Route>


        {/* // logged-in - Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />

            <Route path='/challenges/new' element={<NewChallenge />} />
         
            <Route path='/challenges/:challengeId' element={<ChallengePlan />} />

            <Route path='/challenes/:challenegeId/posts/new' element={<PostEditor />} />

            <Route path='/challenges/:challengeId/posts/:postId' element={<PostEditor />} /> 
           </Route>
          </Route>
          

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App;
