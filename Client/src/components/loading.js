import React from 'react';
import ReactLoading from "react-loading";


const Loading = (props) => {
  return (
    < div style = {
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }
    } >
      <ReactLoading type={"bubbles"} color={'#1A535C'} height={'5%'} width={'10%'}/>
    </div>
  );
};

export default Loading;