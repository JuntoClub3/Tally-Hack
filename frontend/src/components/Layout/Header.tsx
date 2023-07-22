import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  FaKeyboard,
  FaRegUser,
  FaTerminal,
  FaUser,
} from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { TbKeyboard } from 'react-icons/tb';

// import useProfile from '@/hooks/useProfile';

import Tooltip from '@/components/Tooltip';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';


const themeList = [
  'green',
  'dark',
  'light',

] as const;

const typeList = ['easy', 'medium', 'hard'];
const timeList = ['15', '30', '45', '60', '120'];

type Theme = typeof themeList[number];

export default function Header() {
  const {
    preferences: { type, time, theme },
    dispatch,
  } = usePreferenceContext();

  // const { user } = useProfile();

  const { pathname } = useRouter();

  return (
    <header className={clsx('layout bg-transparent font-primary')}>
      <div className='flex w-full flex-col items-center justify-between space-y-2 pt-12 sm:flex-row sm:space-y-0 sm:space-x-6'>
        <div className='group flex w-full items-center justify-start space-x-6 sm:w-auto'>
          <Link href='/'>
            <a>
              <div className='flex space-x-1'>
                <div className='relative text-3xl font-bold text-fg'>
                  <div
                    className={clsx(
                      'absolute -top-3 left-0 text-[8px] transition-colors duration-200 group-hover:text-fg',
                      [pathname === '/' ? 'text-fg' : 'text-fg/60']
                    )}
                  >
                  </div>
                  <span
                    className={clsx(
                      'transition-colors duration-200 group-hover:text-hl',
                      [pathname === '/' ? 'text-hl' : 'text-hl/60']
                    )}
                  >
                    Lightening Words
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <nav className='flex w-full flex-1 items-center justify-between sm:w-auto'>
          <div className='flex space-x-6'>
            <div className='relative'>
              <div className='peer'>
                <div className='flex flex-wrap gap-2'>
                  <select
                    name='theme'
                    id='theme'
                    value={theme}
                    className={clsx(
                      'block max-w-xs rounded text-sm',
                      'border-none bg-hl text-bg',
                      'focus:border-bg focus:outline-font focus:ring focus:ring-bg',
                      'font-primary'
                    )}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_THEME',
                        payload: e.target.value as Theme,
                      })
                    }
                  >
                    {themeList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


          </div>
          <div className='hidden flex-col -space-y-1 sm:space-y-1 ns:flex'>
            <div className='flex cursor-pointer list-none space-x-1.5 text-[10px] font-semibold sm:text-xs'>
              {typeList.map((item) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TYPE', payload: item })}
                  key={item}
                  className={`${item === type ? 'text-hl' : 'text-hl/50'
                    } transition-colors duration-200 hover:text-hl`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className='flex cursor-pointer list-none justify-end space-x-2 text-[10px] font-semibold sm:text-xs'>
              {timeList.map((item) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TIME', payload: item })}
                  key={item}
                  className={`${item === time ? 'text-hl' : 'text-hl/50'
                    } transition-colors duration-200 hover:text-hl`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
