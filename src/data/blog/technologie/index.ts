
import { BlogPost } from '../types';
import { gponTechnology } from './gpon-technology';
import { wifiComparison } from './wifi-comparison';
import { fiveGVsOptical } from './5g-vs-optical';

export const technologiePosts: BlogPost[] = [
  gponTechnology,
  wifiComparison,
  fiveGVsOptical
];

export { gponTechnology, wifiComparison, fiveGVsOptical };
