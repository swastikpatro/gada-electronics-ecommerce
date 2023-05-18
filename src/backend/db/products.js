import { v4 as uuid } from 'uuid';

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    name: 'mi book 15',
    price: 31990,
    originalPrice: 51999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683908106/redmi-book-15_ksizgp.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000'],
    company: 'redmi',
    description:
      'For this model, screen size is 39.62 cm and hard disk size is 256 GB. CPU Model	Core is i3. RAM Memory Installed Size is 8 GB. Operating System is Windows 10 Home. Special Feature includes Anti Glare Screen, Light Weight, Thin. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 418,
    stars: 3.7,
  },
  {
    _id: uuid(),
    name: 'mi notebook pro',
    price: 54499,
    originalPrice: 74999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683908295/mi-notebook-pro_hi4vih.jpg',
    colors: ['#00ff00', '#000'],
    company: 'redmi',
    description:
      'For this model, screen size is 14 Inches and hard disk size is 512 GB. CPU Model Core is i5. RAM Memory Installed Size is 16 GB. Operating System is Windows 11. Special Feature includes Fingerprint Reader, Backlit Keyboard. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 1805,
    stars: 4.3,
  },
  {
    _id: uuid(),
    name: 'mi 5A',
    price: 13499,
    originalPrice: 24999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683908781/mi-5a_spazxt.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#ffb900'],
    company: 'redmi',
    description:
      'For this model, screen size is 32 Inches. Product Dimensions	is (19D x 71.5W x 47H) cm. Operating System is Windows 11. Mounting Hardware includes	1 LED TV, 2 Table Stand Base, 1 User Manual, 1 Remote Control, 4 screws, 2 x AAA Batteries. Resolution is 720p with the refresh rate is 60Hz. Tapu streams NETFLIX using this device 🧡',
    category: 'tv',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 35573,
    stars: 4.2,
  },
  {
    _id: uuid(),
    name: 'mi horizon',
    price: 21399,
    originalPrice: 29999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909215/mi-horizon_n4anpx.jpg',
    colors: ['#000'],
    company: 'redmi',
    description:
      'For this model, screen size is 40 Inches. Product Dimensions	is (8.7D x 89.2W x 55.9H) cm. Operating System is Windows 11. Mounting Hardware includes	1 LED TV, 2 Table Stand Base, 1 User Manual, 1 Remote Control, 4 screws. Resolution is 1080p with the refresh rate is 60Hz.',
    category: 'tv',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 35573,
    stars: 4.1,
  },
  {
    _id: uuid(),
    name: 'mi sonicBass',
    price: 1299,
    originalPrice: 1599,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909289/mi-sonicBass_zgkhiw.jpg',
    colors: ['#0000ff', '#000', '#ffb900'],
    company: 'redmi',
    description:
      'This is a "In Ear" product and wireless and equipped with 9.2 mm dynamic drivers. Features include Dual-Mic Noise Cancellation, Dual Pairing Multi-Point Connection with Flexi Arc and Skin-friendly Design. This product is Atamaram Bhide\'s 🧡 and is in under common man budget.',
    category: 'earphone',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 8238,
    stars: 2.5,
  },
  {
    _id: uuid(),
    name: 'mi buds 3 lite',
    price: 2999,
    originalPrice: 1599,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909559/mi-buds-3-lite_g4ntj3.jpg',
    colors: ['#ff0000', '#ffb900'],
    company: 'redmi',
    description:
      'This is a "In Ear" product and wireless. Features include Lightweight with Lock-in Design, Bluetooth 5.2 and Type-C Compatibility.',
    category: 'earphone',
    isShippingAvailable: false,
    inStock: false,
    reviewCount: 1101,
    stars: 1.5,
  },
  {
    _id: uuid(),
    name: 'mi watch 2 lite',
    price: 2280,
    originalPrice: 7999,
    featured: true,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909641/mi-watch-2-lite_ofbl7m.jpg',
    colors: ['#00ff00', '#000', '#ffb900'],
    company: 'redmi',
    description:
      'For this model, screen size is 3.94 cm and rectangular in shape.  Special Feature includes Rate Monitor, Oxymeter (SpO2), Music Player, Camera. Jethalal uses it to track his heart beat 🧡, when Babita ji comes!',
    category: 'smartwatch',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 508,
    stars: 3.5,
  },
  {
    _id: uuid(),
    name: 'mi smartband pro',
    price: 1999,
    originalPrice: 5999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909682/mi-smartband-pro_bzxg3v.jpg',
    colors: ['#ff0000', '#000'],
    company: 'redmi',
    description:
      'For this model, screen size is 3.73 cm and rectangular in shape.  Special Feature includes Sleep Monitor, Sedentary Reminder, Activity Tracker, Alarm Clock, Calorie Tracker.',
    category: 'smartwatch',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 20,
    stars: 4.5,
  },
  {
    _id: uuid(),
    name: 'mi 12 pro',
    price: 44999,
    originalPrice: 79999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909725/mi-12-pro_mlm5mt.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000'],
    company: 'redmi',
    description:
      'For this model, screen size is 6.73 inches and RAM Memory is 8 GB. Operating System is Android 12. Special Feature includes 10bit 2K+ Curved AMOLED Display, 50+50+50MP Flagship Cameras (OIS). This is a 5G device.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 3294,
    stars: 4.0,
  },
  {
    _id: uuid(),
    name: 'mi go phone',
    price: 5399,
    originalPrice: 6499,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909795/mi-go-phone_obpz7q.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#000'],
    company: 'redmi',
    description:
      'For this model, screen size is 5 inches and RAM Memory is 1 GB. Operating System is Android 7.1. This is a 4G device',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 70,
    stars: 2.9,
  },
  {
    _id: uuid(),
    name: 'mi 10 prime',
    price: 14999,
    originalPrice: 16999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909893/mi-10-prime_sspsnb.jpg',
    colors: ['#ff0000', '#000', '#ffb900'],
    company: 'redmi',
    description:
      'For this model, screen size is 6.5 inches and RAM Memory is 6 GB. Cellular technology is LTE.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 607,
    stars: 4.9,
  },
  {
    _id: uuid(),
    name: 'mi note 12',
    price: 17999,
    originalPrice: 19999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910028/mi-note-12_w0gqbt.jpg',
    colors: ['#0000ff', '#00ff00'],
    company: 'redmi',
    description:
      'For this model, screen size is 6.67 inches and RAM Memory is 128 GB. Operating Sysytem is MIUI 13. Cellular technology is 5G.',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 3851,
    stars: 2.9,
  },
  {
    _id: uuid(),
    name: 'mi 9 activ',
    price: 9499,
    originalPrice: 10999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910103/mi-9-activ_kklapc.jpg',
    colors: ['#00ff00', '#000'],
    company: 'redmi',
    description:
      'For this model, screen size is 6.53 inches and RAM Memory is 4 GB. Operating System is MIUI 20. Cellular technology is LTE.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 70,
    stars: 1.3,
  },
  {
    _id: uuid(),
    name: 'apple air 2020',
    price: 82900,
    originalPrice: 99900,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910169/apple-air-2020_kacdj5.jpg',
    colors: ['#00ff00', '#ffb900'],
    company: 'apple',
    description:
      'For this model, screen size is 13 inches and hard disk size is 256 GB. CPU Model	Core is Core M Family. RAM Memory Installed Size is 8 GB. Operating System is MacOS 10.14 Mojave. Special Feature is Backlit Keyboard. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 456,
    stars: 4.6,
  },
  {
    _id: uuid(),
    name: 'apple air 2022',
    price: 106999,
    originalPrice: 119999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910465/apple-air-2022_ijki4z.jpg',
    colors: ['#0000ff', '#ff0000', '#000', '#ffb900'],
    company: 'apple',
    description:
      'For this model, screen size is 13.6 inches and hard disk size is 256 GB. RAM Memory Installed Size is 8 GB. Operating System is MacOS. Special Feature is Portable, Backlit Keyboard, Thin. Graphics Card is Integrated. This is the laptop Iyer bought after coffee got spilt on the previous laptop.',
    category: 'laptop',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 7890,
    stars: 3.3,
  },
  {
    _id: uuid(),
    name: 'apple air 2023',
    price: 110899,
    originalPrice: 120999,
    featured: true,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910482/apple-air-2023_b59fdw.jpg',
    colors: ['#00ff00'],
    company: 'apple',
    description:
      'For this model, screen size is 14 inches and hard disk size is 1000 GB. CPU Model	Core is Core M Family. RAM Memory Installed Size is 16 GB. Operating System is MacOS. Special Feature is Backlit Keyboard. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 31110,
    stars: 4.5,
  },
  {
    _id: uuid(),
    name: 'apple prod display xdr',
    price: 59899,
    originalPrice: 89999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910548/apple-pro-display-xdr_gvs2i9.jpg',
    colors: ['#00ff00', '#ff0000'],
    company: 'apple',
    description:
      'For this model, screen size is 32 Inches. Extreme Dynamic Range (XDR)',
    category: 'tv',
    isShippingAvailable: false,
    inStock: false,
    reviewCount: 9,
    stars: 2.6,
  },
  {
    _id: uuid(),
    name: 'apple airPods pro',
    price: 23625,
    originalPrice: 24900,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910675/apple-airPods-pro_bmdiyx.jpg',
    colors: ['#000'],
    company: 'apple',
    description:
      'This is a "In Ear" product and wireless. Features include Active Noise Cancellation, Spatial audio with dynamic head tracking and Adaptive EQ.',
    category: 'earphone',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 16711,
    stars: 4.5,
  },
  {
    _id: uuid(),
    name: 'apple airPods max',
    price: 25999,
    originalPrice: 29999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683910968/apple-airPods-max_pbb9it.jpg',
    colors: ['#ff0000', '#000'],
    company: 'apple',
    description:
      'This is a "On Ear" product. Features include Active Noise Cancellation, Spatial audio with dynamic head tracking and Adaptive EQ. Material	used is Memory Foam',
    category: 'earphone',
    isShippingAvailable: false,
    inStock: false,
    reviewCount: 420,
    stars: 3.8,
  },
  {
    _id: uuid(),
    name: 'apple watch ultra',
    price: 56304,
    originalPrice: 59900,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911006/apple-watch-ultra_ony1kc.jpg',
    colors: ['#00ff00', '#000', '#ffb900'],
    company: 'apple',
    description:
      'For this model, screen size is 40 mm and rectangular in shape.  Special Feature includes Retina Display, Heart Rate Notifications, Calls, Fall detection, etc. Babita Ji loves quality, so she loves Apple watch Ultra 🧡',
    category: 'smartwatch',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 5454,
    stars: 4.4,
  },
  {
    _id: uuid(),
    name: 'apple watch SE',
    price: 42999,
    originalPrice: 45999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911156/apple-watch-SE_uf7kjm.jpg',
    colors: ['#ff0000', '#000', '#ffb900'],
    company: 'apple',
    description:
      'For this model, screen size is 44 mm and rectangular in shape.  Special Feature includes EASILY CUSTOMISABLE, HEALTH AND SAFETY FEATURES, SIMPLY COMPATIBLE,and SWIMPROOF AND STYLISH.',
    category: 'smartwatch',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 420,
    stars: 3.8,
  },
  {
    _id: uuid(),
    name: 'iPhone 12',
    price: 69000,
    originalPrice: 74000,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911348/iPhone-12_agdvwp.jpg',
    colors: ['#0000ff', '#ff0000', '#000'],
    company: 'apple',
    description:
      'For this model, screen size is 6.1 inches and RAM Memory is 64 GB. Operating System is IOS 14. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 5002,
    stars: 3.2,
  },
  {
    _id: uuid(),
    name: 'iPhone 14 plus',
    price: 57999,
    originalPrice: 58999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683911421/iPhone-14-plus_d4nmst.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000', '#000', '#ffb900'],
    company: 'apple',
    description:
      'For this model, screen size is 16.95cm and RAM Memory is 128 GB. Operating System is IOS. Special Feature is Cinematic mode in 4K Dolby Vision up to 30 fps. This is a 5G device',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 22031,
    stars: 4.7,
  },
  // companies - mi, apple, dell(laptops),
  // laptops from dell
  //dell laptops
  {
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
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
    _id: uuid(),
    name: 'oneplus 11',
    price: 61999,
    originalPrice: 61999,
    featured: true,
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
  // 9 products
  // vivo laptop
  {
    _id: uuid(),
    name: 'vivoBook 16X',
    price: 54333,
    originalPrice: 74990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683964247/vivoBook-16X_zuibqo.jpg',
    colors: ['#ff0000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 40.64 cm and hard disk size is 512 GB. CPU Model Core is Ryzen 5. RAM Memory Installed Size is 16 GB. Operating System is Windows 11 Home. Special Feature includes FingerPrint, Backlit Keyboard, With Alexa voice-recognition support, FHD+ (1920 x 1200, WUXGA) 16:10 aspect ratio, Anti Glare Coating. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 31,
    stars: 1.9,
  },
  {
    _id: uuid(),
    name: 'vivoBook ultra k14',
    price: 40990,
    originalPrice: 58990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683964247/vivo-ultra-k14_mcxwct.jpg',
    colors: ['#00ff00', '#ff0000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 35.56 cm and hard disk size is 512 GB. CPU Model Core is i3. RAM Memory Installed Size is 8 GB. Operating System is Windows 11 Home. Special Feature includes Fingerprint Reader, Lightweight, Anti Glare Coating. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 48,
    stars: 2.2,
  },
  {
    _id: uuid(),
    name: 'vivoBook 14',
    price: 69990,
    originalPrice: 85990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683964247/vivoBook-14_cssao3.jpg',
    colors: ['#0000ff', '#000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 35.56 cm and hard disk size is 512 GB. CPU Model Core is Core i5. RAM Memory Installed Size is 16 GB. Operating System is Windows 11 Home. Special Feature includes Backlit Keyboard, Fingerprint Reader, Light Weight. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 12,
    stars: 4.3,
  },
  {
    _id: uuid(),
    name: 'vivoBook 15',
    price: 42990,
    originalPrice: 60990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683964247/vivoBook-15_anrbws.jpg',
    colors: ['#00ff00', '#ff0000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 39.62 cm and hard disk size is 512 GB. CPU Model Core is Core i3. RAM Memory Installed Size is 8 GB. Operating System is Windows 11 Home. Special Feature includes 60Hz Refresh Rate, FingerPrint, FHD (1920 x 1080), Chiclet Keyboard. Graphics Card is Integrated',
    category: 'laptop',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 35,
    stars: 3.4,
  },
  // vivo mobile
  {
    _id: uuid(),
    name: 'vivo V23',
    price: 27524,
    originalPrice: 37990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683966913/vivo-v23_lio4dm.jpg',
    colors: ['#000'],
    company: 'vivo',
    description:
      'For this model, screen size is 6.44 inches and RAM Memory is 12 GB. Operating System is Android 12.0. Cellular technology is 5G.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 551,
    stars: 4.3,
  },
  {
    _id: uuid(),
    name: 'vivo Y15C',
    price: 9499,
    originalPrice: 14590,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683966913/vivo-y15c_f9p4s7.jpg',
    colors: ['#0000ff', '#00ff00', '#ff0000'],
    company: 'vivo',
    description:
      'For this model, screen size is 6.51 inches and RAM Memory is 3 GB. Operating System is Android 12. Cellular technology is 4G.',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 420,
    stars: 3.6,
  },
  {
    _id: uuid(),
    name: 'vivo t1x',
    price: 11999,
    originalPrice: 16990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683966913/vivo-t1x_xiwl5f.jpg',
    colors: ['#ff0000', '#000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 6.53 inches and RAM Memory is 4 GB. Operating System is Android 12.0. Special features includes Front Camera, Camera. Cellular technology is 4G.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 70,
    stars: 2.9,
  },
  {
    _id: uuid(),
    name: 'vivo Y22',
    price: 16499,
    originalPrice: 19990,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683966913/vivo-y22_z188nd.jpg',
    colors: ['#0000ff', '#ff0000', '#000'],
    company: 'vivo',
    description:
      'For this model, screen size is 6.55 inches and RAM Memory is 6 GB. Operating System is FunTouch OS 12. Cellular technology is 4G.',
    category: 'mobile',
    isShippingAvailable: false,
    inStock: true,
    reviewCount: 411,
    stars: 4.1,
  },
  {
    _id: uuid(),
    name: 'vivo Y16',
    price: 10499,
    originalPrice: 14999,
    // img to add
    image:
      'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683966913/vivo-y16_rej6lc.jpg',
    colors: ['#00ff00', '#ff0000', '#ffb900'],
    company: 'vivo',
    description:
      'For this model, screen size is 6.51 inches and RAM Memory is 3 GB. Operating System is FunTouch OS 12. Cellular technology is LTE.',
    category: 'mobile',
    isShippingAvailable: true,
    inStock: true,
    reviewCount: 196,
    stars: 2.8,
  },
];
