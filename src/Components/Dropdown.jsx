import React from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi'; // Import HiStar for filled star

const CurrDropdown = ({
    currencies,
    currency,
    setCurrency,
    favourites = [],
    handleFavourite,
    title = "",
}) => {
    const isFav = curr => favourites.includes(curr);

    return (
        <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor={title}>{title}</label>

            <div className='mt-1 relative'>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className='w-full p-2 border border-gray-500 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                    {favourites.map((favCurrency) => (
                        <option className='bg-gray-200' value={favCurrency} key={favCurrency}>
                            {favCurrency}
                        </option>
                    ))}

                    {currencies
                        .filter((c) => !favourites.includes(c))
                        .map((currency) => (
                            <option value={currency} key={currency}>
                                {currency}
                            </option>
                        ))}
                </select>

                <button
                    onClick={() => handleFavourite(currency)}
                    className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm'>
                    {isFav(currency) ? <HiStar className='text-yellow-500' /> : <HiOutlineStar />} {/* Use HiStar for filled star */}
                </button>
            </div>
        </div>
    )
}

export default CurrDropdown;
