import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h2 className="text-xl text-white mb-4">Title</h2>
            <ul>
              <li>
                <Link to="/" className="text-base text-white">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-white mb-4">Title</h2>
            <ul>
              <li>
                <Link to="/" className="text-base text-white">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-white mb-4">Title</h2>
            <ul>
              <li>
                <Link to="/" className="text-base text-white">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-white mb-4">Title</h2>
            <ul>
              <li>
                <Link to="/" className="text-base text-white">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
