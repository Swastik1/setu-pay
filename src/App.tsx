import { useState } from "react";
import "./App.css";
import {
	Input,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Button,
} from "@setu/components";
import {
	Zap,
	QrCode,
	CreditCard,
	MessageSquare,
	User,
	Clock,
} from "lucide-react";

function App() {
	const [vpa, setVpa] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [showOutput, setShowOutput] = useState(false);

	return (
		<div className="min-h-screen bg-gray-100">
			<header>
				<div className="mx-auto max-w-4xl px-4 py-6">
					<div className="text-center">
						<div className="flex items-center justify-center space-x-2 mb-2">
							<Zap className="h-8 w-8 text-setu" />
							<h1 className="text-2xl font-bold bg-gradient-to-r from-setu to-teal-600 bg-clip-text text-transparent">
								Setu UPI Explorer
							</h1>
						</div>
						<p className="text-gray-400 text-base font-normal">
							Generate UPI deep links and QR codes with real-time
							validation. Perfect for payments, requests, and
							testing UPI integrations.
						</p>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-3xl max-h-2xl px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Payment Details Card */}
					<Card className="shadow-md bg-white border-gray-200">
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<QrCode className="h-6 w-6 text-setu" />
								<span>Payment Details</span>
							</CardTitle>
							<p className="flex-col  mt-2 text-sm text-gray-600">
								Enter payment information to generate UPI link
							</p>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="vpa"
									className="flex items-center space-x-2 text-sm font-medium text-gray-700"
								>
									<User className="h-4 w-4" />
									<span>Virtual Payment Address (VPA)*</span>
								</label>
								<Input
									id="vpa"
									placeholder="username@bankname"
									type="text"
									required={true}
									value={vpa}
									onChange={(e) => setVpa(e.target.value)}
									className="bg-gray-50 border-gray-100"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="amount"
									className="flex items-center space-x-2 text-sm font-medium text-gray-700"
								>
									<CreditCard className="h-4 w-4" />
									<span>Amount*</span>
								</label>
								<Input
									id="amount"
									placeholder="0.00"
									className="bg-gray-50 border-gray-100"
									required={true}
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
									className="flex items-center space-x-2 text-sm font-medium text-gray-700"
								>
									<MessageSquare className="h-4 w-4 " />
									<span>Transaction Note (Optional)</span>
								</label>
								<Input
									id="note"
									placeholder="Payment for services..."
									className="bg-gray-50 border-gray-100"
									type="text"
									maxLength={50}
									value={note}
									onChange={(e) => setNote(e.target.value)}
								/>
								<div className="text-right text-xs text-gray-500">
									{note.length}/50
								</div>
							</div>

							<Button
								className="w-full bg-setu hover:bg-setu/90 flex items-center justify-center cursor-pointer"
								onClick={() => setShowOutput(true)}
							>
								<QrCode className="h-4 w-4 mr-2 items-center bg-white" />
								<span className="text-white ">
									Generate UPI Link & QR Code
								</span>
							</Button>
						</CardContent>
					</Card>

					{/* Generated Output Card - We'll build this next */}
					<Card className="shadow-md bg-white border-gray-200">
						<CardHeader>
							<CardTitle>Generated Output</CardTitle>
							<p className="flex-col mt-2 text-sm text-gray-600">
								Complete the form to generate UPI link
							</p>
						</CardHeader>
						<CardContent className="text-center py-12">
							<QrCode className="h-24 w-24 mx-auto text-gray-300 mb-4" />
							<p className="text-gray-500">
								Enter VPA to generate UPI link
							</p>
							<p className="text-xs text-gray-400 mt-2">
								QR code and deep link will appear here
							</p>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}

export default App;
