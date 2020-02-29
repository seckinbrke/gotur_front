import React from 'react';
import Cards from 'react-credit-cards';



export default function PaymentComponent() {
    const [values, setValues] = React.useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    })
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
 /*   const handleInputFocus = (e) => {
        setValues({ 
            ...values,
            focus: e.target.name });
      }*/
    return (
        <div id="PaymentForm">
            <Cards
                cvc={values.cvc}
                expiry={values.expiry}
                focus={values.focus}
                name={values.name}
                number={values.number}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    onChange={handleInputChange}
                    onFocus={this.handleInputFocus}
                />
            </form>
        </div>
    )
}


