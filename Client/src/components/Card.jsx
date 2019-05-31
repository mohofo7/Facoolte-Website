import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";
import {
  Redirect
} from 'react-router-dom'

class Cards extends React.Component {

  constructor(props){
    super(props)
    this.goToWatch = this.goToWatch.bind(this)
    this.state = {
      id: props.cardID,
      redirectToReferrer : false,
      pathToRedirect: ''
    }
  }
  goToWatch(e){
    e.preventDefault()
    this.setState(()=>{
      return{
        redirectToReferrer: true,
        pathToRedirect:'/admin/video/' + this.state.id
      }
    })
  }
  render() {
    if(this.state.redirectToReferrer)
      return <Redirect to = {this.state.pathToRedirect} />
    return (
      <>
        <Card >
          <div className="cardImg">
            <CardImg
              alt="..."
              src={this.props.thumbnailSrc}
              top
            />
          </div>
          <CardBody>
            <CardTitle className="persianWithrtl">
              
              {this.props.cardTitle}
            </CardTitle>
            <CardText className="persianWithrtl cardDiscribe"><i className="pl-1 ni ni-ruler-pencil" />{this.props.cardDic}</CardText>
            <Button
              color="primary"
              className = "persian nav-link-inner--text"
              onClick={this.goToWatch}
            >
              تماشای ویدیو
            <i className="ni ni-button-play pr-2" />
            </Button>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Cards;