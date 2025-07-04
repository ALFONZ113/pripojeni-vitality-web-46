
import { BlogPost } from '../types';
import { podaInternetGuide } from './poda-internet-guide';
import { podaTvGuide } from './poda-tv-guide';

export const sluzbyPosts: BlogPost[] = [
  podaInternetGuide,
  podaTvGuide
];

export { podaInternetGuide, podaTvGuide };
