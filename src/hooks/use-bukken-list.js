import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { queryBukkensByUserIdWithCoverImage } from "../graphql/custom-queries";
import { useAuth } from "./use-auth";
import { useMounted } from "./use-mounted";
import * as R from 'ramda'
import { getBukkenCoverImageUrlByBukken } from "../utils/bukken";

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
        query: queryBukkensByUserIdWithCoverImage,
        variables: {
          user_id: user.id,
        },
      });
      var bukkenList = response.data.queryBukkensByUserId.items
      if (!R.isNil(bukkenList) && !R.isEmpty(bukkenList)) {
        bukkenList.forEach(buk => {
          buk.image = getBukkenCoverImageUrlByBukken(buk)
        });
      }
      setBukkenList(bukkenList);
      //end load list bukken
      setLoading(false);
    }

    if (isMounted) loadData();
  }, [isMounted]);

  return { bukkenList, loading };
};
