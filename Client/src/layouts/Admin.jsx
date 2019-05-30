import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container,Row , Col } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AuthFooter from "components/Footers/AuthFooter.jsx"

import routes from "routes.js";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content" ref="mainContent">
          
          <AdminNavbar user={this.props.user}/>

          <div className="header bg-gradient-dark py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white persian">فاکولته</h1>
                    <p className="text-lead text-light persian">
                      شبکه آموزشی آنلاین
                      فاکولته در زبان فرانسوی به معنای دانشکده است و این کلمه در گذشته در ایران رواج داشته است
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>

          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AuthFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
