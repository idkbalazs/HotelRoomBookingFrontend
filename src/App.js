import React, {useState} from 'react';
import darkTheme from "./AppTheme";
import {AuthContext} from "./components/connection/Auth";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from './components/basic/Footer';
import MainContent from './components/basic/MainContent'
import Header from "./components/basic/Header";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Profile from "./components/profile/Profile";
import Booking from "./components/booking/Booking";
import PrivateRoute from "./components/connection/PrivateRoute";
import Reservations from "./components/Reservations/UserReservations";
import Admin from "./components/Reservations/AllReservations";

function App() {
  const existingTokens = JSON.parse(sessionStorage.getItem("currentUser"))
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if(data){
      sessionStorage.setItem('currentUser', JSON.stringify(data))
    } else {
      sessionStorage.clear();
    }
    setAuthTokens(data);
  }

  return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <div>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
              <Header/>
              <Switch>
                <Route exact path="/" component={MainContent} />
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>
                <PrivateRoute path="/my-profile" component={Profile} />
                <PrivateRoute path="/user" component={Booking} />
                <PrivateRoute path="/reservations" component={Reservations} />
                <PrivateRoute path="/admin" component={Admin} />
              </Switch>
              <Footer/>
            </Router>
          </ThemeProvider>
        </div>
      </AuthContext.Provider>
  );
}

export default App;
