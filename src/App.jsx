
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import { Toaster, toast } from "react-hot-toast";
import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/* -------------------------
   Sample skill JSON data
   -------------------------*/
const skillsData = [
  {
    skillId: 1,
    skillName: "Beginner Guitar Lessons",
    providerName: "Alex Martin",
    providerEmail: "alex@skillswap.com",
    price: 20,
    rating: 4.8,
    slotsAvailable: 3,
    description: "Acoustic guitar classes for complete beginners.",
    image: "https://i.postimg.cc/5y5vygQ9/Cute-little-girl-playing-the-guitar.jpg",
    category: "Music",
  },
  {
    skillId: 2,
    skillName: "Spoken English Practice",
    providerName: "Sara Hossain",
    providerEmail: "sara@skillswap.com",
    price: 10,
    rating: 4.6,
    slotsAvailable: 5,
    description: "Conversational English sessions for non-native speakers.",
    image: "https://i.postimg.cc/Nf2HVgjV/88608b1b45845527e201e4764cdb9684.jpg",
    category: "Language",
  },
  {
    skillId: 3,
    skillName: "Intro to Web Development",
    providerName: "Rafi Ahmed",
    providerEmail: "rafi@skillswap.com",
    price: 30,
    rating: 4.9,
    slotsAvailable: 2,
    description: "HTML/CSS/JS fundamentals for beginners.",
    image: "https://i.postimg.cc/kGg5xPTL/90c5273d41d32fcfc3c6e23a0c8e8860.jpg",
    category: "Coding",
  },
  {
    skillId: 4,
    skillName: "Yoga for Beginners",
    providerName: "Maya Roy",
    providerEmail: "maya@skillswap.com",
    price: 15,
    rating: 4.7,
    slotsAvailable: 4,
    description: "Gentle yoga flows and breathing.",
    image: "https://i.postimg.cc/KjDHhdFZ/Benefits-of-Yoga.jpg",
    category: "Health",
  },
  {
    skillId: 5,
    skillName: "Basic Spanish Conversation",
    providerName: "Carlos Diaz",
    providerEmail: "carlos@skillswap.com",
    price: 12,
    rating: 4.5,
    slotsAvailable: 6,
    description: "Practice speaking Spanish in small groups.",
    image: "https://i.postimg.cc/sxLZx23T/Learn-Spanish-in-just-10-minutes-a-day-24-7.jpg",
    category: "Language",
  },
  {
    skillId: 6,
    skillName: "Photography Basics",
    providerName: "Nour Rahman",
    providerEmail: "nour@skillswap.com",
    price: 25,
    rating: 4.85,
    slotsAvailable: 3,
    description: "Learn composition and camera basics.",
    image: "https://i.postimg.cc/T1xT9MCK/29da9b751f4a904f187fd88af6fae064.jpg",
    category: "Art",
  },
];

/* -------------------------
   Navbar component
   -------------------------*/
function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-base-200 shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            
            <span className="font-semibold text-lg"><img className="w-34 flex items-center" src="https://i.postimg.cc/PJ7nbRKG/Black-White-Simpel-Monochrome-Initial-Name-Logo-removebg-preview.png" alt="" /></span>
          </Link>
        </div>

        <div className="flex items-center gap-4 font-semibold">
          <Link to="/" className="hover:underline ">Home</Link>
          <Link to="/listings" className="hover:underline">Listings</Link>
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/profile" className="hover:underline">My Profile</Link>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${(user.displayName || user.email || "U").split(" ")[0]}`}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border"
                  title={user.displayName || user.email}
                />
                <button onClick={onLogout} className="btn btn-ghost btn-sm">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm px-6 text-[16px]">Login</Link>
              <Link to="/signup" className="btn btn-outline btn-sm px-4 text-[16px]">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* -------------------------
   Footer
   -------------------------*/
function Footer() {
  return (
    <footer className="bg-base-300 mt-12">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img className="w-34 flex items-center" src="https://i.postimg.cc/PJ7nbRKG/Black-White-Simpel-Monochrome-Initial-Name-Logo-removebg-preview.png" alt="" />
          
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm">email: ahmedroniarm@gmail.com</p>
          <p className="text-sm">phone: +880 1234 567890</p>
        </div>
        <div>
          <h4 className="font-semibold">Links</h4>
          <Link className="block text-sm" to="/privacy">Privacy Policy</Link>
          <div className="flex gap-2 mt-2">
            <a target="_blank" rel="noreferrer" href="https://facebook.com" className="link">Facebook</a>
            <a target="_blank" rel="noreferrer" href="https://instagram.com" className="link">Instagram</a>
            <a target="_blank" rel="noreferrer" href="https://twitter.com" className="link">Twitter</a>
          </div>
        </div>
      </div>
      <div className="bg-base-200 text-center py-3">© {new Date().getFullYear()} SkillSwap</div>
    </footer>
  );
}

