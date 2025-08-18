import { Zap } from "lucide-react";

interface HeaderProps {
	title?: string;
	subtitle?: string;
}

export function Header({
	title = "Setu UPI Explorer",
	subtitle = "Generate UPI deep links and QR codes with real-time validation. Perfect for payments, requests, and testing UPI integrations.",
}: HeaderProps) {
	return (
		<header>
			<div className="mx-auto max-w-4xl px-4 py-6">
				<div className="text-center">
					<div className="flex items-center justify-center space-x-2 mb-2">
						<Zap className="h-8 w-8 text-setu" />
						<h1 className="text-2xl font-bold bg-gradient-to-r from-setu to-teal-600 bg-clip-text text-transparent">
							{title}
						</h1>
					</div>
					<p className="text-gray-500 text-base font-normal">
						{subtitle}
					</p>
				</div>
			</div>
		</header>
	);
}
