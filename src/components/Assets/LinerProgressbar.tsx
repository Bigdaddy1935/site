import { darkenHexColor } from "@/lib/number";

type Props = {
    progress: number;
    color?: string;
}
export default function LinerProgressbar(props: Props) {
    const { progress, color = '#3E8914' } = props;
    return (
        <div className="flex items-center flex-row-reverse">
            <span className="text-hgray-600 dark:text-text-dark-2 inline-block mr-1">%0</span>
            <div className="relative py-5 w-full">
                <div className='bg-hgray-300 absolute z-20 right-0 left-0 rounded-full h-1.5'></div>
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: `${color}`,
                    }}
                    className='bg-primary-700 absolute z-20  left-0 rounded-full h-1.5'></div>
                {progress < 100 ? <span style={{ color: darkenHexColor(color, 80), left: `calc(${progress}% - 20px)` }} className="absolute dark:!text-text-dark-1 top-0 text-sm">%{progress}</span> : null}
            </div>

            <span className="text-hgray-600 dark:text-text-dark-2  inline-block ml-1">%100</span>
        </div>
    )
}
