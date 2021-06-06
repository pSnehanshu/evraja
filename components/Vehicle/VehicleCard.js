import clsx from 'clsx';
import Image from 'next/image';

export default function VehicleCard({ vehicle, className, style }) {
  return (
    <div className={clsx(className, '')} style={{ ...style }}>
      <div className="relative h-60">
        <Image
          src={vehicle?.main_image}
          layout="fill"
          objectFit="cover"
          quality="10"
        />
      </div>
      <div className="p-5">
        <h2>{vehicle?.name}</h2>
      </div>
    </div>
  );
}
