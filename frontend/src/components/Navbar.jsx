import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4 shadow mb-4 rounded">
      <h1 className="text-xl font-bold">📚 Afghan Proverbs</h1>
      <div className="space-x-4">
        {/* <Link to="/" className="text-blue-600">
          Home
      </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
