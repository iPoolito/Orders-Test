import axios from "axios"
import * as React from 'react'
import Row from "react-bootstrap/Row"
import ScoopOption from "./ScoopOption"
import ToopingOption from "./ToopingOption"
import AlertBanner from "../common/AlertBanner"
import { pricePerItem } from "../../constants"
import { useOrderDetails } from "../../contexts/OrderDetails"
import { formatCurrency } from "../../utilities"


export default function Options({ optionType }) {
    const [items, setItems] = React.useState([])
    const [error, setError] = React.useState(false)
    const [OrderDetails, updateItemCount] = useOrderDetails()
    //OptionType is 'scoops or 'toppings
    React.useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).then((response) => setItems(response.data)).catch((error) => {
            setError(true)
        })
    }, [optionType])
    if (error) {
        return <AlertBanner />
    }
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()
    const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)} />)
    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {OrderDetails.totals[optionType]}</p>
            <Row>{optionItems}</Row>
        </>
    )
}