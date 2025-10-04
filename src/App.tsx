import "./App.css";
import { Header } from "./components/layout/Header";
import { PaymentForm } from "./components/forms/PaymentForm";
import { OutputCard } from "./components/ui/OutputCard";
import { usePaymentForm } from "./hooks/usePaymentForm";
import { QrCode } from "lucide-react";
import { CardHeader, CardTitle } from "@setu/components";
import { FeaturesBanner } from "./components/forms/FeaturesBanner";

function App() {
	const {
		formData,
		showOutput,
		upiLink,
		errors,
		updateField,
		generateUpiLink,
		goBackToForm,
		isGenerating,
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
							isGenerating={isGenerating}
						/>
					</div>

					{/* Right Panel - Generated Output or Placeholder */}
					<div>
						{!showOutput ? (
							<div className="rounded-xl bg-white shadow-md border border-gray-200 h-full">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2  font-bold">
										<QrCode className="h-6 w-6 text-setu" />
										<span>UPI QR Output</span>
									</CardTitle>
									<p className="mt-2 text-sm text-gray-600">
										Complete the form to generate UPI link
									</p>
								</CardHeader>
								<div className="h-24 w-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-8">
									<QrCode className="h-32 w-32 mx-auto text-gray-300 bg-white mb-2" />
								</div>
								<h3 className="flex flex-col justify-center items-center text-md font-sm text-gray-700 mb-6">
									Enter Details to Generate UPI Link
								</h3>
								<p className="text-center text-sm text-gray-400 leading-relaxed">
									Fill in the payment details and click
									<br />
									generate to create your UPI link
								</p>
							</div>
						) : (
							<OutputCard
								upiLink={upiLink}
								onBack={goBackToForm}
								isGenerating={isGenerating}
							/>
						)}
					</div>
				</div>

				{/* Full-width Features Banner */}
				<div className="mt-6">
					<FeaturesBanner />
				</div>
			</main>
		</div>
	);
}

export default App;
