import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { InferGetServerSidePropsType, type GetServerSidePropsContext } from 'next';
import React from 'react'
import SuperJSON from 'superjson';
import LinkGrid from '~/components/link/LinkGrid';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/utils/api';

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const helpers = createProxySSGHelpers({
    ctx: createInnerTRPCContext({ session: await getServerAuthSession({ ...context }) }),
    router: appRouter,
    transformer: SuperJSON,
  });

  const linkId = context.params?.id;
  if (!linkId || Number.isNaN(parseInt(linkId))) return {
    notFound: true
  };

  const res = await helpers.link.go.fetch({linkId: Number(linkId)})
  
  return {
    redirect: {
      destination: res.url,
      permanent: false,
    },
  }
}

const GoToPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
 
  return (
    <div>
      <h1>Invalid Link</h1>
    </div>
  )
}

export default GoToPage