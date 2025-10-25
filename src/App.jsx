
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
          <img className="w-34 flex items-center pt-8" src="https://i.postimg.cc/PJ7nbRKG/Black-White-Simpel-Monochrome-Initial-Name-Logo-removebg-preview.png" alt="" />
          
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm pt-3 text-gray-500">email: ahmedroniarm@gmail.com</p>
          <p className="text-sm pt-1 text-gray-500">phone: +880 1234 567890</p>
        </div>
        <div>
          <h4 className="font-semibold">Links</h4>
          <Link className="block text-sm pt-2 text-gray-500" to="/privacy">Privacy Policy</Link>
          <div className="flex gap-3 pt-4">
            <a
              href="https://www.facebook.com/ahmed.ronimirza"
              target="blank"
              className="w-8 h-8 bg-gray-700 hover:bg-blue-600 text-white flex items-center justify-center rounded text-sm font-bold transition-colors"
            >
              f
            </a>
            <a
              href="https://x.com/AhmedRoni444574"
              target="blank"
              className="w-8 h-8 bg-gray-700 hover:bg-blue-400 text-white flex items-center justify-center rounded text-sm font-bold transition-colors"
            >
              t
            </a>
            <a
              href="https://www.linkedin.com/in/md-roni-hossain-9346b5260/"
              target="blank"
              className="w-8 h-8 bg-gray-700 hover:bg-pink-600 text-white flex items-center justify-center rounded text-sm font-bold transition-colors"
            >
              in
            </a>
          </div>
        </div>
      </div>
      <div className="bg-base-200 text-center py-3">© {new Date().getFullYear()} Copyright - All right reserved</div>
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

/* -------------------------
   Listings page
   -------------------------*/
function Listings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl mb-4">All Listings</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {skillsData.map((s) => (
          <div key={s.skillId} className="card bg-base-100 shadow">
            <figure><img src={s.image} alt={s.skillName} className="h-full w-full object-cover" /></figure>
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
    </div>
  );
}

/* -------------------------
   Protected wrapper
   -------------------------*/
function RequireAuth({ user, children }) {
  const location = useLocation();
  if (user === undefined) return <div className="p-8">Checking auth...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

/* -------------------------
   Skill Details (Protected)
   -------------------------*/
function SkillDetailsPage() {
  const location = useLocation();
  const id = Number(location.pathname.split("/").pop());
  const skill = skillsData.find((s) => s.skillId === id);
  const { currentUser } = { currentUser: auth.currentUser };
  const [form, setForm] = useState({ name: currentUser?.displayName || "", email: currentUser?.email || "" });

  useEffect(() => {
    setForm({ name: auth.currentUser?.displayName || "", email: auth.currentUser?.email || "" });
  }, []);

  if (!skill) return <div className="container mx-auto px-4 py-8">Skill not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Session booked successfully!");
    setForm({ name: auth.currentUser?.displayName || "", email: auth.currentUser?.email || "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={skill.image} alt={skill.skillName} className="w-full h-72 object-cover rounded" />
          <div className="mt-4">
            <h3 className="text-2xl font-semibold">{skill.skillName}</h3>
            <p className="text-sm text-muted">{skill.providerName} • {skill.category}</p>
            <p className="mt-3">{skill.description}</p>
            <ul className="mt-3 text-sm">
              <li><strong>Price:</strong> ${skill.price}</li>
              <li><strong>Rating:</strong> {skill.rating} ★</li>
              <li><strong>Slots:</strong> {skill.slotsAvailable}</li>
              <li><strong>Contact:</strong> {skill.providerEmail}</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="card p-6 shadow">
            <h4 className="font-semibold mb-3">Book Session</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs">Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="input input-bordered w-full" required/>
              </div>
              <div>
                <label className="block text-xs">Email</label>
                <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="input input-bordered w-full" type="email" required/>
              </div>
              <button className="btn btn-primary w-full">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Auth pages
   -------------------------*/
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  const handleForgot = () => {
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Login</h3>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-xs">Email</label>
            <input type="email" className="input input-bordered w-full" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>
          <div>
            <label className="block text-xs">Password</label>
            <div className="relative">
              <input type={show ? "text" : "password"} className="input input-bordered w-full pr-10" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-2 text-sm btn btn-ghost btn-xs">
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="btn btn-primary">Login</button>
            <button type="button" className="link" onClick={handleForgot}>Forgot Password?</button>
          </div>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full">Continue with Google</button>

        <p className="text-sm mt-3">Don't have an account? <Link to="/signup" className="link">Signup</Link></p>
      </div>
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [show, setShow] = useState(false);

  function validPassword(pw) {
    return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && pw.length >= 6;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validPassword(form.password)) {
      return toast.error("Password must be 6+ chars, include uppercase and lowercase.");
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name, photoURL: form.photo });
      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Signup</h3>
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label className="block text-xs">Name</label>
            <input className="input input-bordered w-full" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
          </div>
          <div>
            <label className="block text-xs">Email</label>
            <input type="email" className="input input-bordered w-full" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
          </div>
          <div>
            <label className="block text-xs">Photo URL</label>
            <input className="input input-bordered w-full" value={form.photo} onChange={(e)=>setForm({...form,photo:e.target.value})}/>
          </div>
          <div>
            <label className="block text-xs">Password</label>
            <div className="relative">
              <input type={show ? "text" : "password"} className="input input-bordered w-full pr-10" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required/>
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-2 text-sm btn btn-ghost btn-xs">
                {show ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs mt-1 text-muted">At least 6 characters, include uppercase & lowercase</p>
          </div>

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full">Continue with Google</button>

        <p className="text-sm mt-3">Already have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div>
  );
}

/* -------------------------
   Forgot Password Page
   -------------------------*/
function ForgotPasswordPage() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent — opening Gmail");
      
      window.open("https://mail.google.com", "_blank");
    } catch (err) {
      toast.error(err.message || "Reset failed");
    }
  };
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
        <form onSubmit={handleReset} className="space-y-3">
          <input type="email" className="input input-bordered w-full" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <button className="btn btn-primary w-full">Send Reset Email</button>
        </form>
      </div>
    </div>
  );
}

