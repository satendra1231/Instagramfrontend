import React from 'react'
import { Button, Modal } from 'antd';

const ShowSingleBlog = (props) => {
    // console.log(props.ele)
    let ele = props.ele
    return (
      <>
        <Modal width={1000}
          title={<p>Loading Modal</p>}
          footer={
            <Button type="primary" onClick={props.showLoading}>
              Reload
            </Button>
          }
          loading={props.loading}
          open={props.open}
          onCancel={() => props.setOpen(false)}
        >
       <div className="card mb-3"  >
    <div className="row g-0" >
      <div className="col-md-6 ">
      {ele.file.split('/')[4] === 'image' ? <img src={ele.file} className="img-fluid rounded-start" alt="..." style={{height:"300px"}} /> :
                                <video  height={350} width={400} controls src={ele.file}></video>
                            }
      </div>
      <div className="col-md-6 ">
        <div className="card-body">
          <h2 className="card-title">UserName : {ele.userId.name}</h2>
          <h4 className="card-title">Title : {ele.title}</h4>
          <h6 className="card-text">Description : {ele.description}</h6>
          <h6 className="card-text">Likes : {ele.likes.length>0? ele.likes.length:0} </h6>
          <h6 className="card-text">comments : {ele.comments.length>0? ele.comments.length:0} </h6>
          <h6 className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></h6>
        </div>
      </div>
    </div>
  </div>
  
        </Modal>
      </>
    );
  };
  

export default ShowSingleBlog
