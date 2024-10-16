import React, { useEffect, useState } from 'react';
import CurrDropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurr, setFromCurr] = useState('USD');
    const [toCurr, setToCurr] = useState('INR');
    const [convertedAmt, setConvertedAmt] = useState(null);
    const [converting, setConverting] = useState(false);
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || ['INR', 'EUR']);

    const fetchCurrencies = async () => {
        try {
            const res = await fetch('https://api.frankfurter.app/currencies');
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error('Error Fetching', error);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`);
            const data = await res.json();
            setConvertedAmt(data.rates[toCurr] + ' ' + toCurr);
        } catch (error) {
            console.error('Error Fetching', error);
        } finally {
            setConverting(false);
        }
    };

    const handleFavourite = (currency) => {
        let updatedFavourites = [...favourites];
        if (favourites.includes(currency)) {
            updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
        } else {
            updatedFavourites.push(currency);
        }
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    const swapCurrencies = () => {
        setFromCurr(toCurr);
        setToCurr(fromCurr);
    };

    return (
        <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg'>
            <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
                <CurrDropdown
                    currencies={currencies}
                    favourites={favourites}
                    title='From'
                    currency={fromCurr}
                    setCurrency={setFromCurr}
                    handleFavourite={handleFavourite}
                />
                <div className='flex justify-center -mb-5 sm:mb-0'>
                    <button
                        onClick={swapCurrencies}
                        className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                        <HiArrowsRightLeft className='text-xl text-gray-700' />
                    </button>
                </div>
                <CurrDropdown
                    currencies={currencies}
                    favourites={favourites}
                    title='To'
                    currency={toCurr}
                    setCurrency={setToCurr}
                    handleFavourite={handleFavourite}
                />
            </div>
            <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700' htmlFor='amount'>
                    Amount:
                </label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
                    type='number'
                />
            </div>
            <div className='flex justify-end mt-6'>
                <button
                    onClick={convertCurrency}
                    className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? 'animate-pulse' : ''}`}>
                    Convert
                </button>
            </div>
            {convertedAmt && (
            <div className='mt-4 text-lg font-medium text-right text-green-600'>
             Converted Amount is : {convertedAmt}
            </div>)}
        </div>
    );
};

export default CurrencyConverter;
