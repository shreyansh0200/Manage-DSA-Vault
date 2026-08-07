import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadQuestion from "./pages/UploadQuestion";
import WorkSpace from "./pages/WorkSpace";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <Routes>

            <Route 
                path="/" 
                element={<Login />} 
            />


            <Route 
                path="/register" 
                element={<Register />} 
            />


            <Route 
                path="/login" 
                element={<Login />} 
            />


            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>

                }

            />


            <Route

                path="/upload"

                element={

                    <ProtectedRoute>

                        <UploadQuestion />

                    </ProtectedRoute>

                }

            />


            <Route

                path="/workspace/:id"

                element={

                    <ProtectedRoute>

                        <WorkSpace />

                    </ProtectedRoute>

                }

            />


            <Route

                path="/profile"

                element={

                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>

                }

            />


            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}


export default App;