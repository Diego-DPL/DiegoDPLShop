import djImg from '../assets/images/DiegoDPL_DJ_Pinchando.png';
import discoImg from '../assets/images/Disco_platino_historia.webp';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  image?: string;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: 'bundle-808-vibes',
    name: '808 Vibes - Sample Pack',
    description: '808s potentes, kicks, snares y loops listos para club. 150+ samples.',
    price: 1900,
  image: djImg,
    tags: ['bundle', 'trap', '808'],
  },
  {
    id: 'remix-exclusive-lorena',
    name: 'Remix Exclusivo - Lorena',
    description: 'Remix exclusivo de “La historia de Lorena Santos”. Solo disponible aquí.',
    price: 900,
  image: discoImg,
    tags: ['remix', 'exclusive'],
  },
  {
    id: 'mashup-fiesta',
    name: 'Mashup Fiesta - Club Tool',
    description: 'Un mashup probado en pista para levantar cualquier set.',
    price: 700,
  image: djImg,
    tags: ['mashup', 'club'],
  },
];

export function getProduct(id: string) {
  return products.find(p => p.id === id);
}
