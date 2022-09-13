import axios from 'axios'
import * as React from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { useNavigate } from 'react-router-dom'




export default function OrderConfirmation() {
    const navigate = useNavigate()
    const [, , resetOrder] = useOrderDetails()
    const [orderNumber, setOrderNumber] = React.useState(null)

    React.useEffect(() => {
        axios.post(`http://localhost:3030/order`).then((response) => {
            setOrderNumber(response.data.orderNumber)
        }).catch((error) => {

        })
    }, [])
    function handleClikc() {
        resetOrder()
        navigate('/')
    }

    if (orderNumber) {
        return (
            <div>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>

                <button onClick={handleClikc}>Create a new Order</button>
            </div>

        )
    } else {
        return (
            <div>loading....</div>
        )
    }

}