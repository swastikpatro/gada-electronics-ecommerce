import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'laptop',
    description: '',
  },
  {
    _id: uuid(),
    categoryName: 'tv',
    description: '',
  },
  {
    _id: uuid(),
    categoryName: 'smartwatch',
    description: '',
  },
  {
    _id: uuid(),
    categoryName: 'earphone',
    description: '',
  },
  {
    _id: uuid(),
    categoryName: 'mobile',
    description: '',
  },
];
