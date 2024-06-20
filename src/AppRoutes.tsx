import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomePage } from "./pages/HomePage"
import { AuthCallbackPage } from "./pages/AuthCallbackPage"
import { UserProfilePage } from "./pages/UserProfilePage"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import { ManageRestaurantPage } from "./pages/ManageRestaurantPage"
import { SearchPage } from "./pages/SearchPage"
import RestaurantDetailPage from "./pages/RestaurantDetailPage"

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
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <RestaurantDetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>
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

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}
export default AppRoutes
