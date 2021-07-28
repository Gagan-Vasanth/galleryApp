import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Signin/Signin';
import Gallery from './components/Gallery/Gallery';
import PrivateRoute from './reusables/PrivateRoute/PrivateRoute';

function App() {
  return (
   <Router>
     <Switch>
        <Route exact path='/' render={ () => <Redirect to="/signin" />} />
        <Route path="/signin" component={Login} />
        <PrivateRoute path="/gallery" component={Gallery} />
     </Switch>
   </Router>
  );
}

export default App;
