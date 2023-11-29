import { useState } from 'react';
import Panel from './components/Panel';

function App() {
  // Checkboxes
  const [caps,setCaps] = useState(true);
  const [lowercase,setLowercase] = useState(true);
  const [numbers,setNumbers] = useState(true);
  const [special,setSpecial] = useState(false);

  const [lenght, setLenght] = useState(8);

  function GeneratePassword(e) {
    e.preventDefault();
    let password = "locura";
    console.log("New Password ", password)
    console.log({"caps":caps, "lowercase":lowercase, "numbers":numbers, "special":special})
  }

  return (
    <div className="app p-2">
      <Panel>
        <h1 className='font-extrabold text-center text-2xl'>Password Generator</h1>
        <p className=""></p> 

        <div className='password text-lg'>
          <span className='p-2'>Ai*j2_?WI;</span>
          <div className='copy-button border-l-2 p-2 hover:cursor-pointer'>📋</div>
        </div>

        <form action="" className='py-2' onSubmit={GeneratePassword} >
          <div className='checkform'>
            <input type="checkbox" name="" id="caps" className='checkbox' 
              checked={caps}
              onChange={() => setCaps(!caps)}
            />
            <label htmlFor="caps">A-Z</label>
          </div>
          <div className='checkform'>
            <input type="checkbox" name="" id="lowercase" className='checkbox' 
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
            <label htmlFor="lowercase">a-z</label>
          </div>
          <div className='checkform'>
            <input type="checkbox" name="" id="numbers" className='checkbox' 
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            <label htmlFor="numbers">0-9</label>
          </div>
          <div className='checkform'>
            <input type="checkbox" name="" id="special" className='checkbox'
              checked={special}
              onChange={() => setSpecial(!special)}
            />
            <label htmlFor="special">Special Characters</label>
          </div>

          <div className='rangeform'>
            <input type="range" name="" id="range" className='range'
              min="8"
              max="256"
            />
            <label htmlFor="range">Special Characters</label>
          </div>

          <input type="submit" value="Re Generate" className='mt-4 mx-auto text-2xl button p-2 px-10 '/>
        </form> 
      </Panel>
    </div>
  )
}

export default App