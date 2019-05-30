import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha"
import {
  Redirect
} from 'react-router-dom'
import cookie from "react-cookies";
import {
  ToastContainer,
  toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios')

class Login extends React.Component {
  constructor(props){
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
    this.registerPage = this.registerPage.bind(this)
    this.onReCaptchaChange = this.onReCaptchaChange.bind(this)
    this.onReCaptchaExpired = this.onReCaptchaExpired.bind(this)
    this.state ={
      redirectToReferrer: false,
      redirectToRegister: false,
      authenticated:false
    }
  }
  registerPage(){
    this.setState(()=>{
      return {
        redirectToRegister: true
      }
    })
  }

  onReCaptchaChange(value){
    if(value != null)
      this.setState(()=>{
        return{
        authenticated:true
      }})
    console.log(value)
  }

  onReCaptchaExpired(){
    this.setState(() => {
      return {
        authenticated: false
      }
    })
  }
  loginSubmit(event , error , values){
    event.preventDefault()
    if(!this.state.authenticated){
      toast.error(<p className="persianWithrtl">ReCaptcha بد درستی وارد نشده!</p>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false
      });
      return
    }
    let headers = {
      'Content-Type': 'application/json',
    }
    let body = { 
      username: event.target.email.value,
      password: event.target.pass.value
    }
    axios.post('http://192.168.1.106:8400/users/login', body, {headers: headers})

            .then((response) => {
                if(response.status === 200){
                  let token = response.data.token
                  console.log(token)
                  cookie.save('token' , token)
                  this.setState(()=>{
                    return{
                      redirectToReferrer:true
                    }
                  })
                }
            })
            .catch((error) => {
              toast.error(<p className="persianWithrtl">ایمیل یا رمز وارد شده اشتباه است</p>, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false
              });
            })
  }
  render() {
    if (this.state.redirectToReferrer)
      return <Redirect to = '/' />
    if (this.state.redirectToRegister)
      return <Redirect to = '/auth/register'/>
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop
          closeOnClick={false}
          rtl
          pauseOnVisibilityChange={false}
          draggable={false}
        />
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-dark mb-4 persian">
                <h2>ورود به سایت</h2>
              </div>
              <Form role="form" onSubmit={this.loginSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="persian" placeholder="ایمیل" type="email" name="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="persian" placeholder="رمز عبور" type="password" name="pass"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted persian">به خاطر بسپار</span>
                  </label>
                </div>
                <div align="center" className="mr--2 mt-3">
                <ReCAPTCHA
                  sitekey = "6LcKSaYUAAAAADR64yw6EWtBHTmfGxlfyY-bb8sU"
                  onChange={this.onReCaptchaChange}
                  onExpired={this.onReCaptchaExpired}
                />
                </div>
                <div className="text-center mt--3">
                  <Button className="my-4 persian" color="primary" type="submit">
                    ورود
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-center" xs="6">
              <a
                className="text-dark persian"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>فراموشی پسوورد</small>
              </a>
            </Col>
            <Col className="text-center" xs="6">
              <a
                className="text-dark persian"
                href="#pablo"
                onClick={this.registerPage}
              >
                <small>ثبت نام</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
