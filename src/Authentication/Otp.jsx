
export default function Otp()  {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Please enter the 4-digit code sent to your mobile or email
        </p>
        <form>
          <div className="flex justify-between mb-6">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Didn&apos;t receive the code?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

