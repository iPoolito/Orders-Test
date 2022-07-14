import './App.css';
import * as React from 'react'

export function replaceCamelWithSpaces(colorName) {
    return colorName.replace(/\B([A-Z])\B/g, " $1")
}

function ButtonColor() {

    const [color, setColor] = React.useState('MediumVioletRed')
    const [check, setCheck] = React.useState(false)

    const textColorDisplay = color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
    const handleInputChange = (e) => {
        setCheck(e.target.checked)
    }

    return (
        <div className="App">
            <button disabled={check} style={{ backgroundColor: check ? 'gray' : color }} onClick={() => setColor(textColorDisplay)}>Change to {replaceCamelWithSpaces(textColorDisplay)}</button>
            <br />
            <input type={'checkbox'} onChange={(e) => handleInputChange(e)} id="disable-button-checkbox" />
            <label htmlFor='disable-button-checkbox'>Disable button</label>
        </div>
    );
}

export default ButtonColor;
