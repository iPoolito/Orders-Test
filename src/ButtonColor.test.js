import { render, screen, fireEvent } from '@testing-library/react';
import ButtonColor from './ButtonColor';
import { replaceCamelWithSpaces } from './ButtonColor'

test('button has correct initial color', () => {
  render(<ButtonColor />)
  //find an element with arole of button and text of 'Change to blue
  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  //expect background color to bered
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
  //click the button
  fireEvent.click(button)
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' })
  //expects the button to have the correct color when clicked
  expect(button).toHaveTextContent('Change to Medium Violet Red')
});


test('initial conditions', () => {
  render(<ButtonColor />)
  //check that butten starts out enabled
  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  expect(button).toBeEnabled()
  //check that the ckeckbox starts out unchecked
  const checkBox = screen.getByRole('checkbox')
  expect(checkBox).not.toBeChecked()
})

test('enable and disable button', () => {
  render(<ButtonColor />)
  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkBox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkBox)
  expect(button).toBeDisabled()

  fireEvent.click(checkBox)
  expect(button).toBeEnabled()

})
test('Change to gray color when button is disable', () => {
  render(<ButtonColor />)
  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkBox = screen.getByRole('checkbox', { name: 'Disable button' })

  //diable button
  fireEvent.click(checkBox)
  expect(button).toBeDisabled()
  expect(button).toHaveStyle({ backgroundColor: 'gray' })

  //enable button
  fireEvent.click(checkBox)
  expect(button).toBeEnabled()
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  fireEvent.click(button)
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' })
  fireEvent.click(checkBox)
  expect(button).toBeDisabled()
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkBox)
  expect(button).toBeEnabled()
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')

  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidiumVioletRed')).toBe('Midium Violet Red')
  })
})