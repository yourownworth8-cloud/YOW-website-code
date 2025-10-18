// ✅ FIXED FULL YOW WEBSITE CODE (READY FOR LOCAL DEVELOPMENT AND DEPLOYMENT)

// PROJECT FOLDER STRUCTURE:
// YOW-website-code/  <-- root folder
// ├── package.json       <-- MUST be at root
// ├── README.md
// ├── src/
// │   ├── App.jsx
// │   └── index.css
// ├── public/
// │   └── assets/
// │       ├── hoodie-brown.jpg
// │       ├── hoodie-black.jpg
// │       └── sweatpants-brown.jpg

// package.json
{
  "name": "YOW-website-code",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}

// src/App.jsx
import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';

const PRODUCTS = [
  { id: 'prod_001', name: 'YOW Hoodie — Raw Stitch', price: 12000, desc: 'Oversized boxy cropped hoodie', img: '/assets/hoodie-brown.jpg' },
  { id: 'prod_002', name: 'YOW Sweatpants — Baggy', price: 9000, desc: 'Baggy sweatpants, high-waist', img: '/assets/sweatpants-brown.jpg' },
  { id: 'prod_003', name: 'YOW Hoodie — Black', price: 12000, desc: 'Minimal black — raw seam', img: '/assets/hoodie-black.jpg' }
];

function formatPrice(cents){
  return `$${(cents/100).toFixed(2)}`;
}

function Header(){
  return (
    <header className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl w-full px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-6">
          <div className="text-4xl md:text-6xl font-black tracking-tight">YOUROWNWORTH</div>
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-sm font-medium">YOW</div>
          <button className="ml-4 p-2 rounded-md border border-white/20 hover:bg-white/5" aria-label="cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
            </svg>
          </button>
        </div>
        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">A luxury, minimal clothing line — exclusive drops, premium materials, intentional design.</p>
        <a href="#products" className="inline-block mt-10 px-7 py-3 border border-white/30 rounded-full text-sm uppercase tracking-wide hover:bg-white/5">Explore collection</a>
      </div>
    </header>
  );
}

function ProductCard({p}){
  const handleBuy = async () => {
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ priceId: p.id })
      });
      const json = await res.json();
      if(json.url) window.location.href = json.url;
    } catch(err) {
      console.error(err);
      alert('Unable to start checkout.');
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-start gap-4">
      <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
        <img src={p.img} alt={p.name} className="object-cover w-full h-full" />
      </div>
      <h3 className="text-xl font-semibold">{p.name}</h3>
      <p className="text-sm text-gray-300">{p.desc}</p>
      <div className="mt-auto w-full flex items-center justify-between">
        <div className="text-lg font-bold">{formatPrice(p.price)}</div>
        <button onClick={handleBuy} className="px-5 py-2 bg-white text-black rounded-full font-medium">Buy</button>
      </div>
    </div>
  );
}

function Products(){
  return (
    <section id="products" className="py-24 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-8">Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="py-12 bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6">Follow</div>
        <div className="flex items-center justify-center gap-6 mb-6">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:underline">X</a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
        </div>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} YOUROWNWORTH — All rights reserved.</div>
      </div>
    </footer>
  );
}

function App(){
  return (
    <div className="font-sans">
      <Header />
      <Products />
      <Footer />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
html, body, #root { height: 100%; }
body { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }

// README.md
# YOUROWNWORTH (YOW) Website
This is a free, one-page React + Tailwind website for the YOW clothing brand. It includes a hero section, product showcase, Stripe checkout integration, and social links footer.

---

// ✅ NOTES
// 1. package.json is at root — required for both local dev and Vercel deploy
// 2. Use `npm install` in project root to install dependencies
// 3. Run `npm run dev` to start local development server
// 4. For deployment on Vercel: Build Command -> `npm run build`, Output Directory -> `dist