import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Input,
  Button,
  Modal, ModalBody, ModalFooter
} from "reactstrap";
import {
  Redirect
} from 'react-router-dom'
import Config from 'Config.js'
import cookie from 'react-cookies'
const axios = require('axios')

class AdminNavbar extends React.Component {

  constructor(props){
    super(props)
    this.logoutLink = this.logoutLink.bind(this)
    this.logoutToggle = this.logoutToggle.bind(this)
    this.logout = this.logout.bind(this)

    this.creditLink = this.creditLink.bind(this)
    this.creditToggle = this.creditToggle.bind(this)
    this.credit = this.credit.bind(this)

    this.supportLink = this.supportLink.bind(this)
    this.supportToggle = this.supportToggle.bind(this)

    this.state={
      creditModal:false,
      logoutModal:false,
      supportModal:false,
      redirectToAuth: false
    }
  }

  supportToggle(){
    this.setState(prevState => ({
      supportModal: !prevState.supportModal
    }));
  }

  supportLink(e){
    e.preventDefault()
    this.supportToggle()
  }

  creditLink(e){
    e.preventDefault()
    this.creditToggle()
  }

  creditToggle(){
    this.setState(prevState => ({
      creditModal: !prevState.creditModal
    }));
  }

  credit(){
    console.log('credit')
  }

  logoutToggle(){
    this.setState(prevState => ({
      logoutModal: !prevState.logoutModal
    }));
  }
  logoutLink(e){
    e.preventDefault()
    this.logoutToggle()
  }
  logout(){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + cookie.load('token')
    }
    let body = {}
    axios.post(Config.serverAdd + '/logout', body, {
        headers: headers
      })

      .then((response) => {
        if (response.status === 200) {
          
          cookie.remove('token')
          this.setState(() => {
            return {
              redirectToAuth: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    if (this.state.redirectToAuth)
      return <Redirect to = '/' />
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require("assets/img/brand/Facoolte-Logo.svg")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="mr-auto persianWithrtl pr-1" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to=' '
                    onClick={this.creditLink}
                    tag={Link}
                  >
                    <i className="ni ni-money-coins" />
                    <span className="nav-link-inner--text persian">افزایش اعتبار</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to=' '
                    onClick={this.supportLink}
                    tag={Link}
                  >
                    <i className="ni ni-support-16" />
                    <span className="nav-link-inner--text persian">پشتیبانی</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to=' '
                    onClick={this.logoutLink}
                    tag={Link}
                  >
                    <i className="ni ni-user-run" />
                    <span className="nav-link-inner--text persian">خروج</span>
                  </NavLink>
                </NavItem>
                <NavItem active={false}>
                  <NavLink
                    className="nav-link-icon"
                    to=' '
                    disabled
                    tag={Link}
                  >
                    <i className="ni ni-basket" />
                    <span className="nav-link-inner--text persian">اعتبار شما : {this.props.user.credit} هزار تومان</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>

          <Modal isOpen={this.state.logoutModal} toggle={this.logoutToggle} className={this.props.className}>
            <ModalBody>
              <p className="persianWithrtl mb-0">می خواهید خارج شوید؟</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.logout} className="ml-2 persian">بله</Button>{' '}
              <Button className="persian" color="secondary" onClick={this.logoutToggle}>بیخیال</Button>
            </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.creditModal} toggle={this.creditToggle} className={this.props.className}>
            <ModalBody>
              <p className="persianWithrtl">مبلغ درخواستی خود را وارد نمایید:</p>
              <Input
                type="number"
                name="credit"
                id="creditInput"
                className="persian"
                placeholder="مبلغ(به تومان)"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.credit} className="ml-2 persian">شارژ</Button>{' '}
              <Button className="persian" color="secondary" onClick={this.creditToggle}>بیخیال</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.supportModal} toggle={this.supportToggle} className={this.props.className}>
            <ModalBody>
              <p className="persianWithrtl">مشکلات،پیشنهادات و انتقادات خود را با ما در میان بگذارید</p>
              <p>facoolteir@gmail.com</p>
            </ModalBody>
            <ModalFooter>
              <Button className="persian" color="secondary" onClick={this.supportToggle}>بیخیال</Button>
            </ModalFooter>
          </Modal>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
