import axios from "axios"
import * as React from 'react'
import Row from "react-bootstrap/Row"
import ScoopOption from "./ScoopOption"
import ToopingOption from "./ToopingOption"
import AlertBanner from "../common/AlertBanner"


export default function Options({ optionType }) {
    const [items, setItems] = React.useState([])
    const [error, setError] = React.useState(false)
    //OptionType is 'scoops or 'toopings
    React.useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).then((response) => setItems(response.data)).catch((error) => {
            setError(true)
        })
    }, [optionType])
    if (error) {
        return <AlertBanner />
    }
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;
    const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)
    return (
        <Row>
            {optionItems}
        </Row>
    )
}