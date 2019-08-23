import React from 'react'
import axios from 'axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username : '',
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
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        console.log(formData)
        axios.post('http://localhost:3007/users/register', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.errors){
                    alert(response.data.errors)
                }else{
                    this.props.history.push('/users/login')
                }
            })
    }
    
    render(){
        return(
            <div>
                <h2> Register </h2>
                <form onSubmit = {this.handleSubmit}>
                <label>
                    Username : 
                    <input type = 'text' value = {this.state.value} name = 'username' placeholder = 'Enter name' onChange = {this.handleChange} />
                </label><br />
                <label>
                    Email :
                    <input type = 'text' value = {this.state.value} name = 'email' placeholder = 'Enter email' onChange = {this.handleChange} />
                </label><br />
                <label>
                    Password :
                    <input type = 'text' value = {this.state.value} name = 'password' placeholder = 'Password' onChange = {this.handleChange} />
                </label><br />
                <input type = 'submit' />
                </form>
            </div>
        )
    }
}
export default Register