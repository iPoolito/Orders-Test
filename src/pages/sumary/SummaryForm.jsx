import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useNavigate } from 'react-router-dom'

export function SummaryForm() {
    const [isButtonEnable, setIsButtonEnable] = React.useState(false)
    const navigate = useNavigate()

    const HanldeTermsAndConditions = (event) => {
        setIsButtonEnable(event.target.checked)

    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                No ice cream will actually be delivered
            </Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to

            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: 'blue' }}>Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    )
    return (
        <Form onSubmit={() => navigate('/order')}>
            <Form.Group controlId='terms-and-conditions'>
                <Form.Check type="checkbox" checked={isButtonEnable} onChange={HanldeTermsAndConditions} label={checkboxLabel} />
                <Button variant='primary' type='submit' disabled={!isButtonEnable} > Confirm Order</Button>
            </Form.Group>
        </Form>
    )
}