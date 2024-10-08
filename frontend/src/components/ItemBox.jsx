import React from 'react';

const SaleCard = ({ item }) => {
  return (
    <div className="relative w-72 mt-28 h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden group mx-2"> {/* Increased size and added horizontal margin */}
      <a href="#">
        <img
          className="p-4 rounded-t-lg h-32 object-cover"
          src={item.image}
          alt={item.title}
        />
      </a>

      <div className="px-4 py-2">
        <h5 className="text-lg font-semibold text-black">{item.title}</h5>
        <span className="text-xl font-bold text-black">${item.price}</span>
      </div>

      {/* <div className="absolute left-0 bottom-0 w-full p-4 bg-light-violet rounded-tl-[20px] rounded-tr-[20px] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 shadow-lg z-10"> 
    <div className="flex items-center justify-center mt-5 mb-3"> 
        {item.description}
        <span className="text-lg text-white text-center">{item.description}</span> 
    </div> */}
    <button 
        type="button" 
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
    >
        Add Cart
    </button>

      <div className="absolute top-[-47px] right-[-45px] w-[100px] h-[100px] -rotate-[175deg] rounded-full bg-transparent shadow-[inset_48px_48px_#f2f2f2]"></div>
    </div>
  );
};

export default SaleCard;
