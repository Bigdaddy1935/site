import React from 'react'
import IconLoading from '../Icons/IconLoading'

export default function LoadingBox() {
    return (
        <div className="w-full flex justify-center items-center h-[400px] bg-hgray-400/20 rounded-xl my-16">
            <IconLoading
                className="mx-auto inline-block"
                width={36}
                height={36}
            />
        </div>
    )
}
