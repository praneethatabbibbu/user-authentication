import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import Account from './Account'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated : false
        }
    }

    componentDidMount(){
        if(localStorage.getItem('userAuthToken')){
            this.setState({ isAuthenticated : true })
        }
    }

    handleLog =(bool) => {
        this.setState({ isAuthenticated : bool })
    } 
    render(){
        console.log(this.state)
        return(
            <div>
                <BrowserRouter>
                    <ul>
                        {this.state.isAuthenticated && (
                            <div>
                                <li><Link to = '/users/account'> Account </Link></li>
                                <li><Link to = '/users/logout'> Logout </Link></li>
                            </div>
                        )}
                        {!this.state.isAuthenticated && (
                            <div>
                                <li><Link to = '/users/register'>Register</Link></li>
                                <li><Link to = '/users/login'>Login</Link></li>
                            </div>
                        )}
                        
                    </ul>
                    <Switch>
                    {this.state.isAuthenticated && (
                        <div>
                            <Route path = '/users/account' component = {Account} />
                            <Route path = '/users/logout' render = {(props) => {
                                return <Logout {...props} handleLog = {this.handleLog} />
                            }} />
                        </div>
                    )}
                    {!this.state.isAuthenticated && (
                        <div>
                            <Route path = '/users/register' component = {Register} />
                            <Route path = '/users/login' render = {(props) => {
                                return <Login {...props} handleLog = {this.handleLog} />
                            }} />
                        </div>
                    )}
                    <Route render = {() => {
                        return <h3> The page you are looking doesnot exist</h3>
                    }} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))