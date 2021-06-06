import Image from 'next/image';
import Head from 'next/head';
import { db } from '../../utils/firebase';
import { useState } from 'react';

export async function getServerSideProps({ params }) {
  try {
    const docRef = db.collection('vehicles').doc(params?.id);
    const doc = await docRef.get();
    const vehicle = doc.data();

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    const photos = Array(10)
      .fill('')
      .map(() => vehicle.main_image);

    return {
      props: { vehicle, photos },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

function VehicleDesktop({ vehicle, photos = [] }) {
  const [visiblePhotoIndex, setVisiblePhotoIndex] = useState(0);
  const allPhotos = [vehicle?.main_image, ...photos];

  const nextPhoto = () => {
    setVisiblePhotoIndex((i) => {
      return (i + 1) % allPhotos.length;
    });
  };

  const prevPhoto = () => {
    setVisiblePhotoIndex((i) => {
      const newI = i - 1;
      return newI < 0 ? allPhotos.length + newI : newI;
    });
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 p-4 gap-2">
        <div className="relative w-full mr-1" style={{ height: '40em' }}>
          <Image
            src={allPhotos[visiblePhotoIndex]}
            layout="fill"
            objectFit="cover"
            quality="100"
          />
          <button
            onClick={prevPhoto}
            className="absolute left-1 top-1/2 bg-gray-200 p-2 rounded-md border"
            style={{ transform: 'rotateZ(180deg)' }}
          >
            &#10148;
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-1 top-1/2 bg-gray-200 p-2 rounded-md border"
          >
            &#10148;
          </button>
        </div>
        <div>
          <h1 className="text-4xl">{vehicle?.name}</h1>
        </div>
      </div>
    </div>
  );
}

function VehicleMobile({ vehicle, photos = [] }) {
  const allPhotos = [vehicle?.main_image, ...photos];

  return (
    <div>
      <div className="flex overflow-auto">
        {allPhotos.map((photo) => (
          <span key={photo}>
            <div className="relative h-96 w-96 mr-1">
              <Image
                src={photo}
                layout="fill"
                objectFit="cover"
                quality="100"
              />
            </div>
          </span>
        ))}
      </div>

      <div className="p-4">
        <h1 className="text-3xl">{vehicle?.name}</h1>
      </div>
    </div>
  );
}

export default function Vehicle({ vehicle, photos = [] }) {
  if (!vehicle) {
    return <div>404</div>;
  }

  return (
    <div>
      <Head>
        <title>{vehicle?.name}</title>
      </Head>

      <div className="hidden md:block">
        <VehicleDesktop vehicle={vehicle} photos={photos} />
      </div>

      <div className="md:hidden">
        <VehicleMobile vehicle={vehicle} photos={photos} />
      </div>
    </div>
  );
}
