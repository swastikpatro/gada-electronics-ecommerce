import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

import Suggestions from './Suggestions';

export const data3 = [
  //dell laptops
  {
    _id: 'dell-1',
    name: 'dell vostro',
    price: 42990,
    originalPrice: 61817,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911615/dell-vostro_svph09.jpg',
    colors: ['#0000ff', '#00ff00', '#000'],
    company: 'dell',
    description:
      'For this model, screen size is 14 inches and hard disk size is 512 GB. CPU Model	Core is Core i3 Family. RAM Memory Installed Size is 8 GB. Operating System is Windows 11 Home. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 46,
    stars: 1.2,
  },
  {
    _id: 'dell-2',
    name: 'dell inspiron',
    price: 58990,
    originalPrice: 80472,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911875/dell-inspiron_jgtkxt.jpg',
    colors: ['#0000ff', '#000'],
    company: 'dell',
    description:
      'For this model, screen size is 15.6 inches and hard disk size is 1 TB. CPU Model	Core is Core i5. RAM Memory Installed Size is 8 GB. Operating System is Windows 11 Home. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: false,
    inStock: false,
    reviewCount: 400,
    stars: 4.7,
  },
  {
    _id: 'dell-3',
    name: 'dell latitude',
    price: 33990,
    originalPrice: 48444,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911975/dell-latitude_kn6awk.jpg',
    colors: ['#0000ff', '#00ff00', '#000'],
    company: 'dell',
    description:
      'For this model, screen size is 14 inches. CPU Model Core is Core i3 Family. RAM Memory Installed Size is 8 GB. Operating System is Windows 11 Home. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 46,
    stars: 1.2,
  },
  // oneplus tv
  {
    _id: 'oneplus-1',
    name: 'oneplus 50Y1S pro',
    price: 32999,
    originalPrice: 45999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683912824/oneplus-50Y1S-pro_s495sd.jpg',
    colors: ['#0000ff', '#000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 50 Inches. Product Dimensions	is (24.6D x 110W x 70.2H) cm. Operating System is Android 10. Mounting Hardware includes 1 LED TV, 2 Table Stand Base, 1 User Manual, 1 Remote Control,1 AV IN Adapter, 1AC Cord, 2 AAA Battery. Resolution is 4K with the refresh rate is 60Hz. Sodhi streams IPL using this device 🧡',
    category: 'tv',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 9339,
    stars: 4.2,
  },
  {
    _id: 'oneplus-2',
    name: 'oneplus 40Y1S',
    price: 21999,
    originalPrice: 29999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683908781/mi-5a_spazxt.jpg',
    colors: ['#0000ff', '#00ff00', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 40 Inches. Product Dimensions	is (0.09D x 8.92W x 0.51H) m. Operating System is Android TV 11. Mounting Hardware includes	1 LED TV, 2 Table Stand Base, 1 Wall Mount, 1 User Manual, 1 Remote Control,1 AV IN Adapter. Resolution is 1080p with the refresh rate is 60Hz.',
    category: 'tv',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 150,
    stars: 3.8,
  },
  {
    _id: 'oneplus-3',
    name: 'oneplus 55U1S',
    price: 42999,
    originalPrice: 59999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683918874/oneplus-55U1S_pl3nko.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 55 Inches. Product Dimensions	is (19D x 76.7W x 122.7H) cm. Operating System is Android TV. Mounting Hardware includes	1 TV unit, 1 Remot, 1 AC Power Cord, 1AV In Adaptor, 1 Set Stand, 1 Wall Mount, 1 User manual. Resolution is 4K with the refresh rate is 60Hz.',
    category: 'tv',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 501,
    stars: 3.5,
  },
  {
    _id: 'oneplus-4',
    name: 'oneplus 55Q1IN-1',
    price: 49990,
    originalPrice: 69900,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683919255/oneplus-55Q1IN-1_di10wk.jpg',
    colors: ['#00ff00', '#ff0000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 55 Inches. Product Dimensions	is (5.1D x 122.4W x 70.6H) cm. Operating System is Android TV. Mounting Hardware includes	1 QLED TV, 1 Wall-mounting Bracket, 1 User Manual, 1 Warranty Card, 1 Remote Control,1 AV IN Adaptor, 1AC Cord, 1 USB Type-C cable. Resolution is 4K with the refresh rate is 480 SMR.',
    category: 'tv',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 11023,
    stars: 4.1,
  },
  // oneplus earphone
  // start
  {
    _id: 'oneplus-5',
    name: 'oneplus buds z2',
    price: 4999,
    originalPrice: 5999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683955385/oneplus-buds-z2_duru75.jpg',
    colors: ['#00ff00', '#ff0000', '#000', '#ffb900'],
    company: 'oneplus',
    description:
      'This is a "In Ear" product and wireless. Features include Dual-Mic Noise Cancellation, High Quality Sound and Worry-free Battery Life.',
    category: 'earphone',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 823,
    stars: 3.6,
  },
  {
    _id: 'oneplus-6',
    name: 'oneplus nord buds',
    price: 2299,
    originalPrice: 2699,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683955385/oneplus-nord-buds_b9yphw.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000'],
    company: 'oneplus',
    description:
      'This is a "In Ear" product and wireless. Get Up to 80 minutes of battery with fast charging in 10 minutes.',
    category: 'earphone',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 738,
    stars: 2.1,
  },
  {
    _id: 'oneplus-7',
    name: 'oneplus buds pro',
    price: 11999,
    originalPrice: 13999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683955385/oneplus-buds-pro_kzr05d.jpg',
    colors: ['#00ff00', '#ff0000', '#000'],
    company: 'oneplus',
    description:
      'This is a "In Ear" product and wireless. Get Up to 80 minutes of battery with fast charging in 10 minutes. Features include Dual-Mic Noise Cancellation, High Quality Sound and Worry-free Battery Life. This is Iyer\'s favorite earbuds 🧡',
    category: 'earphone',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 121,
    stars: 0.9,
  },
  {
    _id: 'oneplus-8',
    name: 'oneplus bullets z2',
    price: 1999,
    originalPrice: 2299,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683955385/oneplus-bullets-z2_ml2z8c.jpg',
    colors: ['#ff0000', '#ffb900'],
    company: 'oneplus',
    description:
      'This is a "In Ear" product and wireless. Get Up to 80 minutes of battery with fast charging in 10 minutes. Features include Water and sweat-resistant, Worry-free Battery Life. This is Sonu\'s favorite earbuds 🧡',
    category: 'earphone',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 9671,
    stars: 3.4,
  },
  // oneplus smartbands(2)
  {
    _id: 'oneplus-9',
    name: 'oneplus smart band',
    price: 4280,
    originalPrice: 8999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683956823/oneplus-smart-band_bboy1s.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 1.1 Inches and rectangular in shape. Special Feature includes Multiple Exercise Mode, SpO2 Monitor, Heart Rate Monitor, Sleep Tracker, Water Resistant,Dust Resistant, Music, Camera Shutter Controls, Phone Call, Message Notifications.',
    category: 'smartwatch',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 5981,
    stars: 4.8,
  },
  {
    _id: 'oneplus-10',
    name: 'oneplus nord watch',
    price: 4999,
    originalPrice: 6999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683956823/oneplus-nord-watch_f9u2hr.jpg',
    colors: ['#0000ff', '#ff0000', '#000'],
    company: 'oneplus',
    description:
      'For this model, screen size is 1.78 Inches and rectangular in shape.  Special Feature includes Rate Monitor, Oxymeter (SpO2), Music Player, Camera.',
    category: 'smartwatch',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 421,
    stars: 2.7,
  },
  // oneplus mobiles (5)
  {
    _id: 'oneplus-11',
    name: 'oneplus nord CE 3 lite',
    price: 21999,
    originalPrice: 21999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683957585/oneplus-nord-CE-3-lite_weksou.jpg',
    colors: ['#00ff00', '#ff0000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 6.72 inches and RAM Memory is 8 GB. Operating System is OxygenOS. Special Feature is Cinematic mode in 4K Dolby Vision up to 30 fps. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 794,
    stars: 3.2,
  },
  {
    _id: 'oneplus-12',
    name: 'oneplus 11R',
    price: 44999,
    originalPrice: 44999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683957584/oneplus-11R_ojekns.jpg',
    colors: ['#0000ff', '#ff0000', '#000'],
    company: 'oneplus',
    description:
      'For this model, screen size is 6.7 inches and RAM Memory is 16 GB. Operating System is OxygenOS. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 3031,
    stars: 2.7,
  },
  {
    _id: 'oneplus-13',
    name: 'oneplus nord 2T',
    price: 28999,
    originalPrice: 28999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683957584/oneplus-nord-2T_vrpgbq.jpg',
    colors: ['#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 6.43 inches and RAM Memory is 8 GB. Operating System is OxygenOS. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 4039,
    stars: 1.7,
  },
  {
    _id: 'oneplus-14',
    name: 'oneplus 10R',
    price: 34999,
    originalPrice: 38999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683957584/oneplus-10R_kcpvcm.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#000', '#ffb900'],
    company: 'oneplus',
    description:
      'For this model, screen size is 6.7 Inches and RAM Memory is 8 GB. Operating System is OxygenOS. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 9999,
    stars: 0.7,
  },
  {
    _id: 'oneplus-15',
    name: 'oneplus 11',
    price: 61999,
    originalPrice: 61999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683957584/oneplus-11_jzzby3.jpg',
    colors: ['#0000ff', '#00ff00', '#000'],
    company: 'oneplus',
    description:
      "For this model, screen size is 6.7 inches and RAM Memory is 16 GB. Operating System is OxygenOS. This is a 5G device. This is Jethalal's favorite 🧡",
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 22031,
    stars: 5,
  },
];

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  // instead of allData, get from product context
  const allData = data3;
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const trimmedSearch = searchText.trim();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredList(
        allData.filter(({ name }) =>
          name.toLowerCase().includes(trimmedSearch.toLowerCase())
        )
      );
      setisLoading(false);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [trimmedSearch]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setisLoading(true);
  };

  const updateTextToEmpty = () => {
    setSearchText('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        className='search'
        type='search'
        placeholder='Search...'
        onChange={handleSearchChange}
        value={searchText}
        autoComplete='off'
      />
      {trimmedSearch && (
        <Suggestions
          filteredList={filteredList}
          isLoading={isLoading}
          updateTextToEmpty={updateTextToEmpty}
        />
      )}
    </div>
  );
};

export default SearchBar;