/* -------------------------
   Home
   -------------------------*/
function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const popular = skillsData.slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <Swiper slidesPerView={1} pagination={{ clickable: true }} className="h-64 rounded-lg overflow-hidden">
          <SwiperSlide>
            <div className="w-full h-64 flex items-center justify-between bg-gradient-to-r from-indigo-400 to-fuchsia-500 p-6 rounded-lg text-white">
              <div>
                <h2 className="text-3xl font-bold">Learn a New Skill From your Neighborhood</h2>
                
                <Link to="/listings" className="btn btn-outline btn-accent mt-4 border-white text-white hover-bg-white">Browse Listings</Link>
              </div>
              <img src="https://i.postimg.cc/sxq6CS0k/No-experience-needed-Learn-step-by-step-how-to-start-affiliate-marketing-and-see-results-within-w.jpg " alt="hero" className="hidden md:block w-48 rounded-2xl shadow-xl"/>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full h-64 flex items-center justify-between bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white">
              <div>
                <h2 className="text-3xl font-bold">Share what you know — get what you need</h2>
                <p className="mt-2">Create listings and help others learn your craft.</p>
                <Link to="/create" className="btn btn-primary mt-4">Create Listing</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Popular Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((s) => (
            <div data-aos="fade-up" key={s.skillId} className="card bg-base-100 shadow-md">
              <figure><img src={s.image} alt={s.skillName} className=" w-full h-full bg-centerobject-cover rounded-xl " /></figure>
              <div className="card-body">
                <h4 className="font-semibold">{s.skillName}</h4>
                <p className="text-xs text-muted">{s.providerName} • {s.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold">${s.price}</span>
                    <span className="text-xs ml-2"> • {s.rating} ★</span>
                  </div>
                  <Link to={`/skills/${s.skillId}`} className="btn btn-sm btn-outline">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8" data-aos="fade-up">
        <h3 className="text-2xl font-semibold mb-4">Top Rated Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary"><img src="https://i.postimg.cc/JhtF96Gk/aee6d45245609592339c8508ae27182d.jpg" alt="" /></div>
              </div>
              <div>
                <div className="font-semibold">Alex Martin</div>
                <div className="text-xs text-muted">Guitar • 4.8★</div>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary"><img src="https://i.postimg.cc/dQ7q866N/Whats-App-Image-2025-06-29-at-21-22-00-141769e7-removebg-preview.png" alt="" /></div>
              </div>
              <div>
                <div className="font-semibold">Ahmed Roni</div>
                <div className="text-xs text-muted">Web Dev • 4.9★</div>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary"><img src="https://i.postimg.cc/dQWy0513/17a9506d5ebb5ed180972b1ad4be212a.jpg" alt="" /></div>
              </div>
              <div>
                <div className="font-semibold">Nour Rahman</div>
                <div className="text-xs text-muted">Photography • 4.85★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8" data-aos="fade-up">
        <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-base-100 rounded shadow">
            <h4 className="font-semibold">1. Browse</h4>
            <p className="text-sm">Search listings by category or location.</p>
          </div>
          <div className="p-6 bg-base-100 rounded shadow">
            <h4 className="font-semibold">2. Connect</h4>
            <p className="text-sm">Message the provider & book a session.</p>
          </div>
          <div className="p-6 bg-base-100 rounded shadow">
            <h4 className="font-semibold">3. Rate</h4>
            <p className="text-sm">Leave feedback and help others choose.</p>
          </div>
        </div>
      </section>

      <section data-aos="fade-up">
        <h3 className="text-2xl font-semibold mb-4">Community Events</h3>
        <p className="mb-3 text-sm">Local meetups where providers/demo sessions happen. Good for trying a class before booking.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Open Jam Night</h4>
                <p className="text-xs text-muted">Saturday • 6:00 PM • Community Center</p>
              </div>
              <button className="btn btn-sm">Attend</button>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Beginner Coding Meetup</h4>
                <p className="text-xs text-muted">Sunday • 11:00 AM • Library</p>
              </div>
              <button className="btn btn-sm">Attend</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

