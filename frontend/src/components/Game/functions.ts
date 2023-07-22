import hard from '../../data/hard.json';
import medium from '../../data/medium.json';
import easy from '../../data/easy.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

export const shuffleList = (type: string) => {
  switch (type) {
    case 'easy':
      return _.shuffle(easy).slice(0, 150);
    case 'medium':
      return _.shuffle(medium).slice(0, 150);
    case 'hard':
      // eslint-disable-next-line no-case-declarations
      let sentencesArray = _.shuffle(hard);
      sentencesArray = sentencesArray.slice(0, 150);
      return sentencesArray;
    default:
      return _.shuffle(easy).slice(0, 150);
  }
};
