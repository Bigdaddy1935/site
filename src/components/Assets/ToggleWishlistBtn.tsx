"use client";

import EmptyButton from "@/components/Assets/EmptyButton";
import IconHeart from "@/components/Icons/IconHeart";
import IconHeartFill from "@/components/Icons/IconHeartFill";
import IconLoading from "@/components/Icons/IconLoading";
import { useLoginPopup } from "@/lib/LoginPopupContext";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useLikeMutation } from "@/lib/services/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { Model } from "@/types/";

type Props = {
    like: boolean;
    id: number;
    like_count: number;
    model: Model;
    color?: string;
    hiddenCount?: boolean;
}

export default function ToggleWishlistBtn(props: Props) {
    const { id, like, like_count, model, color, hiddenCount } = props;
    const [handleLike, { isLoading }] = useLikeMutation();
    const { setActive } = useLoginPopup()
    const [click, setClick] = useState(like);
    const user = useAppSelector(selectUser);
    const handleClick = () => {
        if (user) {
            handleLike({ id, model }).then(() => setClick(!click))
        } else {
            toast.warn('لطفا ابتدا وارد حساب کاربری خود شده یا در سایت ثبت نام نمایید.')
        }
    }
    const getLikeStatus = () => {
        if (!like && click) return 1;

        if (!click && like) return -1

        return 0
    }
    return (
        <EmptyButton className="flex items-center" onClick={handleClick}>
            {isLoading ? <IconLoading width={28} height={28} className="text-[#bfbfbf]" /> :
                <>
                    {click ? <>
                    {/*     {!hiddenCount && <span style={{ color }} className="ml-2 dark:text-white">{like_count + (getLikeStatus())}</span>} */}
                        <IconHeartFill width={28} height={28} style={{ color }} className='text-[#bfbfbf] dark:text-white' />
                    </> : <IconHeart width={28} height={28} className='text-rose-900 dark:text-white' />}
                </>
            }

        </EmptyButton>
    )
}
