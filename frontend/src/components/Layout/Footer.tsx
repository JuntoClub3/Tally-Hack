import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from '@/components/Link/UnstyledLink';

export default function Footer() {
  return (
    <footer
      className={clsx(
        'layout flex h-full justify-self-end bg-transparent pt-12 pb-8'
      )}
    >
      <div className='flex w-full items-center justify-center font-primary'>
        <UnstyledLink
          href=''
          className='flex cursor-pointer items-center space-x-1.5 fill-hl/50 text-sm text-fg/50 transition-colors duration-200 hover:fill-hl hover:text-fg'
        >
          <div>Made with 💖 by JuntoClub</div>

        </UnstyledLink>
      </div>
    </footer >
  );
}
