import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Gallery from './pages/Gallery/Gallery';
import About from './pages/AboutPage/AboutPage';
import Teachers from './pages/Teachers/Teachers';
import Courses from './pages/Courses/Courses';
import TeacherDetail from './pages/TeacherDetail/TeacherDetail';
import CreateCourse from './pages/CreateCourse/CreateCourse';  
import './index.css';

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import EditCourseForm from "./components/EditCourse/EditCourseForm";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit-course/:courseId" element={<EditCourseForm />} />
        
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/create-course"
          element={
            <IsPrivate>
              <CreateCourse />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

