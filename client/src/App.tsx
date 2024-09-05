import Login from "./components/Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./components/Registeration"
import Home from "./components/Home"
import Error404 from "./components/Error404"
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:user" element={<UserProfile />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App