/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react'
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import MutateLinkForm, { type HandleMutateLinkForm } from './MutateLinkForm';
import { type LinkOutput } from '~/schema/Link.schema';

export type MutateCollectionModalProps = {
  onMutate?: () => void;
  children?: any,
  data?: LinkOutput,
  rootCollection?: {
    id: number,
    title: string
  }
}

const MutateLinkModal = ({
  onMutate,
  children,
  data,
  rootCollection
}: MutateCollectionModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HandleMutateLinkForm>(null)
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    void formRef.current?.done().then(() => {
      if (!isError) {
        setIsModalOpen(false);
        formRef.current?.reset()
      }
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    if(!data)formRef.current?.reset()
  };
  return (
    <>
      {
        children ?
          React.cloneElement(children, {
            onClick: () => showModal()
          })
          : <Button type="primary" onClick={showModal} icon={data ? <EditOutlined /> : <PlusOutlined />}>
            {data ? 'Edit' : 'Create'}
          </Button>
      }
      <Modal title="Link" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        {
          (rootCollection || data) && <MutateLinkForm rootCollection={rootCollection} ref={formRef} onMutate={onMutate} data={data} onLoading={setLoading} onError={(error) => setIsError(error)} />
        }
      </Modal>
    </>
  )
}

export default MutateLinkModal