import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { type Sort } from "~/schema/helpers/WithSorting";

const useSort = () => {
    const {query} = useRouter();
    const [sort, setSortOption] = useState<Sort>();

    const setSort = () => {
        const sortBy = query.sortBy && typeof query.sortBy === 'string' ? [query.sortBy] : Array.isArray(query.sortBy) ? query.sortBy : undefined;
        const sortOrder = query.sortOrder && typeof query.sortOrder === 'string' ? [query.sortOrder] : Array.isArray(query.sortOrder) ? query.sortOrder : undefined;
        if(!sortBy) return setSortOption(undefined);
        const res: Sort = {};
        sortBy.map((key, index) => {
            if(sortOrder && sortOrder[index]){
                Object.assign(res, {[key]: sortOrder[index]});
                return;
            }
            Object.assign(res, {[key]: 'asc'});
            return;
        })

        setSortOption(res);
    }

    useEffect(() => {
        
        setSort()
      }, [query])


      return {
        sort,
        setSortOption
      }

}

export default useSort;