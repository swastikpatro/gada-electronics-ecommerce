import ProductCard from '../ProductCard/ProductCard';
import Title from '../Title/Title';
import styles from './FeaturedProducts.module.css';

const list = [
  {
    _id: 'redmi-7',
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
    _id: 'apple-3',
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
    inStock: false,
    reviewCount: 31110,
    stars: 4.5,
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

const FeaturedProducts = () => {
  return (
    <section className='section'>
      <Title>Featured Products</Title>
      <div className={`container ${styles.featuredCenter}`}>
        {list.map((singleProduct) => (
          <ProductCard key={singleProduct._id} product={singleProduct} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
