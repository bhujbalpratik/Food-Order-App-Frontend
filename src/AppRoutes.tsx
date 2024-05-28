import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomePage } from "./pages/HomePage"
import { AuthCallbackPage } from "./pages/AuthCallbackPage"
import { UserProfilePage } from "./pages/UserProfilePage"
import { ProtectedRoute } from "./auth/ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}
export default AppRoutes
