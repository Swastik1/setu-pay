import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Button,
} from "@setu/components";
import { QrCode, User, CreditCard, MessageSquare } from "lucide-react";
import { FormField } from "./FormField";

interface PaymentFormProps {
	vpa: string;
	amount: string;
	note: string;
	vpaError: string;
	amountError: string;
	onVpaChange: (value: string) => void;
	onAmountChange: (value: string) => void;
	onNoteChange: (value: string) => void;
	onSubmit: () => void;
}

export function PaymentForm({
	vpa,
	amount,
	note,
	vpaError,
	amountError,
	onVpaChange,
	onAmountChange,
	onNoteChange,
	onSubmit,
}: PaymentFormProps) {
	return (
		<Card className="shadow-md bg-white border-gray-200">
			<CardHeader>
				<CardTitle className="flex items-center space-x-2 font-bold">
					<QrCode className="h-6 w-6 text-setu" />
					<span>Payment Details</span>
				</CardTitle>
				<div className="flex flex-col ">
					<p className="mt-2 text-sm text-gray-600">
						Enter payment information to generate UPI link
					</p>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<FormField
					id="vpa"
					label="Virtual Payment Address (VPA)"
					icon={User}
					placeholder="username@bankname"
					type="text"
					value={vpa}
					onChange={onVpaChange}
					error={vpaError}
					required={true}
				/>

				<FormField
					id="amount"
					label="Amount"
					icon={CreditCard}
					placeholder="0.00"
					type="number"
					value={amount}
					onChange={onAmountChange}
					error={amountError}
					required={true}
					min={0}
					step={0.01}
				/>

				<FormField
					id="note"
					label="Transaction Note (Optional)"
					icon={MessageSquare}
					placeholder="Payment for services..."
					type="text"
					value={note}
					onChange={onNoteChange}
					maxLength={50}
				/>

				<Button
					className="w-full bg-setu hover:bg-setu/90 flex items-center justify-center cursor-pointer rounded-md px-4 py-2"
					onClick={onSubmit}
				>
					<QrCode className="h-4 w-4 mr-2 items-center bg-white" />
					<span className="text-white">
						Generate UPI Link & QR Code
					</span>
				</Button>
			</CardContent>
		</Card>
	);
}
