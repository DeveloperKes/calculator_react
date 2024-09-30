import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("0");
  const [record, setRecordValue] = useState("");
  const [operator, setOperator] = useState("+");

  const handleSetNumber = (number) => {
    setValue(`${value === '0' ? '' : value}${number}`);
  }

  const handleReset = (clear = false) => {
    if (clear) setRecordValue("");
    setValue("0");
  };

  const handleBackspace = () => {
    const newValue = value.slice(0, -1);
    setValue(newValue === '' ? '0' : newValue);
  }

  const handleOperation = (operatorSymbol) => {
    if (record) handleEqual();
    else setRecordValue(`${value} ${operatorSymbol}`);
    setOperator(operatorSymbol);
    setValue("0");
  }

  const handleEqual = (final = false) => {
    const dicOperations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "x": (a, b) => a * b,
      "÷": (a, b) => b !== 0 ? a / b : "Error"
    }

    const currentNumber = parseFloat(value.replace(',', '.'));
    const previousNumber = parseFloat(record.split(' ')[0].replace(',', '.'));

    console.log(currentNumber, previousNumber);


    const result = dicOperations[operator](previousNumber, currentNumber);
    if (final) {
      if (result === 'Error') setValue(result);
      else setValue(`${result.toString().replace('.', ',')}`);
      setRecordValue("");
    } else {
      if (result === 'Error') setRecordValue(result);
      else setRecordValue(`${result.toString().replace('.', ',')} ${operator}`);
    }
  }

  const handlePercent = () => {
    if (value > 0) {
      const percent = value / 100;
      setValue(percent);
    }
  }

  const handleDecimal = () => {
    if (!value.includes(',')) {
      const newValue = `${value},`;
      setValue(newValue);
    }
  }

  return (
    <main className="calculator">
      <section className="screen">
        <label>{record}</label>
        <input type="text" style={{
          fontSize: value.length < 8 ? '3rem' : value.length >= 14 ? `${3 - (14 / 10)}rem` : `${3 - (value.length / 10)}rem`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }} value={value.length > 14 ? value.slice(0, 14) + '...' : value} readOnly />
      </section>
      <section className="commands">
        <button onClick={handlePercent} className="calc_button">%</button>
        <button onClick={() => handleReset(true)} className="calc_button">CE</button>
        {/* <button onClick={handleReset} className="calc_button">C</button> */}
        <button onClick={handleBackspace} className="calc_button operator">🆑</button>
      </section>
      <section className="second_command"></section>
      <section className="numbers">
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button key={`button-${number}`} onClick={() => handleSetNumber(number)} className="calc_button number">{number}</button>
          ))
        }
        <button onClick={() => handleSetNumber(0)} className="calc_button number zero">0</button>
        <button onClick={handleDecimal} className="calc_button number">,</button>
      </section>
      <aside className="operators">
        <button onClick={() => handleOperation("÷")} className="calc_button operator">÷</button>
        <button onClick={() => handleOperation("x")} className="calc_button operator">×</button>
        <button onClick={() => handleOperation("-")} className="calc_button operator">–</button>
        <button onClick={() => handleOperation("+")} className="calc_button operator">+</button>
        <button onClick={() => handleEqual(true)} className="calc_button operator">=</button>
      </aside>
    </main>
  );
}

export default App;
