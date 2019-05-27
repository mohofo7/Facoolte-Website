import React from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import BlockUi from 'react-block-ui';
import ReactPlayer from 'react-player';
const axios = require('axios')

class Icons extends React.Component {
  state = {
    videoID: '',
    videoData: '',
    blocking: false,
    isLoading: false
  };
  componentDidMount(){
    console.log(this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1))
    this.setState({
      isLoading: true,
      videoID: this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1)
    });
    let url = 'http://193.176.242.103:8400/video/'.concat(this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1))
    console.log(url)
    axios.get(url)
      .then((response)=> {
        this.setState(() => {
          return {
            videoData: response.data
          }
        })
      })
      .catch((error)=> {
        // handle error
        console.log(error);
      })
      .finally(()=> {
        // always executed
      });
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0 persianWithrtl">{this.state.videoData.title}</h3>
                </CardHeader>
                <CardBody align="center">
                  <BlockUi tag="div" blocking={this.state.blocking}>
                    <ReactPlayer url={this.state.videoData.video_url} controls/>
                  </BlockUi>
                  <CardText className="persian m-2">
                  برای استفاده از این ویدیو باید خریداری نمایید
                  </CardText>
                  <Button
                    color="primary"
                    className="persian"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                  خرید به مبلغ {this.state.videoData.price}
                  </Button>
                </CardBody>
                <CardFooter>
                  <CardText className="persianWithrtl cardDiscribe">{this.state.videoData.description}</CardText>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Icons;
