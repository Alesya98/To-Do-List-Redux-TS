import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./Login";
import PrivateRouter from "./PrivateRouter";
import SignIn from "./SignIn";
import { ToDo } from "./ToDo";


function App() {

  return (
    <>
      <Routes>
        <Route path="/registre" element={<Login />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route element={<PrivateRouter />}>
          <Route path="/todo" element={<ToDo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;