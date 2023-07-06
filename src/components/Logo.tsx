import Image from 'next/image'
import React from 'react'
import { cn } from '~/utils'

export type LogoProps = {
  type?: 'text' | 'sort'|'full',
  className?: string
}

const Logo = ({
  type = 'sort',
  className
}: LogoProps) => {

  if (type === 'text') {
    return (
      <div className={cn([
        'bg-gradient-to-r from-green-500 to-green-900 bg-clip-text text-transparent font-bold text-2xl',
        className
      ])}>LinkBlare</div>
    )
  }

  if (type === 'full') {
    return (
      <div className={cn([
        'relative w-36 h-10',
       className
      ])}> <Image src="/assets/image/logo-long.png" alt="logo long" fill /></div>
    )
  }



  return (
    <div className='aspect-square w-9  bg-center bg-cover' style={{backgroundImage: `url(${'/assets/image/logo.png'})`}}></div>
  )
}

export default Logo