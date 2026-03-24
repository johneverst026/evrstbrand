import React from 'react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-(--accent)/10">
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-center border-b border-(--border)/50 bg-(--background)/80 px-8 py-8 backdrop-blur-sm md:px-16">
        <div className="text-xl font-light tracking-[0.6em] uppercase">
          EVRST<span className="font-black text-accent">.</span>
        </div>
      </nav>

      <main className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        
 

        {/* Hero Title: Elegant & Simple */}
        <h1 className="max-w-4xl text-5xl font-extralight tracking-tight md:text-7xl lg:text-8xl">
          THE <span className="font-serif italic text-accent">COLLECTION</span> <br />
          IS COMING.
        </h1>

        <p className="mt-8 max-w-xl text-balance text-lg font-light leading-relaxed text-(--foreground)/70 md:text-xl">
          Refining the peak of filtration. Hand-blown borosilicate meets precision engineering. 
          A journey through clarity awaits.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-(--accent)/30" />
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-accent">
            Launching Soon
          </span>
        </div>

      </main>

      {/* Footer */}
      {/* <footer className="mt-auto flex flex-col items-center justify-center border-t border-(--border)/50 py-10">
        <div className="text-[9px] font-medium uppercase tracking-[0.3em] text-(--foreground)/40">
          © 2024 EVRST Glassworks. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}