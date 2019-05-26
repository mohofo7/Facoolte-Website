import React from "react";
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
import cookie from 'react-cookies'
import {
  Redirect
} from 'react-router-dom'

const axios = require('axios');
class Register extends React.Component {

  
  constructor(props){
    super(props)
    this.registerSubmit = this.registerSubmit.bind(this)
    this.state = {
      redirectToReferrer: false
    }
  }

  registerSubmit(event, errors, values) {
    event.preventDefault()
    let headers = {
      'Content-Type': 'application/json'
    }
    let body = { 
      name: event.target.name.value,
      username: event.target.email.value,
      password: event.target.pass.value,
      email: event.target.email.value
    }
    axios.post('http://192.168.1.106:8400/users/register', body, {headers: headers})

            .then((response) => {
                console.log("Sucseed!")
                console.log(response)
                if(response.status === 201){
                  let token = response.data.token
                  console.log(token)
                  cookie.save('token', token)
                  this.setState(() => {
                    return {
                      redirectToReferrer: true
                    }
                  })
                }
            })
            .catch((error) => {
                console.log(error)
            })
  }

  render() {
    if(this.state.redirectToReferrer)
      return <Redirect to = '/' />
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-dark mb-4 persian">
                <h2>ثبت نام</h2>
              </div>
              <Form role="form" onSubmit={this.registerSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="persian" placeholder="نام" type="text" name="name" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
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
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        required
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted persian">
                          تمامی{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            قوانین و شرایط استفاده
                          </a>
                          {" "}را می پذیرم
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button 
                  className="mt-4 persian btn-block" 
                  color="primary" 
                  type="submit"
                  >
                    ثبت نام
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
