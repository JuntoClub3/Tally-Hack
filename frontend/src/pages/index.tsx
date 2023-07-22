import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { IoMdPerson } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';

import Button from '@/components/Button/Button';
import AnimateFade from '@/components/Layout/AnimateFade';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';

import HomeImg from './ani.png';


export default function HomePage() {
  const router = useRouter();

  const methods = useForm<{ code: string }>({
    mode: 'onTouched',
  });

  const { dispatch } = useRoomContext();

  return (
    <AnimateFade>
      <Seo title='Lightening Words ⚡' />

      <main>
        <section>
          <div className='layout flex flex-col items-center gap-8 pt-8 text-center'>

            <div className='z-10 aspect-image w-full mt-10 max-w-[400px] max-h-[300px] overflow-hidden rounded-lg ring-2'>
              <Image
                src={HomeImg}
                width={600}
                height={580}
                alt="Picture of the author"
              />
            </div>



            <div className='flex items-center gap-4'>
              <Button
                onClick={() => router.push('/solo')}
                className='flex items-center'
              >
                <IoMdPerson className='mr-1' />
                Single Player
              </Button>
              <div>
                <Button
                  onClick={() => router.push('/multiplayer')}
                  className='flex items-center'
                >
                  <RiTeamFill className='mr-1' />
                  Multiplayer
                </Button>
              </div>
            </div>


          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
