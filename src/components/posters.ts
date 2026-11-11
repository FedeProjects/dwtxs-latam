import { getImage } from 'astro:assets';
import bandSource from '../assets/images/general/band-poster.jpg';
import heroSource from '../assets/images/general/hero-poster.jpg';

// Video posters optimized at build (WebP). The hero poster is the Home LCP, so the Home pages
// also preload it.
export const heroPoster = () =>
  getImage({ src: heroSource, width: 1280, format: 'webp', quality: 60 });
export const bandPoster = () => getImage({ src: bandSource, width: 960, format: 'webp' });
