import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomePage } from "./pages/HomePage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/user-profile" element={<h1>User Profile</h1>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}
export default AppRoutes
