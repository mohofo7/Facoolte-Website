import React from 'react';
import 'react-block-ui/style.css';
import Loading from '../../components/loading';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBlocking = this.toggleBlocking.bind(this);
    this.state = {
      blocking: false,
    };
  }

  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }

  render() {
    return (
      <div align="center">
        <Loading/>
      </div>
    );
  }
}