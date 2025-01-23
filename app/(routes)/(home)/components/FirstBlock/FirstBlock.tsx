
import { Reveal } from "@/components/Shared/Reveal";
import Image from "next/image";

export function FirstBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
      <Reveal classname="p-6 lg:pl-40" position="bottom">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold">
          Premiun
          <span className="block">Car Rental</span>
          in Cuba
        </h2>

        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
          Dont deny yourself of driving the best premium cars from around the
          world here and now
        </p>
      </Reveal>

    <Reveal position="right">
      <div className="flex justify-end">
        <Image src="/images/principal.png" alt="Rent cars" width={600} height={600} priority />
      </div>
    </Reveal>
    </div>
  );
}
