import React, { Component } from 'react';
import Navbar from './components/navbar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Photos from './pages/Photos'
import Shop from './pages/Shop'
import Support from './pages/Support';
import LoginForm from './components/auth/LoginForm';
import { Provider } from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import RegisterForm from './components/auth/RegisterForm';
import Order from './components/Order'
class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/videos' component={Videos} />
                        <Route path='/photos' component={Photos} />
                        <Route path='/shop' component={Shop} />
                        <Route path='/support' component={Support} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/register' component={RegisterForm} />
                        <Route path='/order' component={Order} />
                    </Switch>
                </Router>
            </Provider>
            
        )
    }
}

 
export default App;