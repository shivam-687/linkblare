import React from 'react'
import ReactLoading, { LoadingProps } from 'react-loading';

const Loading = ({
    color="#4f4f4f",
    type="spokes",
    ...props
}: LoadingProps) => {
  return (
    <ReactLoading  {...props}></ReactLoading>
  )
}

export default Loading