import EmptyButton from "@/components/Assets/EmptyButton";
import IconShare2 from "@/components/Icons/IconShare2";

export default function SharBtn() {
  return (
    <EmptyButton className="border-2 !border-solid  rounded-md border-[#bfbfbf] dark:border-white">
      <IconShare2 width={20} height={20} className='text-[#bfbfbf] dark:text-white' />
    </EmptyButton>
  )
}
