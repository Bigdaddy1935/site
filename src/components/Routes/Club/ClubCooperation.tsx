import SectionTitle from "@/components/Assets/SectionTitle";

const items = [
  {
    image: "/pooyan.png",
    link: "https://poian.ir/",
    text : "استعدادیابی پویان"
  },
  {
    image: "/nicico-logo.png",
    link: "https://www.nicico.com/",
  },
  {
    image: "/naft-basij.png",
    link: "https://www.nioc.ir/",
    text : "بسیج شرکت ملی نفت ایران (حوزه خواهران)"

  },
];
export default function ClubCooperation() {
  return (
    <div className="my-8">
      <SectionTitle title="افتخار همکاری با" subTitle="" />

      <div className="flex justify-between items-stretch flex-wrap">
        {items.map(({ image, link , text }, index) => (
          <div className="flex-1 min-w-[50%] lg:min-w-[25%] p-3">
            <a
              href={link}
              target="_blank"
              className="flex flex-col gap-2 justify-center h-full items-center bg-[rgb(42,148,244)] rounded-2xl flex-1 py-5"
              key={index}
            >
              <img className="object-contain" width={140} height={140} src={image} />

              {text && <p className="text-white font-semibold text-center">{text}</p>}
            </a>
          </div>
        ))}
        <div className="flex-1 w-[50%] lg:w-[25%] p-3">
          <a
            href={"#"}
            target="_blank"
            className="flex justify-center h-full items-center bg-[rgb(42,148,244)] rounded-2xl flex-1 py-5"
          >
            <p className="p-4 text-center text-white text-xl lg:text-2xl font-extrabold">
              علی زکریایی
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
