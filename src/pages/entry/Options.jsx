import axios from "axios"
import * as React from 'react'
import Row from "react-bootstrap/Row"
import ScoopOption from "./ScoopOption"


export default function Options({ optionType }) {
    const [items, setItems] = React.useState([])
    //OptionType is 'scoops or 'toopings
    React.useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).then((response) => setItems(response.data)).catch((error) => {
            //ToDO: handle error Response
        })
    }, [optionType])

    //TODO: replace `null`with Topping Option when avvailable
    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;
    const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)
    return (
        <Row>
            {optionItems}
        </Row>
    )
}