import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardLayout } from "../DashboardLayout"

import Home from "../../pages/Home"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
import Events from "../../pages/Events"
import SelectRole from "../../pages/SelectRole"
import Admin from "../../pages/admin/Admin"

import Dashboard from "../../pages/dashboard/Dashboard"
import DashboardEvents from "../../pages/dashboard/Events"
import Invitations from "../../pages/dashboard/Invitations"
import Guests from "../../pages/dashboard/guests/Guests"
import Vendors from "../../pages/dashboard/Vendors"
import Reviews from "../../pages/dashboard/Reviews"
import PostWedding from "../../pages/dashboard/PostWedding"
import Venue from "../../pages/dashboard/venue/Venue"
import {VenueDetail} from "../../pages/dashboard/venue/VenueDetail"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/admin" element={<Admin />} />

        {/* Dashboard routes — DashboardLayout wraps all children via <Outlet /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<DashboardEvents />} />
          <Route path="guests" element={<Guests />} />
          <Route path="invitations" element={<Invitations />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="post-wedding" element={<PostWedding />} />
          <Route path="venue" element={<Venue />} />
          <Route path="venue/:id" element={<VenueDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}