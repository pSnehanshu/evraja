import _ from 'lodash';
import { db } from '../utils/firebase';
import VehicleCard from '../components/Vehicle/VehicleCard';
import Link from 'next/link';
import Head from 'next/head';

export async function getServerSideProps() {
  const doc = await db.collection('vehicles').get();
  const vehicles = doc.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  Array(10)
    .fill('')
    .forEach(() => {
      vehicles.push(vehicles[0]);
    });

  return {
    props: { vehicles },
  };
}

export default function Home({ vehicles }) {
  return (
    <div>
      <Head>
        <title>EV Raja - The online Electric Vehicle directory for India</title>
      </Head>
      <section className="p-2">
        <h1 className="text-lg mb-2">Latest cars</h1>
        <div className="flex overflow-auto">
          {_.map(vehicles, (vehicle) => (
            <Link href={`/vehicle/${vehicle?.id}`} passHref>
              <a>
                <VehicleCard
                  vehicle={vehicle}
                  className="shadow w-60 mr-2"
                  key={vehicle?.id}
                />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
