
import Link from 'next/link';
import { RiHome2Line } from 'react-icons/ri';



const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        
            <h1 className="text-8xl md:text-9xl font-black text-[#023154">
                404
            </h1>

         
            <h2 className="text-2xl md:text-3xl font-bold text-[#01223c] mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-4 max-w-md">
                Looks like this friendship link is broken. The page you're looking for doesn't exist or has been moved.
            </p>

            
            <Link href={'/'}
                to="/" 
                className="mt-8 flex items-center gap-2 bg-[#023154] text-white px-6 py-3 rounded-md font-semibold hover:[#01223c] transition-all"
            >
                <RiHome2Line className="text-xl" />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;