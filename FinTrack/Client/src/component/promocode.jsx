import axios from "axios";
import React, { useEffect, useState } from "react";
import img12 from "../assets/- --.jpeg";
import img10 from "../assets/12 V Mercedes-Benz S63 Licensed Kids Ride On Car, Black.jpeg";
import img11 from "../assets/13 Warm High-Protein Breakfasts You Can Make Ahead of Time.jpeg";
import img1 from "../assets/A blog about food and how to blog about food_.jfif";
import img2 from "../assets/Cheeseburger With Crispy Onion Rings.jfif";
import img13 from "../assets/Cheesy Breakfast Quesadillas - Alyona’s Cooking.jpeg";
import img3 from "../assets/download.jfif";
import img4 from "../assets/Elegance✨️.jfif";
import img14 from "../assets/Experience Luxury Comfort_ BMW-Inspired Loungers for Your Relaxation - LuxArts.jpeg";
import img15 from "../assets/Freekeh with Spring Peas and Mint.jpeg";
import img5 from "../assets/Herrenmode Buchstabe Flicken Dekor Band Mesh Casual Front Klobig Sneakers.jfif";
import img6 from "../assets/How To Get The Most Organized Kitchen Ever.jfif";
import img16 from "../assets/Huina 1577 Alloy Simulation Forklift Truck Crane 2_4GHz 8CH RC Car Toy - Huina 1577 _ 1 Battery.jpeg";
import img17 from "../assets/It's back! The Range chair that caused a shopping frenzy last year is now available in navy.jpeg";
import img7 from "../assets/Kara Rosenlund - Weekend in Pictures – qualia.jfif";
import img8 from "../assets/MATEIN Youth Basketball Backpack - 35L _ Galaxy Blue.jfif";
import img9 from "../assets/o🪐.jfif";

// Haversine formula to calculate distance between two points in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const PromoCard = ({
  logo,
  code,
  description,
  expiration,
  location,
  store,
}) => (
  <div className="border rounded-lg py-10 shadow-md flex flex-col items-center bg-emerald-50 text-white">
    <img
      src={logo}
      alt="Promo Logo"
      className="w-[16vw] h-[22vh] mb-1 rounded-xl"
    />
    <h2 className="text-lg text-gray-600 font-bold mb-1">{code}</h2>
    <p className="text-sm text-gray-600 mb-1">{description}</p>
    <p className="text-xs text-gray-600 mb-1">Store: {store}</p>
    <p className="text-xs text-gray-600 mb-1">Expires: {expiration}</p>
    <p className="text-xs text-gray-600 mb-2">Location: {location}</p>
  </div>
);

const PromoCodesPage = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch promo codes from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api3/promocodes")
      .then((response) => {
        setPromoCodes(response.data);
        setFilteredPromoCodes(response.data); // Show all promo codes initially
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching promo codes:", error);
        setError("Error fetching promo codes");
        setLoading(false);
      });
  }, []);

  // Fetch user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          filterPromoCodesByRange(
            position.coords.latitude,
            position.coords.longitude
          ); // Call filtering logic after obtaining location
        },
        (error) => {
          setError(
            "Unable to retrieve your location. Please enable location services."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Filter promo codes based on 2km range
  const filterPromoCodesByRange = (lat, lon) => {
    const filtered = promoCodes.filter((promo) => {
      const distance = calculateDistance(
        lat,
        lon,
        promo.latitude,
        promo.longitude
      );
      return distance <= 2; // 2 km radius
    });

    if (filtered.length === 0) {
      setError("No promo codes found within your range.");
    } else {
      setError(null); // Clear any previous errors
    }

    setFilteredPromoCodes(filtered);
  };

  // Map promo codes to specific images based on promoCodeId
  const getPromoImage = (promoCodeId) => {
    const imageMap = {
      1: img1,
      2: img2,
      3: img3,
      4: img4,
      5: img5,
      6: img6,
      7: img7,
      8: img8,
      9: img9,
      10: img10,
      11: img11,
      12: img12,
      13: img13,
      14: img14,
      15: img15,
      16: img16,
      17: img17,
    };
    return imageMap[promoCodeId] || img1; // Default to img1 if promoCodeId is not mapped
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Promo Codes</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={getUserLocation} // Fetch location when the button is clicked
      >
        Show Promo Codes Within 2km Range
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPromoCodes.map((promo) => (
          <PromoCard
            key={promo.promoCodeId}
            logo={getPromoImage(promo.promoCodeId)} // Use specific image
            code={promo.promoCode}
            description={`Save ${promo.discount}%`}
            expiration={new Date(promo.expiryDate).toLocaleDateString()}
            location={`${promo.latitude}, ${promo.longitude}`} // Display location
            store={promo.store} // Display store name
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCodesPage;
