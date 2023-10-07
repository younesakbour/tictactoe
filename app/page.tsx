"use client"
import { Bangers, Chivo_Mono } from 'next/font/google'
import { useEffect, useState, ReactNode } from 'react'
import {Game, Points, GameOver} from '../components/'

const bangers = Bangers({ weight: '400', subsets: ['latin'] });
const chivo_mono = Chivo_Mono({ weight: '600', subsets: ['latin'] });

const BLOCKS_INITIAL: string[] = ["", "", "", "", "", "", "", "", ""]

const WINS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]

const getPoints: string | null | false = typeof window !== "undefined" ? localStorage.getItem("points") : false;
let thePoints = getPoints ? JSON.parse(getPoints) : "";

export default function Home() {
  const [blocks, setBlocks] = useState<string[]>(BLOCKS_INITIAL)
  const [player, setPlayer] = useState("O")
  const [playerStart, setPlayerStart] = useState("X")
  const [points, setPoints] = useState(!getPoints ? {x: 0, o: 0, tie: 0, plays: 0} : thePoints)

  const [alertText, setAlertText] = useState<ReactNode | string>()
  const [alertColor, setAlertColor] = useState<string>()
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

  const handle = (index: number) => {
    let snd = new Audio('click.mp3')
    snd.play()
    let arrBlocks = BLOCKS_INITIAL;
    if(arrBlocks[index]) {
      return
    }
    arrBlocks[index] = player;
    setBlocks(arrBlocks)
    player === "O" ? setPlayer("X") : setPlayer("O")
  }

  const handleReset = () => {
    setPoints({x: 0, o: 0, tie: 0, plays: 0})
  }

  const handleAlert = (txt: ReactNode | string, color: string) => {
    setAlertText(txt)
    setAlertColor(color)
    setShowAlert(true)
    let snd = new Audio('gameover.mp3')
    snd.play()
  }
  
  const handleClose = () => {
    setShowAlert(false)
  }

  const handlewin = (e: string) => {
    setTimeout(() => {
      if(e === "win") {
        player === "O" ? setPoints({...points, x: ++points.x}) : setPoints({...points, o: ++points.o})
        handleAlert(<p>The Player {<span className="md:text-6xl text-4xl">{player === "O" ? "X" : "O"}</span>} Won</p>, player === "O" ? "sky" : "purple");
      } else {
        handleAlert("tie", 'tie');
      }

      setPoints({...points, plays: ++points.plays})

      for (let i = 0; i < blocks.length; i++) {
        const arr = blocks;
        arr[i] = ""
        setBlocks(arr)
      }
    
    setPlayer(playerStart)
    setPlayerStart(playerStart === "O" ? "X" : "O")
    }, 300);
    console.log(blocks)
  }

  useEffect(() => {
    let arrWins = WINS
    let win: number[] = []
    let check = false

    for (let i = 0; i < arrWins.length; i++) {
      win = arrWins[i];
      let a = win[0]
      let b = win[1]
      let c = win[2]
      //Win Condition
      check = (blocks[a] === "X" && blocks[b] === "X" && blocks[c] === "X") || (blocks[a] === "O" && blocks[b] === "O" && blocks[c] === "O")
      if (check) {
        handlewin("win")
      }
    }
    //tie Condition
    setTimeout(() => {
      let newArr = []
      newArr = blocks.filter(e => e === "")
      if(!check && newArr.length === 0) {
        setPoints({...points, tie: ++points.tie})
        handlewin("tie")
      }
    }, 500);
    
  }, [player])
  
  return (
    <div className='md:my-6 my-2 select-none relative'>
      <div className='flex flex-col items-center space-y-8 text-white mb-6'>
        <h1 className={`${bangers.className} md:text-6xl text-4xl tracking-[0.2em]`}>Tic Tac Toe</h1>
      </div>
      <GameOver {...{handleClose, showAlert, alertColor, chivo_mono}} >{alertText}</GameOver>
      <div className='hidden xl:grid grid-cols-3 items-center xl:w-[1180px] mx-auto'>
        {/* Desktop Start */}
        <div id='points' className={`xl:self-end ${bangers.className}`}>
            <div id='points-inner'>
              <Points {...{points}} />
            </div>
            <div className='h-full flex justify-center mt-8'>
                <div className='border-4 border-yellow-500 rounded-lg'>
                  <button onClick={handleReset} className={`text-2xl tracking-[0.2em] translate-x-2 -translate-y-2 duration-300 ease-in-out active:text-xl hover:translate-x-0 hover:translate-y-0 rounded-sm hover:bg-yellow-500 uppercase bg-yellow-400 px-6 py-2 text-white ${bangers.className}`}>Reset</button>
                </div>
            </div>
          </div>
          <div className={`${chivo_mono.className}`}>
            <Game {...{blocks, player, handle}} />
          </div>
        {/* Desktop End */}
      </div>
      {/* Mobile Start */}
      <div className='xl:hidden md:space-y-10 space-y-6 md:grid grid-cols-2'>
          <div className={`flex flex-col space-y-8 items-center justify-center ${chivo_mono.className}`}>
            <Game {...{blocks, player, handle}} />
          </div>
          <div id='points' className={`flex md:flex-col md:space-y-6 justify-center text-center items-center ${bangers.className}`}>
            <div id='points-inner'>
              <Points {...{points}} />
            </div>
            <div className='hidden md:flex justify-center xl:hidden'>
              <div className='border-4 border-yellow-500 rounded-lg'>
                <button onClick={handleReset} className={`text-xl tracking-[0.2em] -translate-x-2 -translate-y-2 duration-300 ease-in-out active:text-lg hover:translate-x-0 hover:translate-y-0 rounded-sm hover:bg-yellow-500 uppercase bg-yellow-400 px-6 py-2 text-white ${bangers.className}`}>Reset</button>
              </div>
            </div>
          </div>
          <div className='md:hidden flex justify-center'>
          <div className='border-4 border-yellow-500 rounded-lg'>
              <button onClick={handleReset} className={`text-xl tracking-[0.2em] -translate-x-2 -translate-y-2 duration-300 ease-in-out active:text-lg hover:translate-x-0 hover:translate-y-0 rounded-sm hover:bg-yellow-500 uppercase bg-yellow-400 px-6 py-2 text-white ${bangers.className}`}>Reset</button>
            </div>
          </div>
        </div>
        {/* Mobile End */}
    </div>
  )
}
