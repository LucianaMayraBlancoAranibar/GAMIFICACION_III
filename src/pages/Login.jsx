import React from 'react';

function Login() {
  return (
    <div className="flex flex-wrap h-screen">
      
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-10 space-y-6">
        
        <div className="flex items-center mb-2 mt-10">
          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">Gamificación</span>
        </div>

        <h3 className="text-xl mb-4 font-normal tracking-wider text-center">Log in</h3>

        <div className="w-full sm:w-2/3 md:w-1/2">
          <input  placeholder="Email address"className="border mb-4 p-2 w-full rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-100" type="email"/>
          <input className="border mb-4 p-2 w-full rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-100" placeholder="Password" type="password"/>
  
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-2 mb-4 w-full rounded-full shadow-md transition duration-200 transform hover:scale-105">Inicio de Sesion</button>
        </div>
        <p className="text-xs mb-5 text-gray-500">
          <a href="#!" className="hover:text-blue-500 transition duration-200">Olvidaste tu contraseña?</a>
        </p>
       

      </div>

      {/* Right Section */}
      <div className="hidden sm:block w-1/2">
        <img src={"https://scontent.cdninstagram.com/v/t39.30808-6/396718286_764683899031947_8277713279431758848_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjgweDEyODAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=9s9TydjlUfsAX9qHdGZ&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzIyMzU1ODEwMjc5OTMyNTIzNg%3D%3D.2-ccb7-5&oh=00_AfB1bo9-_wJjP8srAKBf30psbUN55H7eiqowCRPOLd1vXw&oe=6546AB1E&_nc_sid=10d13b"} alt="Login image" className="w-full h-screen object-cover object-left"/>
      </div>

    </div>
  );
}

export default Login;
