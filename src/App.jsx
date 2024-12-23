import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { TbRefresh } from "react-icons/tb";

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copyButton,setCopyButton] = useState('copy')
  const [refresh,setRefresh] = useState(false);
  const passwordref = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) {
      str += '1234567890';
    }
    if (charAllowed) {
      str += '"^?=-.*\,$"@#%!';
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed,setPassword]);
  useEffect(() => {
    passwordGenerator()
    setCopyButton('copy')
  },[numberAllowed,charAllowed,length,passwordGenerator,refresh])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,61)
    window.navigator.clipboard.writeText(password);
    setCopyButton('copied!')

  },[password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center mb-4 text-xl'>Password generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-3'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 bg-white'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button className='outline-none bg-blue-700 text-white p-5' onClick={copyPasswordToClipBoard}>{copyButton}</button>
        </div>
        <div className='flex text-sm my-2 gap-x-1 justify-center lg:justify-between md:justify-between items-center'>
          <input className='cursor-pointer '
            type='range'
            min={6}
            max={60}
            onChange={(e) => { setLength(e.target.value) }}
            value={length}

          />
          <label className='text-md'> Length:{length}</label>
          <div className='flex gap-0'>
            <input className='cursor-pointer'
              type='checkbox'
              id='numberAllowed'
              value={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label className='cursor-pointer' htmlFor='numberAllowed'>Numbers</label>
          </div>
          <div className='flex gap-0'>
            <input className='cursor-pointer'
              type='checkbox'
              id='charactersAllowed'
              value={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label className='cursor-pointer' htmlFor='charactersAllowed'>Characters</label>
          </div>
        </div>
        <div className='flex justify-center align-center text-4xl mt-4'>< TbRefresh className='cursor-pointer' onClick={() => {
          setRefresh((prev) => !prev)
        }}></TbRefresh></div>
        
      </div>

    </>
  )
}

export default App
