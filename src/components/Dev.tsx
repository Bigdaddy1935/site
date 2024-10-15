"use client"

import { getAllArticels } from '@/lib/utils'
import { useEffect } from 'react'

export default function Dev() {

    useEffect(() => {
        getAllArticels().then(res => console.log({ arts: res }))
    }, [])
    return (
        <div>Dev</div>
    )
}
