import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const bulletin = () => (
    <Container>
        <Row>
            <Col xl={6}>1</Col>
            <Col xl={6}>1</Col>
        </Row>
        <Row>
            <Col xl={6}>2</Col>
            <Col xl={6}>2</Col>
        </Row>
    </Container>
);

export default bulletin;