import React, { Component } from 'react';
import {withCookies, Cookies} from 'react-cookie'
import { Redirect } from 'react-router-dom';


const axios = require('axios').default;

interface State{
    email:string;
    password:string;
    message:string;
}

interface Props{
    cookies:Cookies
}

class LoginScreen extends Component<Props, State> {


    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            message:'',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }


    handleChange(event){
        const target = event.target
        const name = target.name

        this.setState((prevState:State, props) => ({
            ...prevState,
            [name]:target.value
        })
        )
    }

    updateMessage(message){
        this.setState({message})
    }

    handleLogin(event){
        const {email, password} = this.state

        if(isBlank(email) || isBlank(password)){
            this.updateMessage('Email o contraseña mala.')
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:3500/auth/login',
                data:{email, password}
            }).then(response => {
                if(response.data === 'Invalid credentials.'){
                    this.updateMessage('Email o contraseña mala.')
                }else{
                    this.props.cookies.set('session', response.data)
                }
            }).catch(error => this.updateMessage('Email o contraseña mala.'))
        }

    }


    render (){
        return (
            <form>
                {!!this.props.cookies.get('session')?
                <Redirect to='/panel'/>
                :
                <React.Fragment>
                <h3>Ingresar</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type='email' name='email' className='form-control' placeholder='email' onChange={this.handleChange}/>
                </div>

                <div className='form-group'>
                    <label>Contraseña</label>
                    <input type='password' name='password' className='form-control' placeholder='Contraseña' onChange={this.handleChange}/>
                </div>
                <div>
                    <label>{this.state.message}</label>
                </div>
            
                <button type='button' onClick={this.handleLogin}> Ingresar </button>
                <p className='registrar-usuario'>
                    Aun no tiene un usuario? <a href='/register'> Registrarse</a> 
                </p>
                </React.Fragment>}
            </form>
        );
    }
}

export default withCookies(LoginScreen)


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
