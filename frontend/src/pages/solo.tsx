import * as React from 'react';

import Box from '@/components/Game/Box';

import AnimateFade from '@/components/Layout/AnimateFade';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function SoloPage() {
  return (
    <AnimateFade>
      <Seo title='Lightening Words ⚡' />

      <main>
        <section>
          <div className='layout flex flex-col items-center pt-36 text-center'>
            <Box />
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
