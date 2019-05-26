import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import cookie from 'react-cookies'
const axios = require('axios')

class PrivateRoute extends React.Component{

  _isMounted = false;
  state = {
    isLoading: true,
    isAuthenticated:false
  }
  componentWillMount(){
    this._isMounted = true    
    this.setState(()=>{
      return{
        isLoading:true
      }
    })
    if(cookie.load('token')){
      console.log('token is here')
      let header = {
        'Authorization': 'Bearer ' + cookie.load('token')
      }
      axios.get('http://192.168.1.106:8400/users/checkToken', {headers: header})
              .then((response) => {
                  if(response.status === 200){
                    if(this._isMounted){
                      this.setState(() => {
                        return {
                          isAuthenticated: true,
                          isLoading: false
                        }
                      })
                    }
                  }
                  else{
                      cookie.remove('token')
                      if(this._isMounted)
                      this.setState(() => {
                        return {
                          isLoading: false
                        }
                      })
                  }
                  
              })
              .catch((error) => {
                console.log(error)
                this.setState(() => {
                  return {
                    isLoading: false
                  }
                })
              })
    }
    else{
      console.log('else')
      this.setState(() => {
        return {
          isLoading: false
        }
      })
    }
  }

  componentWillUnmount(){
    this._isMounted = false
  }
  render(){
    let {component: Component, ...rest} = this.props
    console.log('private rendered')
    if(!this.state.isLoading){
      console.log(this.state.isAuthenticated)
      return(
        <Route {...rest} render={(props) => (
          this.state.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/auth/login'
              }} />
        )} />
    )}
    else
      return<p>loading</p>
  }
}
export default PrivateRoute;