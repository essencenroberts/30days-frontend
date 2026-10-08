// import { useState } from 'react''
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';

// monitor
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewChallenge from './pages/NewChallenge';
import PostEditor from './pages/PostEditor';
import NotFound from './pages/NotFoundPage';
import Calendar from './pages/Calendar';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='m-5 p-5 font-bold font-3xl'>30Days</h1>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />

        {/* // logged out - Public only routes */}
        <Route element={<PublicRoute />}>
          <Route  path='/login' element={<Login />}/>

          <Route path='/register' element={<Register />} />
        </Route>


        {/* // logged-in - Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/challenges/new' element={<NewChallenge />} />
         
          <Route path='/challenges/:challengeId' element={<Calendar />} />

          <Route path='/challenes/:challenegeId/posts/new' element={<PostEditor />} />

          <Route path='/challenges/:challengeId/posts/:postId' element={<PostEditor />} /> 
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App;
