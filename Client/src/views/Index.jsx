import React from "react";
import {
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import Config from "Config.js"
import Cards from "components/Card.jsx"
import Loading from "../components/loading";
const axios = require('axios')
class Index extends React.Component {

  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      numOfVideo: 0,
      videosData: [],
      videosDataToShow: [],
      isLoading: false
    }
  }
  

  onChange(e) {
    let res = []
    this.state.videosData.forEach((item)=>{
      let tmp = item.filter((i)=>{
        return i.description.includes(e.target.value) || i.title.includes(e.target.value)
      })
      tmp.forEach((i)=>{
        res.push(i)
      })
    })
    let result = []
    for (let i = 0; i <= Math.floor(res.length / 4); i++) {
      result.push(res.slice(i * 4, (i + 1) * 4))
    }
    this.setState(()=>{
      return{
        videosDataToShow: result
      }
    })
  }

  componentDidMount(){
    this.setState({
      isLoading: true
    });
    axios.get(Config.serverAdd + '/videos')
      .then((response)=> {
        let res = []
        for(let i = 0;i <= Math.floor(response.data.length/4);i++){
          res.push(response.data.slice(i*4 , (i+1)*4))
        }
        this.setState(() => {
          return {
            numOfVideo: response.data.length,
            videosData:res,
            videosDataToShow:res,
            isLoading: false
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
    if(this.state.isLoading){
      return (
        <div align="center">
        <Loading/>
      </div>
      )
    }
    
    return (
      <>
        <Container className="mt--8" fluid>
            <Form onChange={this.onChange} onSubmit={this.search} className="navbar-search navbar-search-dark mb-3">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="جست و جو" name="search" type="search" className="persian pr-0" />
                </InputGroup>
              </FormGroup>
            </Form>

            {this.state.videosDataToShow.map(arr =>
              <Row key={this.state.videosDataToShow.indexOf(arr)}>
                {arr.map(data => 
                  <Col
                    key={data.id}
                    lg = "6"
                    xl = "3"
                    className="mb-2"
                  >
                    <Cards 
                      cardDic={data.description} 
                      thumbnailSrc={data.thumbnail_url} 
                      cardTitle={data.title}
                      cardID={data.id}
                      className="mb-4 mb-xl-0"
                      />
                  </Col>
                )}
              </Row>
            )}
        </Container>
      </>
    );
  }
}

export default Index;
