
import { BlogPost } from '../types';
import { tvPackagesGuide } from './tv-packages-guide';
import { sportStreamingGuide } from './sport-streaming-guide';
import { speedTestGuide } from './speed-test-guide';

export const tipyPosts: BlogPost[] = [
  tvPackagesGuide,
  sportStreamingGuide,
  speedTestGuide
];

export { tvPackagesGuide, sportStreamingGuide, speedTestGuide };
