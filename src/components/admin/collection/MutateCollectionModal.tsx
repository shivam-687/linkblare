/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Modal } from 'antd';
import React, { ReactNode, useRef, useState } from 'react'
import MutateCollectionForm, { HandleMutateCollectionForm } from './MutateCollectionForm';
import { CollectionOutput } from '~/schema/Collection.schema';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

export type MutateCollectionModalProps = {
  onMutate?: () => void;
  children?: any,
  data?: CollectionOutput
}

const MutateCollectionModal = ({
  onMutate,
  children,
  data
}: MutateCollectionModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HandleMutateCollectionForm>(null)
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    void formRef.current?.done().then(() => {
      setIsModalOpen(false);
      formRef.current?.reset()
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {
        children ?
          React.cloneElement(children, {
            onClick: () => showModal()
          })
          : <Button type="primary" onClick={showModal} icon={data ? <EditOutlined/> : <PlusOutlined/>}>
            {data ? 'Edit' : 'Create'}
          </Button>
      }
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        <MutateCollectionForm ref={formRef} onMutate={onMutate} data={data} onLoading={setLoading} />
      </Modal>
    </>
  )
}

export default MutateCollectionModal