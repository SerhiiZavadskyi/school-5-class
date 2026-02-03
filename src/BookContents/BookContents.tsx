import { Link } from "react-router-dom";
//Book Contents
export default function BookContents() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<h1 className="text-4xl font-bold mb-8">Зміст</h1>
			<ul className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
				<li>
					<Link
						to="/fraction"
						className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
					>
						Дроби(Квест)
					</Link>
				</li>
				{/* Additional chapters can be added here */}
			</ul>
		</div>
	);
}
