import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Button,
} from "@setu/components";
import { QrCode, Copy, Share2, Loader2 } from "lucide-react";

// interface Transaction {
// 	id: string;
// 	vpa: string;
// 	amount: string;
// 	note: string;
// 	timestamp: string;
// }

interface OutputCardProps {
	upiLink: string;
	onBack: () => void;
	isGenerating?: boolean;
}

export function OutputCard({
	upiLink,
	onBack,
	isGenerating = false,
}: OutputCardProps) {
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(upiLink);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const shareLink = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "UPI Payment Link",
					text: "Click to make payment",
					url: upiLink,
				});
			} catch (err) {
				console.error("Failed to share: ", err);
			}
		} else {
			// Fallback
			copyToClipboard();
		}
	};

	return (
		<Card className="shadow-md bg-white border-gray-200">
			<CardHeader>
				<CardTitle className="flex items-center space-x-2 font-bold">
					<QrCode className="h-6 w-6 text-setu" />
					<span>Generated Output</span>
				</CardTitle>
				<p className="mt-2 text-sm text-gray-600">
					Ready to copy or share
				</p>
			</CardHeader>

			<CardContent>
				{/* QR Code Section */}
				<div>
					{isGenerating ? (
						<div className="bg-white text-center mx-auto">
							<div className="h-24 w-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
								<Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
							</div>
							<p className="text-xs text-gray-500 mb-2">
								Generating QR Code...
							</p>
						</div>
					) : (
						<div className="bg-white text-center mx-auto">
							<QrCode className="h-24 w-24 mx-auto text-black mb-4" />
							<p className="text-xs text-gray-500 mb-2">
								QR Code generated successfully
							</p>
						</div>
					)}
				</div>

				{/* UPI Deep Link Section */}
				<div>
					<h3 className="text-sm font-medium text-gray-700">
						UPI Deep Link:
					</h3>
					<div className="bg-gray-50 p-3 rounded-lg border-gray-600">
						<p className="text-xs text-gray-600 break-all ">
							{upiLink}
						</p>
					</div>
				</div>

				{/* Transaction History Section */}
				{/* <div className="space-y-3">
					<h3 className="text-sm font-medium text-gray-700">
						Transaction History:
					</h3>
					{transactions.length > 0 ? (
						<div className="space-y-2">
							{transactions.map((transaction) => (
								<div
									key={transaction.id}
									className="bg-gray-50 p-3 rounded-lg border"
								>
									<div className="flex items-center justify-between text-xs">
										<div className="space-y-1">
											<div className="flex items-center space-x-2">
												<User className="h-3 w-3 text-gray-500" />
												<span className="font-medium">
													{transaction.vpa}
												</span>
											</div>
											<div className="flex items-center space-x-2">
												<CreditCard className="h-3 w-3 text-gray-500" />
												<span>
													Amount: ₹
													{transaction.amount}
												</span>
											</div>
											{transaction.note && (
												<div className="flex items-center space-x-2">
													<MessageSquare className="h-3 w-3 text-gray-500" />
													<span>
														Note: {transaction.note}
													</span>
												</div>
											)}
										</div>
										<div className="text-right text-gray-500">
											<div className="text-xs">
												{
													transaction.timestamp.split(
														", "
													)[1]
												}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-4 text-gray-500">
							<p className="text-sm">No transactions yet</p>
						</div>
					)}
				</div> */}

				{/* Action Buttons */}
				<div className="flex justify-center items-center py-2 mb-1 gap-2">
					<Button
						onClick={copyToClipboard}
						className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
						size="lg"
					>
						<Copy className="h-2 w-2 mr-2" />
						<span className="flex items-center justify-center mb-2">
							Copy Link
						</span>
					</Button>
					<Button
						onClick={shareLink}
						className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded-md"
						size="sm"
					>
						<Share2 className="h-2.5 w-2 mr-2.5" />
						<span className="flex items-center justify-center mb-2">
							Share
						</span>
					</Button>
				</div>

				{/* Back Button */}
				<Button
					onClick={onBack}
					className=" w-full bg-gray-600 hover:bg-gray-700 text-white cursor-pointer rounded-sm"
				>
					Back to Form
				</Button>
			</CardContent>
		</Card>
	);
}
