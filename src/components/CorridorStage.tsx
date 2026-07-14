"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Hero stage = backroom art + liminal effects — mobile-first scare */
export function CorridorStage() {
  const [tear, setTear] = useState(false);
  const [tearY, setTearY] = useState(40);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(
        () => {
          setTearY(15 + Math.random() * 70);
          setTear(true);
          setTimeout(() => setTear(false), 120 + Math.random() * 80);
          loop();
        },
        3200 + Math.random() * 4500
      );
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero-stage relative w-full overflow-hidden border border-backroom/35 bg-[#1a1910] shadow-[inset_0_0_60px_rgba(0,0,0,0.55)] max-md:-mx-4 max-md:w-[calc(100%+2rem)] max-md:border-x-0 md:aspect-[1672/941]">
      {/* mobile: tall immersive frame; desktop: art aspect */}
      <div className="relative h-[min(58vh,420px)] w-full md:absolute md:inset-0 md:h-full">
        {/* base art — slow ken burns */}
        <div className="hero-ken absolute inset-[-6%] md:inset-[-4%]">
          <Image
            src="/backroom-hero.png"
            alt="Backroom zone — S1D4NG.5KR1P51.404"
            fill
            priority
            className="object-cover object-[center_40%] md:object-center"
            sizes="(max-width:768px) 100vw, 768px"
          />
        </div>

        {/* chromatic ghosts — lighter on mobile via CSS */}
        <div className="hero-chroma-r pointer-events-none absolute inset-[-6%] opacity-30 mix-blend-screen md:inset-[-4%]">
          <Image
            src="/backroom-hero.png"
            alt=""
            fill
            aria-hidden
            className="object-cover object-[center_40%] md:object-center"
            sizes="(max-width:768px) 100vw, 768px"
          />
        </div>
        <div className="hero-chroma-b pointer-events-none absolute inset-[-6%] opacity-25 mix-blend-screen md:inset-[-4%]">
          <Image
            src="/backroom-hero.png"
            alt=""
            fill
            aria-hidden
            className="object-cover object-[center_40%] md:object-center"
            sizes="(max-width:768px) 100vw, 768px"
          />
        </div>

        <div className="hero-fluoro pointer-events-none absolute inset-0 z-[5]" />

        {tear && (
          <div
            className="pointer-events-none absolute inset-x-0 z-[8] h-5 overflow-hidden mix-blend-screen md:h-6"
            style={{ top: `${tearY}%` }}
          >
            <div className="hero-tear-inner relative h-20 w-full -translate-y-1/3 md:h-24">
              <Image
                src="/backroom-hero.png"
                alt=""
                fill
                aria-hidden
                className="object-cover object-[center_40%] md:object-center"
                sizes="(max-width:768px) 100vw, 768px"
              />
            </div>
          </div>
        )}

        <div className="hero-dust pointer-events-none absolute inset-0 z-[9]" aria-hidden />

        {/* labels — readable on small screens */}
        <div className="pointer-events-none absolute left-2 top-2 z-20 max-w-[70%] truncate rounded border border-backroom/40 bg-black/60 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-backroom sm:left-3 sm:top-3 sm:max-w-none sm:text-[10px] sm:tracking-[0.2em]">
          S1D4NG.5KR1P51.404
        </div>
        <div className="pointer-events-none absolute bottom-2 left-2 z-20 font-mono text-[8px] tracking-[0.18em] text-fog/70 sm:bottom-3 sm:left-3 sm:text-[9px] sm:tracking-[0.22em]">
          LEVEL 0 · FILE WET
        </div>
        <div className="hero-blink pointer-events-none absolute bottom-2 right-2 z-20 font-mono text-[8px] tracking-[0.16em] text-alert/85 sm:bottom-3 sm:right-3 sm:text-[9px] sm:tracking-[0.2em]">
          SIGNAL UNSTABLE
        </div>

        {/* stronger vignette on mobile = more dread */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.62)_100%)] md:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-35 md:opacity-30" />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-35 mix-blend-multiply md:opacity-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(232,212,77,0.16), transparent 38%, rgba(8,6,2,0.45))",
          }}
        />
        <div className="noise pointer-events-none absolute inset-0 z-10 opacity-[0.08]" />
      </div>
    </div>
  );
}
