import React, { useState } from 'react';
import './WomenMenuPage.css'; 
import Footer from '../Footer';

const sampleItems = [
  { id: 21, name: "ODIBEZA", price: 20000, description: "Beaded Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422510/6_clkms1.jpg' },
  { id: 22, name: "AKWA NWA", price: 10000, description: "Suede open toe Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422509/11_d57r2y.jpg' },
  { id: 23, name: "ASAMMA", price: 15000, description: "Denim X-Strap", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422509/12_rumqfa.jpg' },
  { id: 24, name: "EGO OYIBO", price: 25000, description: "Open toe Birken Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422505/13_rszfsi.jpg' },
  { id: 25, name: "MKPULU MMA", price: 10000, description: "leopard print Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422504/14_dpbwas.jpg' },
  { id: 26, name: "MANARIA", price: 10000, description: "Bow strap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422504/16_lghay0.jpg' },
  { id: 27, name: "MKPULU MMA 2.0", price: 10000, description: "Croc skin Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422500/17_klhj4a.jpg' },
  { id: 28, name: "UGEGBE", price: 10000, description: "Shiny Croc print Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422499/18_d1zjta.jpg' },
  { id: 29, name: "MMIRIDOROEDO", price: 10000, description: " Embelished Open toe Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422499/10_fiwnlx.jpg' },
  { id: 30, name: "IJEAWELE", price: 12000, description: "Double X-Strap Sandals", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422495/9_m6dqq3.jpg' },
  { id: 31, name: "UGO OMA", price: 10000, description: "Inverted C curve Slides", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422494/2_w5itpv.jpg' },
  { id: 32, name: "AKUABATA", price: 10000, description: "Double buckle strap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422493/8_aj65lp.jpg' },
  { id: 33, name: "EGODI", price: 15000, description: "Scissors cut Platform", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/15_u6c27r.jpg' },
  { id: 34, name: "URUNDU", price: 10000, description: "Plain & Pattern Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/19_ut9rue.jpg' },
  { id: 35, name: "AKWA UGO", price: 12000, description: "T-Strap Sandals", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/7_dwunz8.jpg' },
  { id: 36, name: "ONODU UGO", price: 10000, description: "Inverted rope Slides", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/3_zakxvc.jpg' },
  { id: 37, name: "OPURUICHE", price: 15000, description: "Bow Platform Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/1_qkcwxe.jpg' },
  { id: 38, name: "IFEDIMMA", price: 10000, description: "Knotted flap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422485/20_el1cik.jpg' },
  { id: 39, name: "MMIRIMMA", price: 10000, description: "X-Strap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422484/4_hc4xmp.jpg' },
  { id: 40, name: "OCHEZE", price: 10000, description: "Denim open toe Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735422484/5_bg2qsc.jpg' },
];

const WomenMenuPage = ({ cartItems, setCartItems }) => {
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [selectedSizes, setSelectedSizes] = useState({});

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 3000); // Notification lasts for 3 seconds
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: size }));
  };

  const addToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    if (!selectedSize) {
      showNotification('Please select a size before adding to the cart!', 'error'); // Error notification
      return;
    }

    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === selectedSize
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === selectedSize
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, size: selectedSize, quantity: 1 }]);
    }

    showNotification(`${item.name} (Size ${selectedSize}) has been added to your cart!`, 'success'); // Success notification
  };

  return (
    <div>
      {/* Notification */}
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <section className="menu-page">
        <h1 className="header">Women's Footwear</h1>
        <div className="items-grid">
          {sampleItems.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} className="imgds" />
              <h2 className="header2">{item.name}</h2>
              <p>Price: ₦{item.price}</p>
              <p>{item.description}</p>

              {/* Dropdown for sizes */}
              <div className="size">
                <select
                  value={selectedSizes[item.id] || ''}
                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  className="size-dropdown"
                >
                  <option value="" disabled>
                    Size
                  </option>
                  {Array.from({ length: 12 }, (_, i) => 36 + i).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={() => addToCart(item)} className="atc">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WomenMenuPage;
