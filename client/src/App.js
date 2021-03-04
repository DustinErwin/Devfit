import LoginPage from "./pages/loginPage";
import MemberPage from "./pages/memberPage";
import EmployeePage from "./pages/employeePage";
import ManagerPage from "./pages/managerPage";
import RegistrationPage from "./pages/registrationPage";
import MemberStore from "./pages/memberStore";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/member" component={MemberPage} />
        <Route path="/employee" component={EmployeePage} />
        <Route path="/manager" component={ManagerPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/member-store" component={MemberStore} />
      </Switch>
    </div>
  );
}

export default App;
