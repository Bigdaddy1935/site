"use client";
import Image from "@/components/Assets/Image";

export default function Animation({ success = true }: { success?: boolean }) {
  return (
    <div>
      {success ? (
        <Image
          src="/success.png"
          width="300"
          height="400"
          alt=""
          className="object-fill mb-6 mx-auto"
        />
      ) : (
        <Image
          src="/fail.png"
          width="300"
          height="400"
          alt=""
          className="object-fill mb-6 mx-auto"
        />
      )}
    </div>
  );
}
