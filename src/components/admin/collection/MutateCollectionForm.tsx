/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Button, Form, Input, InputNumber, message } from 'antd'
import { type CreateCollectionInput, type CollectionOutput, type UpdateCollectionInput } from '~/schema/Collection.schema'
import TagInput from '~/components/ui/TagInput'
import { api } from '~/utils/api'


export type MutateCollectionFormProps = {
  data?: CollectionOutput,
  selfSubmission?: boolean
  onMutate?: (collection: CollectionOutput) => void,
  onLoading?: (loading: boolean) => void,
  onError?: (error: any) => void,
}

export type HandleMutateCollectionForm = {
  done: () => Promise<void>,
  reset: () => void
}


const MutateCollectionForm = forwardRef<HandleMutateCollectionForm, MutateCollectionFormProps>(({
  data,
  onLoading,
  onMutate,
  onError,
  selfSubmission = false
}, ref) => {


  const [form] = Form.useForm<CreateCollectionInput | UpdateCollectionInput>();
  const [tags, setTags] = useState<string[]>();
  // MUTATIONS
  const updateMutation = api.collection.update.useMutation();
  const createMutation = api.collection.create.useMutation();

  const done = async () => {

    try {
      let res: CollectionOutput | null = null;
      const validatedData = await form.validateFields();
      // console.log({ ...{ ...validatedData, tags }})
      if (data) {
        res = await updateMutation.mutateAsync({ ...{ ...validatedData, tags } as UpdateCollectionInput })
      } else {
        res = await createMutation.mutateAsync({ ...{ ...validatedData, tags } as CreateCollectionInput })
      }
      res && onMutate?.(res);
      void message.success("Collection created successfully!")
    } catch (error) {
      onError?.(error);
      void message.error("Collection creation failed!")
    }
  }

  const fillDataToForm = (data: CollectionOutput) => {
    const { tags, id, image, title, desc } = data;

    setTags(tags.map(tag => tag.name));
    form.setFieldsValue({
      id,
      image: (image === null ? undefined : image),
      title,
      desc
    })
  }


  useImperativeHandle(ref, () => {
    return {
      done,
      reset: () => form.resetFields()
    }
  })


  useEffect(() => {
    if (data) {
      fillDataToForm(data)
    }
  }, [data])

  useEffect(() => {
    onLoading?.(updateMutation.isLoading || createMutation.isLoading)
  }, [updateMutation.isLoading, createMutation.isLoading])




  return (
    <div>
      <Form
        form={form}
        layout='vertical'
      >

        {
          data && <Form.Item name='id' hidden>
          <InputNumber />
        </Form.Item>
        }
        <Form.Item name='title'>
          <Input placeholder='Collection Title' />
        </Form.Item>
        <Form.Item name="desc">
          <Input.TextArea placeholder='Collection Description' />
        </Form.Item>
        <Form.Item>
          <TagInput onTagChange={setTags} value={tags} />
        </Form.Item>
      </Form>

      {
        selfSubmission &&
        <div className="flex justify-end mt-5">
          <Button onClick={void done} type="primary">{data ? 'Save' : 'Create'}</Button>
        </div>
      }

    </div>
  )
})

MutateCollectionForm.displayName = 'MutateCollectionForm'
export default MutateCollectionForm