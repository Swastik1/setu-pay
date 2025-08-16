import { useState } from "react";
import "./App.css";
import { Input } from "@setu/components";

function App() {
	const [vpa, setVpa] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [showOutput, setShowOutput] = useState(false);

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow-sm">
				<div className="mx-auto max-w-2xl px-4 py-4">
					<h1 className="text-center text-xl font-semibold text-gray-900">
						Setu Pay
					</h1>
				</div>
			</header>

			<main className="mx-auto max-w-2xl px-4 py-8">
				<div className="rounded-2xl bg-white p-6 shadow">
					<h2 className="text-lg font-medium text-gray-900 mb-4">
						Payment Details
					</h2>
					<div className="space-y-2">
						<label
							htmlFor="vpa"
							className="block text-sm font-medium text-gray-700"
						>
							Virtual Payment Address (VPA)*
						</label>
						<Input
							id="vpa"
							className="rounded-md border-gray-300"
							placeholder="user@paytm"
							type="text"
							value={vpa}
							onChange={(e) => setVpa(e.target.value)}
						/>
					</div>

					<div className="space-y-2 py-4">
						<label
							htmlFor="amount"
							className="block text-sm font-medium text-gray-700"
						>
							Amount*
						</label>
						<Input
							id="amount"
							className="rounded-md border-gray-300"
							placeholder="Rs. 100"
							type="number"
							min="0"
							step="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="note"
							className="block text-sm font-medium text-gray-700"
						>
							Payment Note (Optional)
						</label>
						<Input
							id="note"
							className="rounded-md border-gray-300"
							placeholder="Coffee payment"
							type="text"
							maxLength={100}
							value={note}
							onChange={(e) => setNote(e.target.value)}
						/>
					</div>

					<div className="pt-4">
						<button
							className="w-full bg-setu hover:bg-setu/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
							onClick={() => setShowOutput(true)}
						>
							Generate UPI Link & QR Code
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
