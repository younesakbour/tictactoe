interface gamePar {
  blocks: string[],
  player: string,
  handle: (index: number) => void
}

export default function Game({blocks, player, handle}: gamePar) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-fit text-white bg-gradient-to-l from-20% ${player == "X" ? "from-sky-500 to-sky-400" : "from-purple-500 to-purple-400"} py-4 px-6 rounded-t-xl`}>
          <h3 className={`md:text-xl uppercase tracking-[0.1em]`}>Player Turn <span className='text-2xl md:text-xl'>{player}</span></h3>
      </div>
      <div className={`${player == "X" ? "bg-sky-600" : "bg-purple-600"} p-4`}>
        <div className="grid grid-cols-3 md:gap-4 gap-2 bg-white bg-opacity-90 md:p-6 p-4">
          {blocks.map((e, index) =>
          <button onClick={ () => handle(index)} key={index} className={`md:w-[90px] md:h-[90px] w-[60px] h-[60px] ${
              blocks[index] == "X" ? "bg-gradient-to-tl from-80% from-sky-500 to-sky-400 rounded-2xl" 
              : blocks[index] == "O" ? "bg-gradient-to-tl from-80% from-purple-500 to-purple-400 rounded-2xl"
              : ""
            }`}>
              <div
              className={`
                ${blocks[index] == "X" ? "bg-gradient-to-tl from-80% from-sky-400 to-sky-300 -translate-x-[1px] -translate-y-[1px]" 
                : blocks[index] == "O" ? "bg-gradient-to-tl from-80% from-purple-400 to-purple-300 -translate-x-[1px] -translate-y-[1px]" 
                : " cursor-pointer bg-gradient-to-tl from-80% from-yellow-300 to-yellow-200 duration-500 ease-in-out hover:from-45% hover:scale-95 hover:from-yellow-400 hover:to-yellow-300 hover:translate-x-[1px] hover:translate-y-[1px]"}
                md:w-[84px] md:h-[84px] w-[54px] h-[54px] flex justify-center items-center rounded-xl`} key={index}>
                  <p className="text-white md:text-7xl text-4xl">{e}</p>
              </div>
          </button>
          )}
        </div>
      </div>
    </div>
  )
}
