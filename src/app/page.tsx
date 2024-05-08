import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen antialiased text-center bg-gray-300">
      <div className="border rounded-lg shadow-md p-8 m-auto mx-auto max-w-7xl bg-white">
        <h1 className="text-3xl font-bold text-black mb-8">Hanoi University Domain-specific Chatbot</h1>
        <div className="flex justify-center">
          <div className="w-1/2 pr-4">
            <Link href="/education" passHref>
              <div className="block bg-blue-500 hover:bg-blue-600 text-white rounded-md py-4 px-6 mb-4 transition duration-300 ease-in-out">
                Educational Program
              </div>
            </Link>
          </div>
          <div className="w-1/2 pl-4">
            <Link href="/services" passHref>
              <div className="block bg-green-500 hover:bg-green-600 text-white rounded-md py-4 px-6 mb-4 transition duration-300 ease-in-out">
                Public Administration
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
