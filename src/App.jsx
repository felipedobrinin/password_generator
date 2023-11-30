import { useState,useEffect } from 'react';
import Panel from './components/Panel';

function App() {
  // Checkboxes
  const [caps,setCaps] = useState(true);
  const [lowercase,setLowercase] = useState(true);
  const [numbers,setNumbers] = useState(true);
  const [special,setSpecial] = useState(false);

  const [length, setLenght] = useState(8);

  const [password,setPassword] = useState("");

  function copy_to_clipboard(){
       navigator.clipboard.writeText(password);
       alert("Copiado");
  }

    function handleGenerate(e){
        e.preventDefault();
        GeneratePassword();
    }
  
  function GeneratePassword() {
    let pool = [];
    if (lowercase){
        let lowercase_array=  Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i)); 
      pool.push(...lowercase_array);
    }
    if (caps){
        let caps_array = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
      pool.push(...caps_array);
    }
    if (numbers){
        let numbers_array = Array.from({ length: 10 }, (_, i) => String.fromCharCode('0'.charCodeAt(0) + i));
      pool.push(...numbers_array);
    }
    if (special){
        pool.push(...['!','#','$','%','*','?','@','^','&']);
    }
    console.log({"caps":caps, "lowercase":lowercase, "numbers":numbers, "special":special})
    console.log(pool);
    let new_password = "";
    for ( let i = 0; i < length; i++ ) {
        let char = pool[(Math.floor(Math.random() * pool.length))];
        console.log(char);
        new_password += char ;
    }
    console.log("after for");
    setPassword(new_password);
  }
  
  useEffect(() => { 
        GeneratePassword();
    },[]);

  return (
    <div className="app p-2">
      <Panel>
        <h1 className='font-extrabold text-center text-2xl'>Password Generator</h1>
        <p className=""></p> 

        <div className='password text-lg'>
          <span className='p-2'>{password}</span>
          <div className='copy-button border-l-2 p-2 hover:cursor-pointer' onClick={copy_to_clipboard}>📋</div>
        </div>

        <form action="" className='py-2' onSubmit={handleGenerate} >
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
            <div className='flex gap-4'>
              <label htmlFor="range">Lenght</label>
              <input type="number" className='w-14'
                min="8"
                max="256"
                value={length} 
                onChange={(e) => setLenght(e.target.value)}
              />
            </div>
            
            <input type="range" className='range'
              min="8"
              max="256"
              list="values"
              value={length}
              onChange={(e) => setLenght(e.target.value)}
            />

            <datalist id="values">
              <option value="8" label="8"></option>
              <option value="16" label="16"></option>
              <option value="32" label="32"></option>
              <option value="64" label="64"></option>
              <option value="128" label="128"></option>
              <option value="256" label="256"></option>
            </datalist>
          </div>

          <input type="submit" value="Re Generate" className='mt-4 mx-auto text-2xl button p-2 px-10 '/>
        </form> 
      </Panel>
    </div>
  )
}

export default App
