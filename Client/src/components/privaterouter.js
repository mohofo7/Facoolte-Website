import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import cookie from 'react-cookies'
import Loading from 'components/loading'
import Config from 'Config.js'
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
        isLoading:true,
        user:{}
      }
    })
    if(cookie.load('token')){
      let header = {
        'Authorization': 'Bearer ' + cookie.load('token')
      }
      axios.get(Config.serverAdd + '/users/checkToken', {headers: header})
              .then((response) => {
                  if(response.status === 200){
                    if(this._isMounted){
                      this.setState(() => {
                        return {
                          isAuthenticated: true,
                          isLoading: false,
                          user:response.data.user
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
                cookie.remove('token')
                this.setState(() => {
                  return {
                    isLoading: false
                  }
                })
              })
    }
    else{
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
    if(!this.state.isLoading){
      return(
        <Route {...rest} render={(props) => (
          this.state.isAuthenticated === true
            ? <Component user={this.state.user} {...props} />
            : <Redirect to={{
              pathname: '/auth/login'
              }} />
        )} />
    )}
    else
      return<Loading />
  }
}
export default PrivateRoute;