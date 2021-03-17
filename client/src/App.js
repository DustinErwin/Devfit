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
import "./App.css";
import IsShoppingContext from "./utilities/isShoppingContext";

function App() {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const [userLogged, setUserLogged] = useState(false);
  const [isShopping, setIsShopping] = useState();
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    role: "",
    gender: "",
  });

  const value = { isShopping, setIsShopping };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/user/${user.email}`)
        .then((response) => response.json())
        .then((currentUser) => {
          setUserInfo({
            ...userInfo,
            _id: currentUser._id,
            email: currentUser.email,
            firstName: currentUser.first_name,
            lastName: currentUser.last_name,
            fullName: `${currentUser.first_name} ${currentUser.last_name}`,
            role: currentUser.role,
            gender: currentUser.gender,
          });
          setUserLogged(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.log(isAuthenticated, "Auth");
    console.log(userInfo);
    if (!isShopping && isAuthenticated) {
      if (userInfo.role) {
        setUserRole(<Redirect to={`/${userInfo.role}`} />);
      } else {
        setUserRole(<Redirect to={`/registration`} />);
      }
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
      setUserLogged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged]);

  return (
    <UserContext.Provider value={userInfo}>
      <div className="App">
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <IsShoppingContext.Provider value={value}>
            <Route path="/member" component={MemberPage} />
            <Route path="/member-store" component={MemberStore} />
          </IsShoppingContext.Provider>
          <Route path="/employee" component={EmployeePage} />
          <Route path="/manager" component={ManagerPage} />
          <Route path="/registration" component={RegistrationPage} />
          {userRole ? userRole : null}
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
