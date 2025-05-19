"use client"
import { Github, Twitter, Instagram} from 'lucide-react';
import FooterAnimation from './FooterAnimation'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
        <FooterAnimation />
        <footer className="bg-background dark:bg-slate-900 text-muted-foreground pt-8 pb-2 relative z-[1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          {/* Column 1: Copyright & Basic Info */}
          <div className="text-sm">
            <p>© {currentYear} The Trip Collective.</p>
          </div>

          {/* Column 2: Social Links (Centered on mobile, right on desktop) */}
          <div className="flex justify-center md:justify-end space-x-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-tripPurple transition-colors">
              <Github size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-tripPink transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-tripTeal transition-colors">
              <Instagram size={24} />
            </a>
          </div>
          
          
        </div>
        
        {/* <div className="text-center text-xs mt-8 pt-4 border-t border-border/20">
          <p>Crafted with ❤️ by your The Trip IT-crowd.</p>
        </div> */}
      </div>
    </footer>
    </>
    
  );
};

export default Footer;