import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";

import Cards from "components/Card.jsx"
import Header from "components/Headers/Header.jsx";
const axios = require('axios')
class Index extends React.Component {
  state = {
    numOfVideo: 0,
    videosData: [],
    isLoading: false
  }

  componentDidMount(){
    this.setState({
      isLoading: true
    });
    axios.get('http://192.168.1.106:8400/videos')
      .then((response)=> {
        let res = []
        for(let i = 0;i <= Math.floor(response.data.length/4);i++){
          res.push(response.data.slice(i*4 , (i+1)*4))
        }
        console.log(res)
        this.setState(() => {
          return {
            numOfVideo: response.data.length,
            videosData:res,
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
      return <p>Loading</p>
    }
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
            {this.state.videosData.map(arr =>
              <Row key={this.state.videosData.indexOf(arr)}>
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
