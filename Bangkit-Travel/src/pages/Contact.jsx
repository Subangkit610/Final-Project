import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url(src/assets/raja-ampat.jpg)" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto text-center text-white px-4 py-32">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6">Get in Touch with Us</h1>
          <p className="text-lg md:text-2xl">Have a question? We'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">For general inquiries, send us an email:</p>
              <a href="mailto:info@travelwebsite.com" className="text-blue-600 hover:text-blue-800 font-semibold">info@travelwebsite.com</a>
            </div>

            {/* WhatsApp */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">WhatsApp Customer Service</h3>
              <p className="text-gray-600">Need assistance? Reach out to us on WhatsApp:</p>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-semibold">+123 456 7890</a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Follow Us</h2>
          <div className="flex justify-center space-x-6">
            {/* Instagram */}
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-purple-600">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12S6.753 21.5 12 21.5 21.5 17.247 21.5 12 17.247 2.5 12 2.5zM12 18.5c-3.526 0-6.5-2.974-6.5-6.5s2.974-6.5 6.5-6.5 6.5 2.974 6.5 6.5-2.974 6.5-6.5 6.5zM16 6h-8v8h8V6z"></path>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M22.54 6.42C22.41 5.6 21.76 4.98 20.9 4.98h-17c-.86 0-1.5.62-1.64 1.43-.09.23-.14.47-.14.72v12.62c0 .26.05.5.14.73.14.81.77 1.43 1.63 1.43h17c.86 0 1.51-.62 1.64-1.43.09-.23.14-.47.14-.73V7.14c0-.26-.05-.5-.14-.72zm-2.04 12.18c0 .24-.21.43-.46.43h-17c-.25 0-.46-.19-.46-.43V7.14c0-.24.21-.43.46-.43h17c.25 0 .46.19.46.43v11.46zM10 9.76v4.47l5.91-2.23-5.91-2.24z"></path>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M22.7 0h-21.4C.6 0 0 .6 0 1.4v21.2c0 .8.6 1.4 1.4 1.4h11.2v-9h-3v-3.6h3v-2.7c0-3.2 1.9-5.1 4.7-5.1 1.4 0 2.8.3 3.3.5v3.4h-2.3c-1.8 0-2.2 1.1-2.2 2.2v2.8h4.4l-1 3.6h-3.4v9h6.7c.8 0 1.4-.6 1.4-1.4V1.4c0-.8-.6-1.4-1.4-1.4z"></path>
              </svg>
            </a>

            {/* Twitter */}
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-400">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.45 4.45 0 0 0 22.47.96a8.89 8.89 0 0 1-2.83 1.09A4.42 4.42 0 0 0 16.49 3c-2.46 0-4.45 1.99-4.45 4.45 0 .35.04.69.12 1-3.7-.19-7-1.96-9.2-4.67a4.43 4.43 0 0 0-.6 2.23c0 1.54.79 2.9 1.97 3.7-1.44-.04-2.79-.44-3.98-1.11v.11c0 2.15 1.53 3.95 3.57 4.37-1.14.31-2.35.36-3.54.14 1.01 3.15 3.94 5.45 7.4 5.5A8.92 8.92 0 0 1 1 19.93c1.4 1.19 3.15 1.89 4.96 1.89a13.48 13.48 0 0 0 13.59-13.5c0-.21-.01-.42-.03-.63a9.64 9.64 0 0 0 2.33-2.46z"></path>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9.6 1.8c0-.7.5-1.3 1.1-1.4 1.3-.3 2.5.5 2.5 1.8v14c0 1.3-1.1 2.1-2.4 1.8-.6-.1-1.1-.6-1.1-1.3V3.3c0-.3-.2-.5-.4-.5-.3 0-.5.2-.5.5v14c0 2.4 2.1 4.4 4.5 4.4 2.4 0 4.3-2 4.3-4.4V4.7c0-.5-.4-.9-.9-.9-.4 0-.8.3-.8.8v9.6c0 1.3-1 2.3-2.3 2.3-.5 0-1-.2-1.4-.5.3-.7.6-1.5.6-2.4V1.8z"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Travel Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
