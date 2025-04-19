export function Logo() {
    return (
      <div className="flex flex-col items-center text-center space-y-8 my-12 text-black">
        <div className="text-3xl tracking-wider">
          <span className="font-bold" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            会津
          </span>
          <span className="text-2xl">の賃貸の</span>
          <span className="font-serif italic">Real</span>
        </div>
        <div className="space-y-2">
          <div className="text-5xl font-bold tracking-[0.2em]">IoA</div>
          <div className="text-[10px] tracking-[0.1em] font-light space-y-0.5">
            <div className="uppercase">Information</div>
            <div className="uppercase">Of</div>
            <div>Aizu apartment</div>
          </div>
        </div>
      </div>
    )
  }
  
  