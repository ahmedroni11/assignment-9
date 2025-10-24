
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
            
            <span className="font-semibold text-lg"><img className="w-34 flex items-center" src="https://i.postimg.cc/C1NB5Pzn/Black-White-Simpel-Monochrome-Initial-Name-Logo.png" alt="" /></span>
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
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-outline btn-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


