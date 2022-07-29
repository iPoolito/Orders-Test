import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SummaryForm } from '../SummaryForm';

//Checkbox is unchecked by default

test('Initial Conditions', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i })
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' })
    expect(confirmButton).toBeDisabled()
})

test('Checkbox disables button on first Click and enables on second click', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i })
    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' })

    userEvent.click(checkbox)
    expect(confirmButton).toBeEnabled()

    userEvent.click(checkbox)
    expect(confirmButton).toBeDisabled()

})

test('poppover responds to hover', async () => {
    render(<SummaryForm />)
    //popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()
    //poppover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))
})