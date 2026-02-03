import { Routes, Route } from "react-router-dom";
import Fraction from "./Fraction/Fraction";
import BookContents from "./BookContents/BookContents";

function App() {
	return (
		<Routes>
			<Route path="/" element={<BookContents />} />
			<Route path="/fraction" element={<Fraction />} />
		</Routes>
	);
}

export default App;
