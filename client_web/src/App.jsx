import { Route, Routes } from "react-router-dom";
import { common, pathAdmin, pathCreator } from "./utils/path";
import { Login } from "./pages/common";
import {
  AdminLayout,
  ManageEvent,
  ManageUser,
  Calendar,
  UserDetail,
  EventDetail,
  Chart,
} from "./pages/admin";
import CheckLogin from "./pages/common/CheckLogin";
import { CreateEvent, CreatorLayout } from "./pages/creator";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<CheckLogin />} />
      <Route path={common.LOGIN} element={<Login />} />
      <Route path={pathAdmin.ADMIN} element={<AdminLayout />}>
        <Route path={pathAdmin.CALENDAR} element={<Calendar />} />
        <Route path={pathAdmin.MANAGE_EVENT} element={<ManageEvent />} />
        <Route path={pathAdmin.MANAGE_USERS} element={<ManageUser />} />
        <Route path={common.DASHBOARD} element={<Chart />} />
        <Route path={`${pathAdmin.USERDETAIL}/:id`} element={<UserDetail />} />
        <Route path={`${common.EVENTDETAIL}`} element={<EventDetail />} />
      </Route>
      <Route path={pathCreator.CREATOR} element={<CreatorLayout />}>
        <Route path={pathCreator.CREATE_EVENT} element={<CreateEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
