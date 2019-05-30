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
  Modal, ModalBody, ModalFooter,
}
from "reactstrap";
// core components
import ReactLoading from "react-loading";
import ReactPlayer from 'react-player';
import cookie from 'react-cookies'
import {
  ToastContainer,
  toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const axios = require('axios')


class Icons extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      videoID: '',
      videoData: '',
      blocking: false,
      isLoading: false,
      modal: false,
      loadingModal: false,
      failAlert: false,
    }


    this.toggle = this.toggle.bind(this)
    this.buyVideoButton = this.buyVideoButton.bind(this)
    this.buyVideo = this.buyVideo.bind(this)
    this.loadingToggle = this.loadingToggle.bind(this)
    this.failToggle = this.failToggle.bind(this)
  }
  
  componentDidMount(){
    this.setState({
      isLoading: true,
      videoID: this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1)
    });
    let url = 'http://192.168.1.106:8400/video/'.concat(this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1))
    let header = {
      'Authorization': 'Bearer ' + cookie.load('token')
    }
    axios.get(url , { headers : header})
      .then((response)=> {
        this.setState(() => {
          return {
            videoData: response.data,
            blocking: !response.data.permit,
            isLoading: false
          }
        })
      })
      .catch((error)=> {
        // handle error
        console.log(error);
      })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  failToggle(){
    this.setState(prevState => ({
      failAlert : !prevState.failAlert
    }))
  }

  buyVideoButton(e){
    e.preventDefault()
    this.toggle()
  }

  loadingToggle(){
    this.setState(prevState => ({
      loadingModal: !prevState.loadingModal
    }));
  }

  buyVideo(e){
    e.preventDefault()
    console.log("buy")
    this.loadingToggle()
    let url = 'http://192.168.1.106:8400/buyVideo/'.concat(this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1))
    let header = {
      'Authorization': 'Bearer ' + cookie.load('token')
    }
    axios.get(url, {
        headers: header
      })
      .then((response) => {
        if(response.status === 200){
          this.loadingToggle()
          this.toggle()
          this.componentDidMount()
          toast.success(<p className="persianWithrtl">خرید با موفقیت انجام شد</p>, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false
          });
        }
      })
      .catch((error) => {
        this.loadingToggle()
        this.toggle()
        toast.error(<p className="persianWithrtl">لطفا حساب خود را شارژ کنید!</p>, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false
        });
        console.log('this is error : ' ,error);
      })
  }

  render() {
    let vid
    if(this.state.isLoading)
      vid = <ReactLoading type={"bubbles"} color={'#1A535C'} height={'5%'} width={'10%'}/>
    else{
      if(this.state.blocking)
        vid = <img src={this.state.videoData.thumbnail_url} alt="video" className="img-fluid"></img> 
      else
        vid = <ReactPlayer url={this.state.videoData.video_url} controls className="img-fluid"/>
    }
    
    return (
      <>
          
          <Container className=" mt--7" fluid>
            <Row>
              <div className=" col">
                <ToastContainer
                  position="top-center"
                  autoClose={false}
                  newestOnTop
                  closeOnClick={false}
                  rtl
                  pauseOnVisibilityChange={false}
                  draggable={false}
                />
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0 persianWithrtl">{this.state.videoData.title}</h3>
                  </CardHeader>
                  <CardBody align="center">
                      {vid}
                    {this.state.blocking && <CardText className="persian m-2">
                    برای استفاده از این ویدیو باید خریداری نمایید
                    </CardText>}
                    {this.state.blocking && <Button
                      color="primary"
                      className="persian"
                      href="#pablo"
                      onClick={this.buyVideoButton}
                    >
                    خرید به مبلغ {this.state.videoData.price}
                    </Button>}
                  </CardBody>
                  <CardFooter>
                    <CardText className="persianWithrtl cardDiscribe">{this.state.videoData.description}</CardText>
                  </CardFooter>
                </Card>
              </div>
            </Row>
          </Container>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalBody>
              <p className="persianWithrtl mb-0">مایل به خریداری این ویدیو هستید؟</p>
              <p className="persianWithrtl">مبلغ {this.state.videoData.price}  تومان از حساب شما کسر خواهد شد</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.buyVideo} className="ml-2 persian">خرید</Button>{' '}
              <Button className="persian" color="secondary" onClick={this.toggle}>بیخیال</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.loadingModal} toggle={this.loadingToggle} className={this.props.className}>
            <ModalBody>
              <ReactLoading type="bubbles" color={'#1A535C'} height={'5%'} width={'10%'} />
            </ModalBody>
          </Modal>
      </>
    );
  }
}

export default Icons;
