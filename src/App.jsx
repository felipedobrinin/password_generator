import { useState, useEffect } from 'react';
import Panel from './components/Panel';
import usePassword from './hooks/usePassword';
import Password from './components/Password';

function App() {
  console.log("Rendered")
  // available special characters. TODO Make it posible to choose them 
  var special_chars = ['!', '#', '$', '%', '*', '?', '@', '^', '&'];
  // Checkboxes por password options
  const [params,setParams] = useState({
    length : 16,
    has_lowercase : true,
    has_uppercase : true,
    has_numbers : true,
    has_special_chars : true,
  });

  const { password, generatePassword } = usePassword(special_chars);

  function handleGenerate(e) {
    e.preventDefault();

    if (!params.has_lowercase && !params.has_uppercase && !params.has_numbers && !params.has_special_chars) {
        alert("You need at least one option enabled");
        return;
    }
    
    generatePassword(lengths());
  }

  function lengths() {
    let left = params.length;

    let factor = [params.has_lowercase, params.has_uppercase, params.has_numbers, params.has_special_chars].filter(Boolean).length;
    let share = Math.ceil(params.length / factor); 
    let lowercase_len = 0;
    let uppercase_len = 0;
    let numbers_len = 0;
    let special_chars_len = 0;


    if (params.has_lowercase) { 
      lowercase_len = Math.min(share,left);
      left -= lowercase_len;
    }
    if (params.has_uppercase) { 
      uppercase_len = Math.min(share,left);
      left -= uppercase_len;
    }
    if (params.has_numbers) { 
      numbers_len = Math.min(share,left);
      left -= numbers_len;
    }
    if (params.has_special_chars) { 
      special_chars_len = Math.min(share,left);
      left -= special_chars_len;
    }

    return {
      lowercase_len,
      uppercase_len,
      numbers_len,
      special_chars_len
    }
  }


  useEffect(() => {
    generatePassword(lengths());
  }, []);

  return (
    <div className="app">
      <Panel>
        <h1 className="font-extrabold text-center text-6xl mb-5">Password Generator</h1>
        <Password password={password} special_chars={special_chars} />
        <form action="" className="py-2" onSubmit={handleGenerate} >
          <div className="checkform">
            <input type="checkbox" name="" id="caps" className="checkbox"
              checked={params.has_uppercase}
              onChange={() => setParams({
                ...params,
                has_uppercase : !params.has_uppercase
              })}
            />
            <label htmlFor="caps">Uppercase (A-Z)</label>
          </div>
          <div className="checkform">
            <input type="checkbox" name="" id="lowercase" className="checkbox"
              checked={params.has_lowercase}
              onChange={() => setParams({
                ...params,
                has_lowercase : !params.has_lowercase
              })}
            />
            <label htmlFor="lowercase">Lowercase (a-z)</label>
          </div>
          <div className="checkform">
            <input type="checkbox" name="" id="numbers" className="checkbox"
              checked={params.has_numbers}
              onChange={() => setParams({
                ...params,
                has_numbers : !params.has_numbers
              })}
            />
            <label htmlFor="numbers">Numbers (0-9)</label>
          </div>
          <div className="checkform">
            <input type="checkbox" name="" id="special" className="checkbox"
              checked={params.has_special_chars}
              onChange={() => setParams({
                ...params,
                has_special_chars : !params.has_special_chars
              })}
            />
            <label htmlFor="special">Special Characters</label>
          </div>

          <div className="rangeform">
            <div className="flex gap-4">
              <label htmlFor="range">Length</label>
              <input type="number" className="w-16 md:w-14"
                min="8"
                max="256"
                value={params.length}
                onChange={(e) => setParams({
                  ...params,
                  length : e.target.value
                })}
              />
            </div>

            <input type="range" className="range"
              min="8"
              max="256"
              list="values"
              value={params.length}
              onChange={(e) => setParams({
                ...params,
                length : e.target.value
              })}
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

          <input type="submit" value="Re Generate" className="mt-10 mx-auto text-4xl md:text-5xl md:mt-4 button py-2 px-10" />
        </form>
      </Panel>
    </div>
  )
}

export default App
