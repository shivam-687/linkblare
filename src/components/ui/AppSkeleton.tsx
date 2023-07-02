import React from 'react'
import Skeleton, { type SkeletonProps } from 'react-loading-skeleton'


const AppSkeleton = ({
    baseColor='#1f1f1f',
    highlightColor='#3f3f3f',
    ...props
}: SkeletonProps) => {
  return (
    <><Skeleton  baseColor={baseColor} highlightColor={highlightColor} {...props} /></>
  )
}

export default AppSkeleton