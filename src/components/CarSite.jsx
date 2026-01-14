import React, { useState } from 'react';
import { ShoppingCart, Search, Heart, ChevronDown, Filter, X } from 'lucide-react';

const styles = `/* put your full CSS here, including mini-cart classes */`;

const CarSite = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    year: 'all',
  });

  const cars = [ {
      id: 1,
      name: 'Tesla Model S',
      type: 'Electric',
      price: 89990,
      year: 2024,
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=500&fit=crop',
      specs: { power: '670 hp', range: '405 mi', acceleration: '3.1s 0-60' }
    },
    {
      id: 2,
      name: 'Porsche 911 Turbo',
      type: 'Sports',
      price: 174300,
      year: 2024,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
      specs: { power: '640 hp', topSpeed: '205 mph', acceleration: '2.6s 0-60' }
    },
    {
      id: 3,
      name: 'Range Rover Sport',
      type: 'SUV',
      price: 83000,
      year: 2024,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop',
      specs: { power: '395 hp', seats: '7', drivetrain: 'AWD' }
    },
    {
      id: 4,
      name: 'BMW M3',
      type: 'Sports',
      price: 72800,
      year: 2024,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop',
      specs: { power: '503 hp', topSpeed: '180 mph', acceleration: '3.4s 0-60' }
    },
    {
      id: 5,
      name: 'Mercedes-Benz EQS',
      type: 'Electric',
      price: 104400,
      year: 2024,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop',
      specs: { power: '516 hp', range: '350 mi', acceleration: '4.1s 0-60' }
    },
    {
      id: 6,
      name: 'Audi Q7',
      type: 'SUV',
      price: 58000,
      year: 2023,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
      specs: { power: '335 hp', seats: '7', drivetrain: 'AWD' }
    }
  ];


  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || car.type === filters.type;
    const matchesPrice =
      filters.priceRange === 'all' ||
      (filters.priceRange === 'under75k' && car.price < 75000) ||
      (filters.priceRange === '75k-100k' && car.price >= 75000 && car.price < 100000) ||
      (filters.priceRange === 'over100k' && car.price >= 100000);
    const matchesYear = filters.year === 'all' || car.year.toString() === filters.year;
    return matchesSearch && matchesType && matchesPrice && matchesYear;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addToCart = (car) => {
    setCart((prev) => [...prev, car]);
    setMessage(`${car.name} has been added to your cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const removeFromCart = (indexToRemove) => {
  setCart((current) => current.filter((_, index) => index !== indexToRemove));
};


  const cartItemCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <header className="header">
          <div className="header-container">
            <div className="header-content">
              <div className="logo-container">
                <div className="logo-icon">
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>PA</span>
                </div>
                <h1 className="logo-text">Premium Auto</h1>
              </div>
              <div className="header-actions">
                <button className="icon-button" title="Favorites">
                  <Heart className="w-6 h-6" />
                  {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
                </button>
                <button
                  className="icon-button"
                  title="Cart"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="badge badge-blue">{cartItemCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
            {message && (
                 <div className="toast-message">
                   {message}
                 </div>
               )}
 
        </header>

        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h2 className="hero-title">Find Your Dream Car</h2>
            <p className="hero-subtitle">Premium vehicles. Exceptional service. Unbeatable prices.</p>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for your perfect car..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h3 className="content-title">Available Vehicles ({filteredCars.length})</h3>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="filter-button"
            >
              <Filter style={{ width: '20px', height: '20px' }} />
              <span>Filters</span>
              <ChevronDown
                className={`chevron ${filterOpen ? 'open' : ''}`}
                style={{ width: '16px', height: '16px' }}
              />
            </button>
          </div>

           {filterOpen && (
            <div className="filter-panel">
              <div className="filter-grid">
                <div>
                  <label className="filter-label">Type</label>
                  <select 
                    value={filters.type} 
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                     className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="Electric">Electric</option>
                    <option value="Sports">Sports</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div>
                  <label className="filter-label">Price Range</label>
                  <select 
                    value={filters.priceRange} 
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="filter-select"
                  >
                    <option value="all">All Prices</option>
                    <option value="under75k">Under $75,000</option>
                    <option value="75k-100k">$75,000 - $100,000</option>
                    <option value="over100k">Over $100,000</option>
                  </select>
                </div>
                <div>
                  <label className="filter-label">Year</label>
                  <select 
                    value={filters.year} 
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                    className="filter-select"
                  >
                    <option value="all">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="car-grid">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image-container">
                  <img src={car.image} alt={car.name} className="car-image" />
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className="favorite-button"
                  >
                 {/*Heart button*/}         
                    <Heart
                      className={`heart-icon ${
                        favorites.includes(car.id) ? 'favorited' : ''
                      }`}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </button>
                  <div className="car-type-badge">{car.type}</div>
                </div>

                <div className="car-details">
                  <h3 className="car-name">{car.name}</h3>
                  <p className="car-year">{car.year} Model</p>
                  <div className="car-specs">
                    {Object.entries(car.specs).map(([key, value]) => (
                      <p key={key} className="car-spec-line">
                        <span className="car-spec-label">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                  <div className="car-footer">
                    <span className="car-price">${car.price.toLocaleString()}</span>
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="view-details-button"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {selectedCar && (
          <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-image-container">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="modal-image"
                />
                <button
                  onClick={() => setSelectedCar(null)}
                  className="modal-close-button"
                >
                  <X style={{ width: '24px', height: '24px', color: 'white' }} />
                </button>
              </div>
              <div className="modal-body">
                <h2 className="modal-title">{selectedCar.name}</h2>
                <p className="modal-subtitle">
                  {selectedCar.year} {selectedCar.type}
                </p>
                <div className="modal-specs-grid">
                  {Object.entries(selectedCar.specs).map(([key, value]) => (
                    <div key={key} className="modal-spec-card">
                      <p className="modal-spec-label">{key}</p>
                      <p className="modal-spec-value">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <span className="modal-price">
                    ${selectedCar.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(selectedCar)}
                    className="add-to-cart-button"
                  >
                    <ShoppingCart style={{ width: '20px', height: '20px' }} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCartOpen && (
          <div className="mini-cart-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="mini-cart" onClick={(e) => e.stopPropagation()}>
              <div className="mini-cart-header">
                <span className="mini-cart-title">Your Cart</span>
                <button
                  className="mini-cart-close"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X style={{ width: 20, height: 20 }} />
                </button>
              </div>

              <div className="mini-cart-items">
                {cart.length === 0 && <p>No items in cart.</p>}
                {cart.map((item, index) => (
                  <div key={index} className="mini-cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="mini-cart-item-info">
                      <p className="mini-cart-item-name">{item.name}</p>
                      <p className="mini-cart-item-price">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                        {/* remove button */}
                    <button
                      className="mini-cart-remove"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mini-cart-footer">
                <div className="mini-cart-summary">
                  <span>Items</span>
                  <span>{cartItemCount}</span>
                </div>
                <div className="mini-cart-summary">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <button className="mini-cart-checkout">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarSite;