/* -------------------------
   Profile Page (updateProfile implemented)
   -------------------------*/
function ProfilePage({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", photo: "" });

  useEffect(() => {
    setForm({ name: user?.displayName || "", photo: user?.photoURL || "" });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: form.name, photoURL: form.photo });
      toast.success("Profile updated");
      setEditing(false);
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  if (!user) return <div className="container mx-auto px-4 py-8">Please login to see your profile</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card p-6 shadow">
        <div className="flex items-center gap-4">
          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${(user.displayName || user.email).split(" ")[0]}`} alt="avatar" className="w-20 h-20 rounded-full object-cover"/>
          <div>
            <h4 className="font-semibold text-lg">{user.displayName || "No display name"}</h4>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          {!editing ? (
            <>
              <button className="btn btn-primary" onClick={()=>setEditing(true)}>Update Profile</button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-3 mt-4">
              <div>
                <label className="block text-xs">Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="input input-bordered w-full"/>
              </div>
              <div>
                <label className="block text-xs">Photo URL</label>
                <input value={form.photo} onChange={(e)=>setForm({...form,photo:e.target.value})} className="input input-bordered w-full"/>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-success">Save</button>
                <button type="button" onClick={()=>setEditing(false)} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Main App
   -------------------------*/
export default function App() {
  const [user, setUser] = useState(undefined);
  

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    AOS.init({ duration: 700, once: true });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/events" element={<div className="container mx-auto px-4 py-8"><h3>Events</h3><p>Community events listed here.</p></div>} />

          <Route path="/skills/:id" element={
            <RequireAuth user={user}>
              <SkillDetailsPage />
            </RequireAuth>
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={
            <RequireAuth user={user}>
              <ProfilePage user={user} />
            </RequireAuth>
          } />

          <Route path="/privacy" element={<div className="container mx-auto px-4 py-8"><h3>Privacy Policy</h3><p className="text-sm">This is a demo app.</p></div>} />

          <Route path="*" element={<div className="container mx-auto px-4 py-8">Page not found</div>} />
        </Routes>

        <div className="mt-auto">
          <Footer />
        </div>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
