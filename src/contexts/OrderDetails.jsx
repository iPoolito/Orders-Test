import * as React from 'react'
import { pricePerItem } from '../constants'
import { formatCurrency } from '../utilities'



const OrderDetails = React.createContext()

//create custom hook to check wether we're inside a provider


export function useOrderDetails() {
    const context = React.useContext(OrderDetails)
    if (!context) {
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
    }
    return context
}

function calculatesSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}


export function OrderDetailsProvider(props) {

    const [optionCounts, setOptionCounts] = React.useState({
        scoops: new Map(),
        toppings: new Map()
    })
    const zeroCurrency = formatCurrency(0)
    const [totals, setTotals] = React.useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    })

    React.useEffect(() => {
        const scoopsSubtotal = calculatesSubtotal("scoops", optionCounts)
        const toppingsSubtotal = calculatesSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        })
    }, [optionCounts])

    const value = React.useMemo(() => {

        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts }
            //update option count for this item with the new value

            const optionCountsMap = optionCounts[optionType]
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptionCounts(newOptionCounts)

        }

        function resetOrder() {
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            })
        }

        //getter:object containing option counts for scoops and toppings, subtotals and totals

        //setter: updateOptionCount
        return [{ ...optionCounts, totals }, updateItemCount, resetOrder]
    }, [optionCounts, totals])
    return <OrderDetails.Provider value={value} {...props} />
}