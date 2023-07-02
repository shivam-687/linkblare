import { Divider, Tag } from 'antd'
import { nanoid } from 'nanoid'
import React, { PropsWithChildren } from 'react'
import { CollectionOutput } from '~/schema/Collection.schema'

export type CollectionInfoProps = {
    collection?: CollectionOutput,
    loading?: boolean
}

const CollectionInfo = ({
    collection,
    loading
}: CollectionInfoProps) => {


    return (
        <div className='w-full'>

            <Divider orientation='left'>Description</Divider>
            <p>{collection?.desc}</p>
            <Divider orientation='left'>Tags</Divider>
            {
                collection?.tags?.map(tag => {
                    return <Tag key={nanoid()}>{tag.name}</Tag>
                })
            }
            
        </div>
    )
}

export default CollectionInfo