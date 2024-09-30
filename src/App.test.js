import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator component', () => {
  render(<App />);
  const screenElement = screen.getByText(/%/i);
  expect(screenElement).toBeInTheDocument();
});

test('initial value is 0', () => {
  render(<App />);
  const display = screen.getByDisplayValue("0");
  expect(display).toBeInTheDocument();
});

test('set number 5', () => {
  render(<App />);
  const button5 = screen.getByText("5");
  fireEvent.click(button5);
  const display = screen.getByDisplayValue("5");
  expect(display).toBeInTheDocument();
})

test('perform addition 2 + 3 = 5', () => {
  render(<App />);

  const button2 = screen.getByText("2");
  fireEvent.click(button2);

  const addButton = screen.getByText("+");
  fireEvent.click(addButton);

  const button3 = screen.getByText("3");
  fireEvent.click(button3);

  const equalsButton = screen.getByText("=");
  fireEvent.click(equalsButton);

  const display = screen.getByDisplayValue("5");
  expect(display).toBeInTheDocument();
})

test('division by 0 returns error', () => {
  render(<App />);

  const button2 = screen.getByText("2");
  fireEvent.click(button2);

  const divideButton = screen.getByText("÷");
  fireEvent.click(divideButton);

  const equalButton = screen.getByText("=");
  fireEvent.click(equalButton);

  const display = screen.getByDisplayValue("Error");
  expect(display).toBeInTheDocument();
})

test('reset calculator', () => {
  render(<App />);

  const button8 = screen.getByText("8");
  fireEvent.click(button8);

  const clearButton = screen.getByText("CE");
  fireEvent.click(clearButton);

  const display = screen.getByDisplayValue("0");
  expect(display).toBeInTheDocument();
})