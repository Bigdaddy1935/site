"use client"
import LinerProgressbar from '@/components/Assets/LinerProgressbar'
import Paper from '@/components/Assets/Paper'
import Divider from '@/components/Divider'
import ClubTermList from '../Club/ClubTermList'

export default function MahdiyarProgress() {
    return (
        <div className='px-5 flex-1'>
            <div className='flex items-stretch flex-col'>
                <p className='text-lg text-hgray-600 dark:text-white font-medium'>مهدیار شو</p>

                <Divider space='my-3' />

                <ClubTermList />
            </div>
        </div>
    )
}
