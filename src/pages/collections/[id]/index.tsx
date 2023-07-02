import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { type InferGetServerSidePropsType, type GetServerSidePropsContext } from 'next';
import React from 'react'
import SuperJSON from 'superjson';
import LinkGrid from '~/components/link/LinkGrid';
import { useInfiniteLinkList } from '~/lib/hooks/useInfiniteLinkList';
import { type CollectionOutput } from '~/schema/Collection.schema';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const helpers = createProxySSGHelpers({
    ctx: createInnerTRPCContext({ session: await getServerAuthSession({ ...context }) }),
    router: appRouter,
    transformer: SuperJSON,
  });

  const id = context.params?.id;
  if (!id || Number.isNaN(parseInt(id))) return {
    notFound: true
  };
  const collection = await helpers.collection.get.fetch({id: Number(id)});

  if(!collection){
    return{
      notFound: true
    }
  }
  await helpers.link.list.prefetch({ collectionId: parseInt(id) });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      collection: JSON.parse(JSON.stringify(collection)) as CollectionOutput
    }
  }
}

const SingleCollectionPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {linkData, isLoading, fetchNextPage} = useInfiniteLinkList({collectionId: Number(props.id)})

  
  return (
    <div>
      <div className='mb-4'>
        <h1 className='text-lg md:text-xl font-bold'>{props.collection.title}</h1>
      </div>
      <LinkGrid links={linkData} loading={isLoading} fetchNextPage={() => void fetchNextPage()} />
    </div>
  )
}

export default SingleCollectionPage