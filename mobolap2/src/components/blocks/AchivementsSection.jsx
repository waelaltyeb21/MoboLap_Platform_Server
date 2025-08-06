import { MapPin, MonitorSmartphone, Users } from "lucide-react";
import React from "react";
import { NumberTicker } from "../magicui/number-ticker";

const Achivements = [
  {
    id: 1,
    title: "منتجات المتجر",
    num: 360,
    icon: <MonitorSmartphone size={30} />,
  },
  {
    id: 2,
    title: "عملاء سٌعداء",
    num: 860,
    icon: <Users size={30} />,
  },
  {
    id: 3,
    title: "فروع المتجر في الولايات",
    num: 860,
    icon: <MapPin size={30} />,
  },
  {
    id: 4,
    title: "منتجات المتجر",
    num: 14,
    icon: <MonitorSmartphone size={30} />,
  },
];

const AchivementsSection = () => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-20">
      {Achivements?.map((achivement) => (
        <div
          key={achivement?._id}
          className="flex items-center gap-4 cursor-pointer border border-slate-300 hover:shadow-lg hover:shadow-slate-600/10 p-4 rounded-xl smooth-transition hover:-translate-y-2"
        >
          <div className="self-start">{achivement?.icon}</div>
          <div>
            <NumberTicker
              value={achivement?.num}
              className="whitespace-pre-wrap text-3xl font-medium tracking-tighter text-black dark:text-white"
            />
            <h1 className="text-xl">{achivement?.title}</h1>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AchivementsSection;
