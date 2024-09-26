"use client"
import { useThemeSwitch } from '@/hooks/useThemeSwitch';
import { useMemo } from 'react';
import BaseSkeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function Skeleton(props: SkeletonProps) {
    const { mode } = useThemeSwitch();
    
    const baseColor = useMemo(() => {
        return mode === 'dark' ? '#3c4059' : undefined
    }, [mode])
    const highlightColor = useMemo(() => {
        return mode === 'dark' ? '#28293d' : undefined
    }, [mode])
    return (
        <BaseSkeleton
            {...props}
            highlightColor={highlightColor}
            baseColor={baseColor}
        />
    )
}
