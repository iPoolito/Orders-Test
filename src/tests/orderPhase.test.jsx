import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phase for happy path', async () => {
    //render app
    render(<App />)
    //add ice crem scoops and toppings
    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaScoop)
    userEvent.type(vanillaScoop, '1')

    const chocolateScoop = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    userEvent.clear(chocolateScoop)
    userEvent.type(chocolateScoop, '2')


    const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' })
    userEvent.click(cherriesTopping)
    const grandTotal = await screen.findByText('Grand total :', { exact: false })
    expect(grandTotal).toHaveTextContent('7.5')
    //find and click order button
    const orderButton = await screen.findByRole('button', { name: /order sundae/i })
    userEvent.click(orderButton)
    //check summary information based on order

    const summaryHeading = await screen.findByRole('heading', { name: /Order Summary/i })
    expect(summaryHeading).toBeInTheDocument()

    const scoopsHeading = await screen.findByRole('heading', { name: 'Scoops: $6.00' })
    expect(scoopsHeading).toBeInTheDocument()

    const toopingsHeading = await screen.findByRole('heading', { name: 'Toppings: $1.50' })
    expect(toopingsHeading).toBeInTheDocument()

    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
    expect(screen.getByText('Cherries')).toBeInTheDocument()

    //accept terms and conditions and click button to confirm order

    const tcCheckbox = await screen.findByRole('checkbox', { name: /terms and conditions/i })
    userEvent.click(tcCheckbox);
    //confdirm order number on confirmation npage

    const confirmOrderButton = screen.getByRole("button", {
        name: /confirm order/i,
    });
    userEvent.click(confirmOrderButton);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    // check confirmation page text
    // this one is async because there is a POST request to server in between summary
    //    and confirmation pages
    const thankYouHeader = await screen.findByRole("heading", {
        name: /thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();

    // expect that loading has disappeared
    const notLoading = screen.queryByText("loading");
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // find and click "new order" button on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i });
    userEvent.click(newOrderButton);

    // check that scoops and toppings have been reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText("Toppings total: $0.00");
    expect(toppingsTotal).toBeInTheDocument();

    // wait for items to appear so that Testing Library doesn't get angry about stuff
    // happening after test is over
    await screen.findByRole("spinbutton", { name: "Vanilla" });
    await screen.findByRole("checkbox", { name: "Cherries" });
})