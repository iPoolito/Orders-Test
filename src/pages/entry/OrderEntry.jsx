import Options from "./Options"
import { useOrderDetails } from "../../contexts/OrderDetails"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function OrderEntry() {
    const [OrderDetails] = useOrderDetails()
    const navigate = useNavigate();
    const handleOrder = async () => {
        navigate('/review')
    }
    return (
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2> Grand total : {OrderDetails.totals.grandTotal}</h2>
            <button onClick={handleOrder}>Order sundae</button>
        </div>
    )
}