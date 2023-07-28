/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from 'next'
import React from 'react'
import { createInnerTRPCContext } from '~/server/api/trpc';
import {appRouter} from '../../../server/api/root'
import SuperJSON from 'superjson';
import { api } from '~/utils/api';
import LinkTable from '~/components/link/LinkTable';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MutateLinkModal from '~/components/link/MutateLinkModal';
import { usePagination } from '~/lib/hooks/usePagination';
import { getServerAuthSession } from '~/server/auth';


export async function getServerSideProps(
  context: GetServerSidePropsContext<{collectionId: string}>
){
  const helpers = createProxySSGHelpers({
    ctx: createInnerTRPCContext({session: await getServerAuthSession({...context})}),
    router: appRouter,
    transformer: SuperJSON,
  });

  const id = context.params?.collectionId;
  if(!id || Number.isNaN(parseInt(id))) return {
    notFound: true
  };

  // await helpers.link.list.prefetch({collectionId: parseInt(id)});

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    }
  }
}

const SingleCollectionPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {id} = props;
  const {pagination, setPagination} = usePagination();
  const {data: collection, isLoading: collectionLoading} = api.collection.get.useQuery({ id: parseInt(id)}, {refetchOnWindowFocus:false})
  const {data: linksData, isLoading, refetch} = api.link.list.useQuery({collectionId: parseInt(id), pagination}, {refetchOnWindowFocus:false})

  return (
    <>
    <div className='flex items-center justify-between my-10'>
      <div>
        <h1 className='text-lg font-bold'>{collection?.title}</h1>
      </div>
      <div>
        <MutateLinkModal onMutate={() => void refetch()} rootCollection={collection && collection !== null ? collection : undefined} ><Button loading={collectionLoading} type="primary" icon={<PlusOutlined/>}>Add</Button></MutateLinkModal>
      </div>
    </div>
    <LinkTable 
    onUpdate={() => void refetch()}
    data={linksData?.data ||[]} 
    loading={isLoading} 
    pagination={linksData?.meta&& {
      meta: linksData.meta,
      onChange: (page, perPage) => {
        setPagination({page, perPage})
      }
    }}/>
    </>
  )
}

export default SingleCollectionPage