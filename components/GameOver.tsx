import { NextFont } from "next/dist/compiled/@next/font"
import {ReactNode, useEffect, useRef} from "react"

interface overPar {
  handleClose: () => void,
  children: ReactNode | string,
  chivo_mono: NextFont,
  alertColor: string | undefined,
  showAlert: boolean
}

export default function GameOver({handleClose, chivo_mono, children, alertColor, showAlert}: overPar) {

  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if(ref.current) {
        const myDiv = ref.current as HTMLDivElement;
        showAlert ? myDiv.classList.replace("scale-0", "scale-100") : myDiv.classList.replace("scale-100", "scale-0")
      }
    }, 200);
  }, [showAlert])

  
    return (
      <div className={`fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center mx-auto ${alertColor === "sky" ? "bg-sky-600" : alertColor === "purple" ? "bg-purple-600" : "bg-slate-600"}  ${showAlert ? 'bg-opacity-60' : 'bg-opacity-0 hidden'}`}>
        <div ref={ref} className={`duration-500 ease-in-out scale-0 w-5/6 h-1/3 md:w-1/2 md:h-1/2 rounded-3xl flex justify-center items-center md:items-start ${chivo_mono.className} text-center ${alertColor === "sky" ? "bg-sky-400" : alertColor === "purple" ? "bg-purple-400" : "bg-slate-400"}`}>
          <div className="md:pt-20 pt-4 space-y-16">
            <div className="tracking-[0.1em] uppercase text-white text-2xl md:text-4xl">{children}</div>
            <button onClick={() => handleClose()} className={`${alertColor === "sky" ? "bg-sky-800" : alertColor === "purple" ? "bg-purple-800" : "bg-slate-700"} duration-150 ease-in-out hover:opacity-80 active:scale-95 rounded-3xl py-4 md:px-20 px-12 text-xl tracking-[0.1em] uppercase text-white`}>Play Again</button>
          </div>
        </div>
      </div>
    )
}