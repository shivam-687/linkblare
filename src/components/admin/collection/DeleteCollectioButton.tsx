import { DeleteOutlined } from '@ant-design/icons'
import { Collection } from '@prisma/client'
import { Button, Modal, message } from 'antd'
import React from 'react'
import { api } from '~/utils/api'

export type DeleteCollectioButtonProps = {
    collectionId: number,
    onDelete?: (collection: Collection) => void,
    children?: React.DetailedReactHTMLElement<any, HTMLElement>|((props: {
        loading: boolean,
        deleteCollection: () => void
    }) => React.ReactNode)
}

const DeleteCollectioButton = ({
    collectionId,
    children,
    onDelete
}: DeleteCollectioButtonProps) => {

    const deleteMutation = api.collection.delete.useMutation();
    
    const deleteCollection = async () => {
        try {
            const res = await deleteMutation.mutateAsync({id: collectionId});
            if(res) onDelete?.(res);
            void message.success("Collection deleted successfully!")
        } catch (error) {
            void message.error("Collection delete unsuccessfull!");
            console.log(error);
        }
    }

    const confirmDeletion = () => {
        if(deleteMutation.isLoading) return;
        Modal.confirm({
            content: <div>Are you want to delete this <span>Collection</span>.</div>,
            onOk: deleteCollection
        })
    }

    if(children && typeof children === 'function'){
        return <>
        {
            children({
                loading: deleteMutation.isLoading,
                deleteCollection: confirmDeletion
            })
        }
        </>;
    } 
    
    if(children  && typeof children !== 'function'){
        return <>{
            React.cloneElement(children, {
                onClick: () => void confirmDeletion()
            })
        }</>
    }

  return (
    <Button danger icon={<DeleteOutlined/>} loading={deleteMutation.isLoading} disabled={deleteMutation.isLoading}></Button>
  )
}

export default DeleteCollectioButton