"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  targetNumber: number;
  interval?: number;
};
export default function Counter({ targetNumber, interval }: Props) {
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let timer: any;
    //  const currentInterval = interval ?? (targetNumber > 0 ? (targetNumber / 2000) : 20);
    if (startCounting && count < targetNumber) {
      timer = setTimeout(
        () => {
          setCount((prevCount) => prevCount + 1);
        },
        1 / (targetNumber / 2000)
      );
    }
    return () => clearTimeout(timer);
  }, [startCounting, count, targetNumber, interval]);

  return (
    <div
      className="relative flex justify-center items-center h-[70px] w-[70px] border-2 rounded-lg border-solid border-primary-300"
      ref={counterRef}
    >
      <span className="absolute right-0 top-0 h-[70px] w-[70px] bg-primary-700/15 dark:bg-primary-100/50 rounded-lg  -rotate-[30deg]"></span>
      <p className="text-2xl font-bold z-10 relative text-primary-700 dark:text-text-dark-2">
        {count}
      </p>
    </div>
  );
}
