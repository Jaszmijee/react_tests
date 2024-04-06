import ResultBox from './ResultBox';
import {cleanup, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

const testCases = [
    { amount: 0, from: 'PLN', to: 'USD', result: 'PLN 0.00 = $0.00' },
    { amount: 10, from: 'PLN', to: 'USD', result: 'PLN 10.00 = $2.86' },
    { amount: 20, from: 'PLN', to: 'USD',result: 'PLN 20.00 = $5.71' },
    { amount: 50, from: 'PLN', to: 'USD',result: 'PLN 50.00 = $14.29' },
    { amount: 150, from: 'USD', to: 'PLN',result: '$150.00 = PLN 525.00' },
    { amount: 200, from: 'USD', to: 'PLN',result: '$200.00 = PLN 700.00' },
    { amount: 250, from: 'USD', to: 'PLN',result: '$250.00 = PLN 875.00' },
    { amount: 300, from: 'PLN', to: 'PLN',result: 'PLN 300.00 = PLN 300.00' },
    { amount: -20, from: 'PLN', to: 'USD',result: 'Wrong value…' },
];

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/>);
    });


    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/>);
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });

    it('should render proper info about conversion testCases', () => {

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount}/>);
            const output = screen.getByTestId('output')
            expect(output).toHaveTextContent(testObj.result);
            // unmount component
            cleanup();
        }
    });
});

