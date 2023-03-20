import { NavLink, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import HooksItem from "./HooksItem";
import FileWrapper from "./FileWrapper";

function App() {
  return (
    <div>
      <div className="header">
        <NavLink to="/" exact>
          Recursive Component
        </NavLink>
        <NavLink to="/hooks">Hooks</NavLink>
      </div>

      <Switch>
        <Route path="/" exact component={FileWrapper} />
        <Route path="/hooks" component={HooksItem} />
      </Switch>
    </div>
  );
}

export default App;
