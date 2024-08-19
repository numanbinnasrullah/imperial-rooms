
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
const SocialIcons = () => {
    return (
        <>
            <div className="flex space-x-3 py-1 px-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <FaFacebookF size={20} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <FaInstagram size={20} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <FaTwitter size={20} />
                </a>
                <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                    <FaPinterest size={20} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                    <FaYoutube size={20} />
                </a>
            </div>
        </>
    )
}

export default SocialIcons