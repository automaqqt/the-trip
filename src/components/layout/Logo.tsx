import Link from 'next/link';
//import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* Replace with your actual logo SVG or Image */}
      {/* <Image src="/images/logo.svg" alt="The Trip Logo" width={40} height={40} /> */}
      <div className="w-10 h-10 bg-linear-to-br from-tripPurple to-tripPink rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-purple">
        <span className="font-heading text-xl font-black text-white">T</span>
      </div>
      <span className="font-heading text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-tripPurple via-tripPink to-tripTeal group-hover:opacity-80 transition-opacity">
        The Trip
      </span>
    </Link>
  );
};

export default Logo;