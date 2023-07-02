import { Table, TableProps } from 'antd'
import React from 'react'
import { Pagination } from '~/types/PaginationData';

export type AppTableProps = {
    paginationData?: Pagination,
} & TableProps<any>;

const AppTable = ({
    pagination,
    ...rest
}: AppTableProps) => {
  return (
    <div>
        <div className='my-4'>
            
        </div>
        <Table {...rest} />
    </div>
  )
}

export default AppTable