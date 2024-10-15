"use client";
import Paper from "@/components/Assets/Paper";
import Divider from "@/components/Divider";
import { useDepositHistoryQuery } from "@/lib/services/wallet";
import Skeleton from "react-loading-skeleton";
import WalletItem from "./WalletItem";

export default function WalletSummery() {
  const { data, isLoading } = useDepositHistoryQuery();
  return (
    <Paper className="px-5 flex-1">
      <div className="flex flex-col">
        <p className="text-lg text-hgray-600 dark:text-white font-medium">
          سابقه کیف پول
        </p>

        <Divider space="my-3" />

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton width="100%" height="48px" className="rounded-lg" />
              <Skeleton width="100%" height="48px" className="rounded-lg" />
              <Skeleton width="100%" height="48px" className="rounded-lg" />
            </>
          ) : data && data?.length > 0 ? (
            data
              ?.slice(0, 4)
              .map((item) => <WalletItem key={item.id} {...item} />)
          ) : (
            <p className="text-hgray-500 dark:text-text-dark-3">رکوردی برای شارژ کیف پول ثبت نشده است</p>
          )}
        </div>
      </div>
    </Paper>
  );
}
