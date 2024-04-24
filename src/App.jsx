import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  const labelClasses = "font-bold mx-2 text-lg"

  const [useNum, setUseNum] = useState(false);
  const [useChar, setUseChar] = useState(false);
  const [length, setLength] = useState(6);
  const [pswd, setPswd] = useState("");
  const pswdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (useNum) str += "0123456789";
    if (useChar) str += "~!@#$%^&*()_+=-`"
    for (let index = 1; index <= length; index++)
    {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPswd(pass);
  }, [useNum, useChar, length, setPswd])

  const copyPswd = useCallback(() => {
    pswdRef.current?.select();
    window.navigator.clipboard.writeText(pswd)
  }, [pswd])

  useEffect(() => { passwordGenerator() }, [useChar, useNum, length, passwordGenerator])

  return (
    <>
      <h1 className="text-center text-4xl font-bold">Password Generator</h1>
      <div className="container h-64 bg-black rounded-md max-w-xl mx-auto my-8">
        <div className="my-4 flex flex-col">
          <input className="mt-10 w-96 rounded h-8 p-2 font-bold mx-auto text-center" type="text" value={pswd} readOnly ref={pswdRef} />
          <button className="border-white border-2 bg-black text-white w-1/4 mx-auto my-6 mb-2 p-2 rounded font-bold hover:bg-white hover:text-black" onClick={copyPswd}>Copy</button>
        </div>
        <div className="flex bg-white w-[32rem] mx-auto h-12 items-center px-2 rounded text-black justify-between">
          <div className="max-w-28 flex ml-2 mr-auto">
            <input className="align-middle cursor-pointer" type="range" min={6} max={100} value={length} onChange={(e) => setLength(e.target.value)} />
            <label className={labelClasses}>Length({length})</label>
          </div>
          <div>
            <input type="checkbox" onChange={() => setUseNum(prev => !prev)} />
            <label className={labelClasses}>Numbers</label>
          </div>
          <div>
            <input type="checkbox" onChange={() => setUseChar(prev => !prev)} />
            <label className={labelClasses}>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
