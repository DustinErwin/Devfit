import LoginPage from "./pages/loginPage/loginPage";
import MemberPage from "./pages/memberPage/memberPage";
import EmployeePage from "./pages/employeePage/employeePage";
import ManagerPage from "./pages/managerPage/managerPage";
import RegistrationPage from "./pages/registrationPage/registrationPage";
import MemberStore from "./pages/memberStore/memberStore";
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
