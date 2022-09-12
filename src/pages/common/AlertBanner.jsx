import Alert from 'react-bootstrap/Alert'

export default function AlertBanner({ message, variant }) {
    const alertMessage = message || 'An unexpected error ocurred. Please try again later'
    const alertVariant = variant || 'danger'
    return (
        <Alert variant={variant} style={{ backgroundColor: 'red' }}>
            {alertMessage}
        </Alert>
    )
}