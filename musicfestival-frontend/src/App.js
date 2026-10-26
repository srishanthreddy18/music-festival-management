import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import AddFestival from "./components/AddFestival";
import ViewFestivals from "./components/ViewFestivals";
import EditFestival from "./components/EditFestival";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<ViewFestivals />}
                />

                <Route
                    path="/add"
                    element={<AddFestival />}
                />

                <Route
                    path="/edit/:id"
                    element={<EditFestival />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;