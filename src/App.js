import { useEffect, useState } from "react";
import {
  BrowserRouter,
  // as Router
  // Route,
  // Link,
  // Routes,
  // Switch,
} from "react-router-dom";
// import _ from "lodash";
// import Navi from "./components/navigation/navi";
import AppRoutes from "./routes/appRoutes";
import "./App.scss";

function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        {/* <div className="app-header">
          <Navi />
        </div> */}
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
