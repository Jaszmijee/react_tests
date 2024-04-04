import {cleanup, render, screen} from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
];

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
    });

    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();

        // render component
        render(<CurrencyForm action={action} />);

        // find “convert” button
        const submitButton = screen.getByText('Convert');

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // check if action callback was called once
        expect(action).toHaveBeenCalledTimes(1);
    });


    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();

        // render component
        render(<CurrencyForm action={action} />);

        // find “convert” button
        const submitButton = screen.getByText('Convert');

        // find fields elems
        const amountField = screen.getByTestId('amount');
        const fromField = screen.getByTestId('from-select');
        const toField = screen.getByTestId('to-select');

        // set test values to fields
        userEvent.type(amountField, '100');
        userEvent.selectOptions(fromField, 'PLN');
        userEvent.selectOptions(toField, 'USD');

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // check if action callback was called once and with proper argument
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
    });


    it('should run action callback with proper data on form submit (use table of cases)', () => {
        const action = jest.fn();

        for (const testObj of testCases) {
            render(<CurrencyForm action={action} />);

            const submitButton = screen.getByText('Convert');

            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');

            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);

            userEvent.click(submitButton);

            expect(action).toHaveBeenCalledWith({
                amount: parseInt(testObj.amount),
                from: testObj.from,
                to: testObj.to,
            });
            // unmount component
            cleanup();
        }
    });
});



