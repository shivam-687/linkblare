/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Avatar, Button, Form, Input, InputNumber, Select, message } from 'antd'
import TagInput from '~/components/ui/TagInput'
import { api } from '~/utils/api'
import { type CreateLinkInput, type LinkOutput, type UpdateLinkInput } from '~/schema/Link.schema'
import { LinkType } from '@prisma/client'
import { getDefaultFaviconUrl, getRootUrl, normalizeUrl } from '~/utils/helpers'
import { TRPCClientError } from '@trpc/client'
import { isUrl } from '~/utils/helpers'
import { getLinkInfo } from '~/lib/scrapping/getLinkInfo'
import { FileImageOutlined } from '@ant-design/icons'


export type MutateLinkFormProps = {
  data?: LinkOutput,
  rootCollection?: {
    id: number,
    title: string
  },
  selfSubmission?: boolean
  onMutate?: (link: LinkOutput) => void,
  onLoading?: (loading: boolean) => void,
  onError?: (error: any) => void,
}

export type HandleMutateLinkForm = {
  done: () => Promise<void>,
  reset: () => void
}


const MutateLinkForm = forwardRef<HandleMutateLinkForm, MutateLinkFormProps>(({
  data,
  onLoading,
  onMutate,
  onError,
  selfSubmission = false,
  rootCollection
}, ref) => {


  const [form] = Form.useForm<CreateLinkInput | UpdateLinkInput>();
  const [faviconUrl, setFaviconUrl] = useState<string>()
  const [tags, setTags] = useState<string[]>();
  // MUTATIONS
  const updateMutation = api.link.update.useMutation();
  const createMutation = api.link.create.useMutation();

  const done = async () => {
    try {
      let res: LinkOutput | null | undefined = null;
      const validatedData = await form.validateFields();
      if (data) {
        res = await updateMutation.mutateAsync({ ...{ ...validatedData, tags, } as UpdateLinkInput })
      } else {
        res = await createMutation.mutateAsync({ ...{ ...validatedData, tags } as CreateLinkInput })
      }
      res && onMutate?.(res);
      void message.success(data ? 'Link Updated successfully!' : 'Link created successfully!')
    } catch (error) {
      onError?.(error);
      if (error instanceof TRPCClientError) {
        void message.error(error.message)
      } else {
        void message.error(data ? 'Link Updated Unsuccessfull!' : 'Link created Unsuccessfull!')
      }
    }
  }

  const fillDataToForm = (data: LinkOutput) => {
    const { tags = [], id, title, url, collectionId, desc, favicon, type, image } = data;

    setTags(tags.map(tag => tag.name));
    form.setFieldsValue({
      id,
      title,
      url,
      desc: desc === null ? undefined : desc,
      favicon: favicon === null ? undefined : favicon,
      type,
      collectionId,
      image: image === null ? undefined : image
    })
  }

  const norm = (value: string) => {
    updateFaviconValue(value);
    return normalizeUrl(value);
  }

  const updateFaviconValue = (url: string) => {
    if(form.getFieldError('url').length > 0) return;
    const favUrl = getDefaultFaviconUrl(
      getRootUrl(url), 
      {});
    form.setFieldValue('favicon', favUrl);
    setFaviconUrl(favUrl);
  }


  useImperativeHandle(ref, () => {
    return {
      done,
      reset: () => {
        form.resetFields();
        setTags([]);
      }
    }
  })




  useEffect(() => {
    console.log("Data filling", data)
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
        <Form.Item normalize={norm} name='url' rules={[{ required: true, message: 'Url is required' }, { type: 'url', message: 'Invalid url' }]}>
          <Input
            placeholder='Link URL'

          />
        </Form.Item>
        <Form.Item name='image'>
          <Input placeholder='Image Url' />
        </Form.Item>
        <Form.Item name='title'>
          <Input placeholder='Link Title' />
        </Form.Item>
        <Form.Item name="desc">
          <Input.TextArea placeholder='Link Description' />
        </Form.Item>
        <div className="flex items-start gap-3">
          {/* <p>{form.getFieldValue('favicon')}</p> */}
          <div className="flex-grow-0">
            <div className="w-10 h-10 rounded-lg bg-center bg-contain bg-no-repeat bg-slate-400" style={{backgroundImage: `url(${faviconUrl||''})`}}></div>
            </div>
          <div className="flex-grow">
            <Form.Item name='favicon' >
              <Input placeholder='Favicon Url' />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="type" initialValue={LinkType.PAGE}>
          <Select >
            <Select.Option value={LinkType.ARTICLE}>Article</Select.Option>
            <Select.Option value={LinkType.PAGE}>Page</Select.Option>
            <Select.Option value={LinkType.VIDEO}>Video</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='collectionId' initialValue={data?.collection?.id || rootCollection?.id}>
          <Select defaultValue={data?.collection?.id || rootCollection?.id}>
            <Select.Option value={data?.collection?.id || rootCollection?.id}>{data?.collection?.title || rootCollection?.title || 'Unknown Collection'}</Select.Option>
          </Select>
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

MutateLinkForm.displayName = 'MutateLinkForm'
export default MutateLinkForm