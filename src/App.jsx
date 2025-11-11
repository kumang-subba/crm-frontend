import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import AuthLayout from "./pages/auth/AuthLayout";
import Demo from "./pages/demo/Demo";
import AuthProvider from "./providers/AuthProvider";
import Crm from "./pages/Crm";
import NotificationProvider from "./providers/NotificationProvider";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "/crm-frontend"}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/crm" element={<Crm />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
