/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ColumnsType } from 'antd/es/table';
import { Button, Table, Tag } from 'antd';
import React from 'react'
import { type CollectionOutput } from '~/schema/Collection.schema';
import { PaginatedResult } from 'prisma-pagination';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MutateCollectionModal from './MutateCollectionModal';
import DeleteCollectioButton from './DeleteCollectioButton';
import { nanoid } from 'nanoid';
import Link from 'next/link';


export type CollectionTableProps = {
    collectionData?: PaginatedResult<CollectionOutput>|undefined,
    isLoading?: boolean,
    onUpdate?: () => void
}

const CollectionTable = ({
    collectionData,
    isLoading,
    onUpdate
}: CollectionTableProps) => {
    
    const columns: ColumnsType<CollectionOutput> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, root) => {
                return <Link href={`/admin/collection/${root.id}`}>{value}</Link>
            }
        },
        {
            title: 'Links Count',
            dataIndex: '_count.links',
            key: 'links_count',
            render: (value, root) => {
                return root._count.links
            }
        },
        {
            title: 'Saves Count',
            dataIndex: '_count.',
            key: 'saves_count',
            render: (value, root) => {
                return root._count.saves
            }
        },

        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (value, root) => {
                return root.createdBy.name
            }
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (value, root) => {
                return <div className='flex gap-1'>
                    {
                        root.tags.map(tag => {
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
                        <DeleteCollectioButton collectionId={root.id} onDelete={onUpdate}>
                            {({loading, deleteCollection}) => <Button onClick={() => deleteCollection()} loading={loading} disabled={loading} size='small' danger icon={<DeleteOutlined/>}></Button>}
                        </DeleteCollectioButton>
                        <MutateCollectionModal data={root} onMutate={onUpdate}>
                        <Button  size='small' icon={<EditOutlined/>}></Button>
                        </MutateCollectionModal>
                    </div>
                )
            }
        }
    ];
    return (
        <div className=''>
            <Table scroll={{x: true}} loading={isLoading} columns={columns} dataSource={collectionData?.data} />
        </div>
    )
}

export default CollectionTable