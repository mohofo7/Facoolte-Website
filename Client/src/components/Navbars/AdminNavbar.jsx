import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="persian h2 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              فاکولته
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input className="persian" placeholder="جست و جو" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="mr-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Jessica Jones
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" left='true'>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0 persianWithrtl">خوش آمدید</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <div className="text-right">
                      <i className="ni ni-single-02" />
                      <span className="persianWithrtl mr-1">افزایش اعتبار</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <div className="text-right">
                      <i className="ni ni-support-16" />
                      <span className="persianWithrtl mr-1">پشتیبانی</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    <div className="persianWithrtl">
                      <i className="ni ni-user-run" />
                      <span className="mr-1">خروج!</span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
