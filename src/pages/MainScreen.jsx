import { useLocation } from "react-router-dom";

export default function MainScreen() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const theme = params.get("theme");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Theme: {theme || "Unknown"}
      </h1>
      <p className="text-lg text-gray-600">Quotes related to this theme will appear here.</p>
    </div>
  );
}
