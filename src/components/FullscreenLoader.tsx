import React from 'react'
import Loading from './Loading'

const FullscreenLoader = () => {
  return (
    <div className='z-50 fixed top-0 left-0 right-0 bottom-0'>
        <div className='w-full h-full bg-base-300/30 backdrop-blur-md grid place-items-center'>
        <Loading/>
    </div>
    </div>
  )
}

export default FullscreenLoader