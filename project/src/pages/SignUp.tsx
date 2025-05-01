import React, { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnect from '../components/WalletConnect';
import { UserPlus } from 'lucide-react';

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}

const SignUp = () => {
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-newcastle-black">Join Geordie Nation</h1>
          <p className="mt-2 text-gray-600">Connect your wallet and create your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Type</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setAccountType('personal')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  accountType === 'personal'
                    ? 'bg-tyne-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Personal Account
              </button>
              <button
                onClick={() => setAccountType('business')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  accountType === 'business'
                    ? 'bg-tyne-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Business Account
              </button>
            </div>
          </div>

          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletConnect />
          </Web3ReactProvider>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {accountType === 'personal' ? 'Full Name' : 'Business Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                />
              </div>
              {accountType === 'business' && (
                <div>
                  <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">
                    Business Type
                  </label>
                  <select
                    id="business-type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                  >
                    <option>Tourism</option>
                    <option>Sports</option>
                    <option>Retail</option>
                    <option>Food & Beverage</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-tyne-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tyne-blue"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Create Account
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-2">
            Your wallet will be used to manage your Geordie Notes (ERC20) tokens
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;