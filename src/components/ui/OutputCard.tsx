import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Button,
} from "@setu/components";
import { QrCode, Copy, Share2 } from "lucide-react";

interface Transaction {
	id: string;
	vpa: string;
	amount: string;
	note: string;
	timestamp: string;
}

interface OutputCardProps {
	upiLink: string;
	transactions: Transaction[];
	onBack: () => void;
}

export function OutputCard({ upiLink, transactions, onBack }: OutputCardProps) {
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
				<CardTitle className="flex items-center space-x-2">
					<QrCode className="h-6 w-6 text-setu" />
					<span>Generated Output</span>
				</CardTitle>
				<p className="mt-2 text-sm text-gray-600">
					Ready to copy or share
				</p>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* QR Code Section */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-gray-700">
						QR Code
					</h3>
					<div className="bg-white p-8 rounded-lg border-2 border-gray-200 text-center">
						<QrCode className="h-32 w-32 mx-auto text-black mb-2" />
						<p className="text-xs text-gray-500">
							QR Code generated successfully
						</p>
					</div>
				</div>

				{/* UPI Deep Link Section */}
				<div className="space-y-3">
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
				<div className="flex space-x-3">
					<Button
						onClick={copyToClipboard}
						className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
						size="sm"
					>
						<Copy className="h-4 w-4 mr-2" />
						Copy Link
					</Button>
					<Button
						onClick={shareLink}
						className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded-md"
						size="sm"
					>
						<Share2 className="h-4 w-4 mr-2 flex items-center justify-center " />
						Share
					</Button>
				</div>

				{/* Back Button */}
				<Button
					onClick={onBack}
					className="w-full bg-gray-600 hover:bg-gray-700 text-white cursor-pointer rounded-md"
				>
					Back to Form
				</Button>
			</CardContent>
		</Card>
	);
}
