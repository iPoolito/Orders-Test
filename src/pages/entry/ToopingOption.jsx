import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

export default function ToopingOption({ name, imagePath, updateItemCount }) {
    const handleChange = (e) => {
        const value = e.target.checked ? 1 : 0
        updateItemCount(name, value)
    }
    return (

        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img style={{ width: '25%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} tooping`} />

            <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>


                <Form.Check type='checkbox' label={name} onChange={handleChange} />

            </Form.Group>
        </Col>

    )

}