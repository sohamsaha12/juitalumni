import React from 'react';

const Donate = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Donate to JU IT Alumni Association</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                            Donation Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="card-element" className="block text-gray-700 font-bold mb-2">
                            Credit or Debit Card
                        </label>
                        <div id="card-element" className="p-2 border border-gray-300 rounded">
                            {/* Card details will go here */}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Donate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Donate;