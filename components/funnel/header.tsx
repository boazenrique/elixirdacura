"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeaderProps {
  progress: number
}

export function Header({ progress }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-[428px] items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/images/doctor-profile.png"
              alt="Dra. Stefanny"
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Dra Stefanny</p>
            <p className="text-sm font-bold text-foreground">
              Online<sup className="text-[8px]">™</sup>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground">CORPO RECUPERADO</p>
        </div>
      </div>
    </header>
  )
}
