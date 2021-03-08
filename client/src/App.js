import MemberPage from "./pages/memberPage/memberPage";
import EmployeePage from "./pages/employeePage/employeePage";
import ManagerPage from "./pages/managerPage/managerPage";
import RegistrationPage from "./pages/registrationPage/registrationPage";
import MemberStore from "./pages/memberStore/memberStore";
import { BrowserRouter as Switch, Redirect, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./utilities/userContext";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
  const [userInfo, setUserInfo] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    role: "",
    gender: "",
  });

  const [userRole, setUserRole] = useState(null);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const { email } = user;

      fetch(`/api/user/${email}`)
        .then((response) => response.json())
        .then((currentUser) => {
          setUserInfo({ ...userInfo, currentUser });
          if (currentUser) {
            setUserRole(<Redirect to={`/${currentUser.role}`} />);
          } else {
            setUserRole(<Redirect to={`/registration`} />);
          }
        });
    } else if (!isAuthenticated) {
      setUserInfo({
        ...userInfo,
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        fullName: "",
        role: "",
        gender: "",
      });
      setUserRole(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={userInfo}>
      <div className="App">
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/member" component={MemberPage} />
          <Route path="/employee" component={EmployeePage} />
          <Route path="/manager" component={ManagerPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/member-store" component={MemberStore} />
          {userRole ? userRole : null}
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
