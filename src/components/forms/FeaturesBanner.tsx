import { CheckCircle, QrCode, Share2 } from "lucide-react";

export function FeaturesBanner() {
	return (
		<div className="bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 rounded-xl shadow-md p-6 border border-slate-50">
			<div className="flex flex-col md:flex-row justify-around items-start gap-6">
				{/* Real-time Validation */}
				<div className="flex flex-col items-center text-center flex-1">
					<div className="mb-3">
						<CheckCircle className="h-8 w-8 text-green-500" />
					</div>
					<h3 className="font-semibold text-gray-800 text-md mb-1">
						Real-time Validation
					</h3>
					<p className="text-sm text-gray-500 leading-relaxed">
						Instant feedback on VPA format and
						<br />
						amount validation
					</p>
				</div>

				{/* QR Code Generation */}
				<div className="flex flex-col items-center text-center flex-1">
					<div className="mb-3">
						<QrCode className="h-8 w-8 text-blue-600" />
					</div>
					<h3 className="font-semibold text-gray-800 text-md mb-1">
						QR Code Generation
					</h3>
					<p className="text-sm text-gray-500 leading-relaxed">
						High-quality QR codes for easy
						<br />
						mobile scanning
					</p>
				</div>

				{/* Native Sharing */}
				<div className="flex flex-col items-center text-center flex-1">
					<div className="mb-3">
						<Share2 className="h-8 w-8 text-green-500" />
					</div>
					<h3 className="font-semibold text-gray-800 text-md mb-1">
						Native Sharing
					</h3>
					<p className="text-sm text-gray-500 leading-relaxed">
						Web Share API integration with
						<br />
						clipboard fallback
					</p>
				</div>
			</div>
		</div>
	);
}
