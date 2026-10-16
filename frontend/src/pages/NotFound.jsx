import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-8xl font-black text-violet-500/20 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3 text-white">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </PageTransition>
  );
}
