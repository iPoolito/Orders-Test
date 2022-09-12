import { findByRole, render, screen } from '../../../test-utils/testing-lirbary-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import OrderEntry from '../OrderEntry'


test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })
    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0.00')
    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')
    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await userEvent.clear(chocolateInput)
    await userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('Get total and subtotal for toppings', async () => {
    render(<Options optionType={'toppings'} />)
    const toppingsSubtotal = await screen.findByText('Toppings total: $', { exact: false })
    expect(toppingsSubtotal).toHaveTextContent('0.00')
    const MnMs = await screen.findByRole('checkbox', { name: 'M&Ms' })
    await userEvent.click(MnMs)
    expect(toppingsSubtotal).toHaveTextContent('1.5')
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await userEvent.click(cherriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('3.00')
    //REMOVE CHERRIES
    await userEvent.click(cherriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.5')

})

describe('grand Total', () => {


    test('grandTotalupdates properly if scoop is added first', async () => {
        render(<OrderEntry />)
        const grandTotal = await screen.findByText('Grand total :', { exact: false })
        expect(grandTotal).toHaveTextContent('0.00')
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        await userEvent.clear(vanillaInput)
        await userEvent.type(vanillaInput, '1')
        expect(grandTotal).toHaveTextContent('2')

    })
    test('grandTotalupdates properly if topping is added first', async () => {
        render(<OrderEntry />)
        const grandTotal = await screen.findByText('Grand total :', { exact: false })
        const toppingCheck = await screen.findByRole('checkbox', { name: 'M&Ms' })
        await userEvent.click(toppingCheck)
        expect(grandTotal).toHaveTextContent('1.5')
    })

    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />)
        const grandTotal = await screen.findByText('Grand total :', { exact: false })
        const toppingCheck = await screen.findByRole('checkbox', { name: 'M&Ms' })
        await userEvent.click(toppingCheck)
        expect(grandTotal).toHaveTextContent('1.5')
        await userEvent.click(toppingCheck)
        expect(grandTotal).toHaveTextContent('0.00')

    })
})