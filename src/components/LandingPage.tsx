import { Star, StarHalf, Facebook, Twitter, Instagram, Quote, ThumbsUp, MessageSquare, Share2, ChevronLeft, ChevronRight, Sparkles, Images, Linkedin, MessageCirclePlus, GitBranchPlus, Github } from 'lucide-react';
import { MessageChannel } from 'worker_threads';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-[#4A2B18]">
      
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-6 md:px-12 max-w-[1400px] mx-auto relative z-20">
        <div className="flex items-center gap-2 text-[#4A2B18] font-black text-2xl tracking-tight">
          <Images className="text-[#F2A945] w-8 h-8" />
          DubaPost
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button className="bg-[#F2A945] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#d9963c] transition-colors">
            LOGIN
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left: LinkedIn Mockup */}
        <div className="flex-1 relative w-full max-w-xl mx-auto lg:mx-0">
          {/* Decorative Elements */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#F2A945]/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#7B8C37]/10 rounded-full blur-2xl"></div>
          
          {/* Price Badge Equivalent */}
          <div className="absolute -top-6 -right-2 md:-right-8 w-24 h-24 bg-[#7B8C37] rounded-full text-white flex flex-col items-center justify-center shadow-xl transform rotate-12 border-4 border-white z-30">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">Cost</span>
            <span className="text-2xl font-black">FREE</span>
            <span className="text-[10px] line-through opacity-70">$10/mo</span>
          </div>

          {/* The LinkedIn Mockup */}
          <div className="transform -rotate-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white rounded-2xl w-full mx-auto border border-gray-100 relative z-20 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mesay" className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200" alt="Profile" />
              <div>
                <h4 className="font-bold text-[15px] text-gray-900 leading-none">Esubalew G.</h4>
                <p className="text-[13px] text-gray-500 mt-1">Software Engineer | Tech Content Creator</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Just now • 🌐</p>
              </div>
            </div>
            {/* Text */}
            <div className="px-5 pb-3">
              <p className="text-[14px] text-gray-800 leading-relaxed">Turn your plain text into beautiful social media posts in seconds! 🚀<br/> <br/> #buildinpublic #design</p>
            </div>
            {/* Image Attachment (The generated post) */}
            <div className="w-full bg-gradient-to-br from-[#ECA040] to-[#d98e30] p-8 md:p-12 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/30 text-center shadow-2xl w-full max-w-sm">
                <Quote className="w-10 h-10 mx-auto mb-6 text-white/60" />
                <p className="text-2xl md:text-3xl font-serif italic text-white mb-6 leading-snug">"The only way to do great work is to love what you do."</p>
                <p className="text-sm font-bold tracking-widest uppercase text-white/90">— Steve Jobs</p>
              </div>
            </div>
            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between text-gray-500 text-[13px] font-semibold bg-gray-50/50">
              <span className="flex items-center gap-1.5 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><ThumbsUp className="w-4 h-4"/> Like</span>
              <span className="flex items-center gap-1.5 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><MessageSquare className="w-4 h-4"/> Comment</span>
              <span className="flex items-center gap-1.5 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><Share2 className="w-4 h-4"/> Share</span>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 text-center lg:text-left">
           <div className="mb-6">
             <span className="font-serif italic text-4xl md:text-5xl text-[#4A2B18] opacity-90">Turn your</span><br/>
             <h1 className="text-8xl md:text-7xl font-black text-[#4A2B18] tracking-tight mt-2 uppercase">Words Into <span className="text-[#F2A945]">Posts</span></h1>
           </div>
           
           {/* Rating */}
           <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
             <div className="flex text-[#F2A945]">
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <StarHalf className="w-5 h-5 fill-current" />
             </div>
             <span className="font-black text-[#4A2B18] text-lg">4.9</span>
             <span className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-700">500+ Reviews</span>
           </div>
           
           {/* Description Box */}
           <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-10 max-w-xl mx-auto lg:mx-0">
             <p className="text-gray-600 leading-relaxed text-base md:text-lg">
               Create beautiful, image-based social media posts for text, quotes, Bible verses, and code snippets in seconds. The delicate blend of typography and design creates a symphony of engagement in every post.
             </p>
           </div>
           
           {/* Buttons */}
           <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
             <button onClick={onStart} className="w-auto bg-[#F2A945] text-white px-10 py-4 rounded-full font-black tracking-wide shadow-lg hover:bg-[#d9963c] hover:shadow-xl hover:-translate-y-0.5 transition-all">
               START CREATING
             </button>
           </div>
        </div>
      </section>

      {/* Wave Separator 1 */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg className="relative block w-full h-[60px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F9F9F9]"></path>
        </svg>
      </div>

      {/* Cards Section */}
      <section className="bg-[#F9F9F9] py-20 px-6 relative">
        
        {/* Navigation Arrows (Decorative) */}
        {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-white shadow-inner cursor-pointer hover:bg-gray-300 hidden md:flex">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-white shadow-inner cursor-pointer hover:bg-gray-300 hidden md:flex">
          <ChevronRight className="w-6 h-6" />
        </div> */}

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 pb-8">
          
          {/* Card 1 Mockup */}
          <div className="flex justify-center items-center w-full h-56">
            <div className="w-64 h-40 bg-zinc-900 rounded-2xl shadow-2xl border-[6px] border-white overflow-hidden transform -rotate-3 flex flex-col items-center justify-center p-6">
              <Quote className="w-8 h-8 text-white/20 mb-3" />
              <p className="text-white font-serif text-sm italic text-center leading-relaxed">"Design is intelligence made visible."</p>
            </div>
          </div>

          {/* Card 2 Mockup */}
          <div className="flex justify-center items-center w-full h-56">
            <div className="w-64 h-40 bg-[#1e1e1e] rounded-2xl shadow-2xl border-[6px] border-white overflow-hidden transform rotate-2 flex flex-col">
              <div className="flex gap-1.5 p-3 border-b border-white/10 bg-black/40">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="p-4 text-[11px] font-mono text-blue-300 leading-relaxed text-left">
                <span className="text-purple-400">const</span> <span className="text-blue-300">post</span> <span className="text-white">=</span> <span className="text-yellow-300">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-yellow-300">{'{'}</span><br/>
                &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">'Beautiful!'</span>;<br/>
                <span className="text-yellow-300">{'}'}</span>;
              </div>
            </div>
          </div>

          {/* Card 3 Mockup */}
          <div className="flex justify-center items-center w-full h-56">
            <div className="w-64 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl border-[6px] border-white overflow-hidden transform -rotate-2 flex items-center justify-center p-6">
              <p className="text-gray-800 font-sans font-black text-xl leading-tight text-center">Make your plain text stand out.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Wave Separator 2 */}
      <div className="w-full overflow-hidden leading-none bg-[#F9F9F9]">
        <svg className="relative block w-full h-[60px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-8 pb-12 text-center relative">
        <div className="flex justify-center gap-6 mb-8 text-[#4A2B18]">
          <a href="https://github.com/esubalew-gosaye" target='__blank' className="hover:text-[#F2A945] transition-colors"><Github className="w-6 h-6 fill-current" /></a>
          <a href="https://t.me/@mesayem" target='__blank' className="hover:text-[#F2A945] transition-colors"><MessageCirclePlus className="w-6 h-6 fill-current" /></a>
          <a href="https://www.linkedin.com/in/esubalew-gosaye/" target='__blank' className="hover:text-[#F2A945] transition-colors"><Linkedin className="w-6 h-6" /></a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm font-bold text-[#7B8C37] mb-8 px-4">
          <a href="#" className="hover:text-[#F2A945] transition-colors">Home</a> <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-[#F2A945] transition-colors">About Us</a> <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-[#F2A945] transition-colors">Menu</a> <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-[#F2A945] transition-colors">Blog</a> <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-[#F2A945] transition-colors">Contact</a> <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-[#F2A945] transition-colors">Return Policy</a>
        </div>
        
        <p className="text-[11px] text-gray-400 font-medium">Copyright © {new Date().getFullYear()} DubaPost. All rights reserved.</p>

        {/* Floating Action Button (like the image) */}
        {/* <div className="absolute right-6 bottom-6 w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-200 transition-colors">
          <Sparkles className="w-6 h-6 text-gray-600" />
        </div> */}
      </footer>

    </div>
  );
}
