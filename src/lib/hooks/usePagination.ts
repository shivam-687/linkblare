import { useRouter } from "next/router"
import { PaginateOptions } from "prisma-pagination";
import { useEffect, useState } from "react";

export const usePagination = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginateOptions>();

  useEffect(() => {
    const page = router.query.page && String(router.query.page);
    const perPage = router.query.perPage && String(router.query.perPage);
    
    setPagination({page, perPage})
  }, [router.query])

  return {
    pagination,
    setPagination,
  }
}