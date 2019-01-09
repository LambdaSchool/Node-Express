import React from 'react';
import {Container, Row } from 'reactstrap';
import NewPostForm from '../../components/NewPostForm/';

class CreatePost extends React.Component {
  render () {
    return (
      <Container>
        <Row>
            <NewPostForm />
        </Row>

      </Container>
    );
  }
}

export default CreatePost;
