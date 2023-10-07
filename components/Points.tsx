export default function Points({points}: {points: any}) {
    return (
      <div className="text-white md:text-3xl text-xl tracking-[0.2em] md:space-y-8 space-y-4 px-10 py-4 bg-black bg-opacity-25">
        <div>
            <h4 className="text-sky-200">Player X Wins: <span className="md:text-5xl text-3xl">{points.x}</span></h4>
            <h4 className="text-purple-200">Player O Wins: <span className="md:text-5xl text-3xl">{points.o}</span></h4>
            <h4 className="text-slate-200">Tie: <span className="md:text-5xl text-3xl">{points.tie}</span></h4>
        </div>
        <div className="bg-yellow-400 px-6 py-4 flex justify-center">
            <h4>You played: <span className="md:text-5xl text-4xl">{points.plays}</span></h4>
        </div>
      </div>
    )
  }