import { API } from "aws-amplify";
import { useCallback, useEffect, useRef, useState } from "react";
import { listBukkens, queryBukkensByUserId } from "../graphql/queries";
import { useAuth } from "./use-auth";
import { useMounted } from "./use-mounted";

export const useBukkenList = () => {
  const { user } = useAuth();
  const isMounted = useMounted();
  const [bukkenList, setBukkenList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      console.log("useBukkenList... ", { user });
      setLoading(true);

      //load list bukken

      const response = await API.graphql({
        query: queryBukkensByUserId,
        variables: {
          user_id: user.id,
        },
      });
      setBukkenList(response.data.queryBukkensByUserId.items);
      console.log("useBukkenList... ", response.data.queryBukkensByUserId);
      //end load list bukken
      setLoading(false);
    }

    if (isMounted) loadData();
  }, [isMounted]);

  return { bukkenList, loading };
};
