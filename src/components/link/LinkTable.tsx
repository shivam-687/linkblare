import { Avatar, Button, Table, Tag } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React from 'react'
import { type LinkOutput } from '~/schema/Link.schema'
import { DeleteOutlined, EditOutlined, FileImageOutlined } from '@ant-design/icons'
import { type Pagination } from '~/types/PaginationData'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import MutateLinkModal from './MutateLinkModal'
import DeleteLinkButton from './DeleteLinkButton'

export type LinkTableProps = {
  data: LinkOutput[],
  pagination?: Pagination,
  loading?: boolean,
  onUpdate?: () => void
}


const LinkTable = ({
  data,
  pagination,
  loading,
  onUpdate
}: LinkTableProps) => {

  const router = useRouter()

  const columns: ColumnsType<LinkOutput> = [
    {
      title: 'Image',
      dataIndex: 'favicon',
      key: 'favicon',
      render: (value: string | undefined, root) => {
        return <Avatar src={value} icon={<FileImageOutlined />} />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      render: (value: string) => {
        return <a href={value}>{value}</a>
      }
    },
    {
      title: 'Visitors Count',
      dataIndex: 'visits',
      key: 'visit count',
      render: (value: string, root) => {
        return `${root.visits}`
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tages',
      render: (value: string, root) => {
        const tags = root.tags
        if(!tags || tags.length <= 0) return 'No tags'
        return <div>
          {
            root.tags?.map(tag => {
              return <Tag key={nanoid()}>{tag.name}</Tag>
            })
          }
        </div>
      }
    },

    {
      // title: 'Action',
      key: 'actions',
      render: (_, root) => {
          return(
              <div className='flex gap-2 justify-center'>
                  <DeleteLinkButton linkId={root.id} onDelete={onUpdate}>
                      {({loading, deleteLink}) => <Button onClick={() => deleteLink()} loading={loading} disabled={loading} size='small' danger icon={<DeleteOutlined/>}></Button>}
                  </DeleteLinkButton>
                  <MutateLinkModal data={root} onMutate={onUpdate}>
                  <Button  size='small' icon={<EditOutlined/>}></Button>
                  </MutateLinkModal>
              </div>
          )
      }
  }

  ]


  return (
    <div className=''>
      <Table
        scroll={{ x: true }}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={pagination ? {
          defaultCurrent: 1,
          current: pagination?.meta.currentPage || 1,
          total: pagination.meta.total,
          pageSize: pagination.meta.perPage,
          onChange: pagination.onChange,

        } : false} />
    </div>
  )
}

export default LinkTable