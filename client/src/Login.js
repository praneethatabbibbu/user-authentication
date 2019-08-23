import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(formData)
        axios.post('http://localhost:3007/users/login', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.errors){
                    alert(response.data.errors)
                }else{
                    const token = response.data.token
                    localStorage.setItem('userAuthToken', token)
                    this.props.handleLog(true)
                    this.props.history.push('/users/account')
                }
            })
    }

    render(){
        return(
            <div>
                <h2> Login </h2>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Email :
                        <input type = 'text' placeholder = 'Enter Email' value = {this.state.value} name = "email" onChange = {this.handleChange} />
                    </label><br />
                    <label>
                        Password :
                        <input type = 'text' value = {this.state.value} name = 'password' placeholder = 'password' onChange = {this.handleChange} />
                    </label><br />
                    <input type = 'submit' />
                </form>
            </div>
        )
    }
}
export default Login