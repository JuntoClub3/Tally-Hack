import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

import AnimateFade from '@/components/Layout/AnimateFade';
import Multiplayer from '@/components/Multiplayer/Multiplayer';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';
import { Player } from '@/context/Room/types';

export default function MultiplayerPage() {
  const {
    room: { socket, user },
    dispatch,
    resetTime,
  } = useRoomContext();


  const router = useRouter();

  React.useEffect(() => {
    if (user.id && router?.query?.id) {
      socket.emit('join room', { roomId: router?.query?.id, user });
      dispatch({ type: 'SET_ROOM_ID', payload: router?.query?.id as string });

      socket.off('room update').on('room update', (players: Player[]) => {
        dispatch({ type: 'SET_PLAYERS', payload: players });
      });

      socket.off('start game').on('start game', () => {
        dispatch({ type: 'SET_STATUS', payload: { progress: 0, wpm: 0 } });
        dispatch({ type: 'SET_IS_FINISHED', payload: false });
        dispatch({ type: 'SET_WINNER', payload: null });
        resetTime(5).then(() =>
          dispatch({ type: 'SET_IS_READY', payload: true })
        );
      });

      dispatch({ type: 'SET_STATUS', payload: { progress: 0, wpm: 0 } });
      dispatch({ type: 'SET_IS_READY', payload: false });
      dispatch({ type: 'SET_IS_PLAYING', payload: false });
      dispatch({ type: 'SET_IS_FINISHED', payload: false });
      dispatch({ type: 'SET_WINNER', payload: null });
      resetTime(0);

      socket.off('end game').on('end game', (playerId: string) => {
        dispatch({ type: 'SET_IS_PLAYING', payload: false });
        dispatch({ type: 'SET_WINNER', payload: playerId });
        dispatch({ type: 'SET_IS_READY', payload: false });
      });

      socket.off('room invalid').on('room invalid', () => {
        toast.error("Room doesn't exist.", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "Room doesn't exist.",
          autoClose: 3000,
        });
        router.push('/multiplayer');
      });

      socket.off('room in game').on('room in game', () => {
        toast.error('Room is currently in game.', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'Room is currently in game.',
          autoClose: 3000,
        });
        router.push('/multiplayer');
      });

      socket.off('words generated').on('words generated', (text: string) => {
        dispatch({ type: 'SET_TEXT', payload: text });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, user.id]);

  return (
    <AnimateFade>
      <Seo title='Lightening Words' />

      <main>
        <section>
          <div className='layout flex flex-col items-center pt-28 text-center'>
            <Multiplayer />
          </div>
        </section>
      </main>

    </AnimateFade>
  );
}
