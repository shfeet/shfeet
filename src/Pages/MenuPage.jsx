import React, { useState } from 'react';
import './MenuPage.css'; 
import Footer from '../Footer';

const sampleItems = [
  { id: 1, name: "EZEBUDE", price: 40000, description: "Oxford with Sass", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1732801132/BeauToday_Chunky_Brogue_Shoes_for_Men_fkp79y.jpg' },
  { id: 2, name: "IJELE", price: 40000, description: "Loafers with Fringes", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415400/14_jyf4vd.jpg' },
  { id: 3, name: "DAKWASIENYI", price: 40000, description: "Basket print Brogues", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415400/13_hlaugz.jpg' },
  { id: 4, name: "AKURIENNE", price: 25000, description: "Double strap Birkenstock", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415410/5_wwodcj.jpg' },
  { id: 5, name: "OGBUEFI", price: 30000, description: "D-ring Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415406/10_nrat3e.jpg' },
  { id: 6, name: "OCHIAGHA", price: 30000, description: "High sole Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415407/9_bdtilp.jpg' },
  { id: 7, name: "ODOGWU", price: 30000, description: "Suede Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415407/8_draprp.jpg' },
  { id: 8, name: "AKUNATU", price: 18000, description: "Scissors cut Thong Slide ", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415410/7_mg3pns.jpg' },
  { id: 9, name: "OJEMBA", price: 18000, description: "Basket print X-Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415406/2_zazp1t.jpg' },
  { id: 10, name: "IKENGA", price: 25000, description: "Birkenstock with Velcro", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415406/3_fxiqom.jpg' },
  { id: 11, name: "CHINYELUGO", price: 25000, description: "Double strap Slide ", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415404/1_jjomu6.jpg' },
  { id: 12, name: "DIKE", price: 18000, description: "Big toe Buckle Strap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415401/6_wiwopn.jpg' },
  { id: 13, name: "EBUBEAGU", price: 30000, description: "X-Strap Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415401/11_enau0u.jpg' },
  { id: 14, name: "ICHAKA IKE", price: 30000, description: "X-Strap Halfshoe", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415401/12_odugfl.jpg' },
  { id: 15, name: "AKAGIAKU", price: 18000, description: "T-H Strap Slide", image: 'https://res.cloudinary.com/daxeovezx/image/upload/v1735415402/4_xtpqqp.jpg' },
];

const MenuPage = ({ cartItems, setCartItems }) => {
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [selectedSizes, setSelectedSizes] = useState({});

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000); // Hide the notification after 3 seconds
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: size }));
  };

  const addToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    if (!selectedSize) {
      showNotification(`Please select a size for ${item.name}`, 'error');
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

    showNotification(`${item.name} (Size ${selectedSize}) has been added to your cart!`, 'success');
  };

  return (
    <div>
      {/* Notification */}
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <section className="menu-pages">
        <h1 className="header">Men's Footwear</h1>
        <div className="items-grid">
          {sampleItems.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} className="imgs" />
              <h2 className="header2">{item.name}</h2>
              <p>Price: ₦{item.price}</p>
              <p>{item.description}</p>

              {/* Dropdown for sizes */}
              <div className='size'>
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
              </select></div>

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

export default MenuPage;
