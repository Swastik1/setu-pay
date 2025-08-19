import { useState } from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { PaymentForm } from "./components/forms/PaymentForm";
import { OutputCard } from "./components/ui/OutputCard";
import { usePaymentForm } from "./hooks/usePaymentForm";
import { QrCode } from "lucide-react";
import { CardHeader, CardTitle } from "@setu/components";

function App() {
	const {
		formData,
		showOutput,
		upiLink,
		errors,
		transactions,
		updateField,
		generateUpiLink,
		goBackToForm,
	} = usePaymentForm();

	return (
		<div className="min-h-screen bg-gray-100">
			<Header />

			<main className="mx-auto max-w-4xl px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Left Panel - Payment Details (Always visible) */}
					<div className="lg:col-span-1">
						<PaymentForm
							vpa={formData.vpa}
							amount={formData.amount}
							note={formData.note}
							vpaError={errors.vpa || ""}
							amountError={errors.amount || ""}
							onVpaChange={(value) => updateField("vpa", value)}
							onAmountChange={(value) =>
								updateField("amount", value)
							}
							onNoteChange={(value) => updateField("note", value)}
							onSubmit={generateUpiLink}
						/>
					</div>

					{/* Right Panel - Generated Output or Placeholder */}
					<div className="lg:col-span-1">
						{!showOutput ? (
							<div className="rounded-2xl bg-white p-6 shadow border border-gray-200 h-full">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2  font-medium">
										{/* <QrCode className="h-6 w-6 text-setu" /> */}
										<span>UPI QR Output</span>
									</CardTitle>
									<p className="mt-2 text-sm text-gray-600 space-y-6">
										Complete the form to generate UPI link
									</p>
								</CardHeader>
								<div className="h-24 w-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
									<QrCode className="h-32 w-32 mx-auto text-gray-300 bg-white mb-2" />
								</div>
								<h3 className="text-lg font-sm text-gray-700 mb-2">
									Enter Details to Generate UPI Link
								</h3>
								<p className="text-sm text-gray-400">
									Fill in the payment details and click
									generate to create your UPI link
								</p>
							</div>
						) : (
							<OutputCard
								upiLink={upiLink}
								transactions={transactions}
								onBack={goBackToForm}
							/>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
