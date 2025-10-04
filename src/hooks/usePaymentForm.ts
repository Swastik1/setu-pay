import { useState } from "react";

interface Transaction {
	id: string;
	vpa: string;
	amount: string;
	note: string;
	timestamp: string;
}

interface PaymentFormData {
	vpa: string;
	amount: string;
	note: string;
}

export function usePaymentForm() {
	// Form state
	const [formData, setFormData] = useState<PaymentFormData>({
		vpa: "",
		amount: "",
		note: "",
	});

	// UI state
	const [showOutput, setShowOutput] = useState(false);
	const [upiLink, setUpiLink] = useState("");

	// Error states
	const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

	// Transaction history
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	// Validation function
	const validateForm = (): boolean => {
		const newErrors: Partial<PaymentFormData> = {};

		// VPA validation
		if (!formData.vpa.trim()) {
			newErrors.vpa = "VPA is required";
		} else if (!formData.vpa.includes("@")) {
			newErrors.vpa = "VPA must contain @ symbol";
		}

		// Amount validation
		if (!formData.amount.trim()) {
			newErrors.amount = "Amount is required";
		} else if (parseFloat(formData.amount) <= 0) {
			newErrors.amount = "Amount must be greater than 0";
		} else if (isNaN(parseFloat(formData.amount))) {
			newErrors.amount = "Amount must be a valid number";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Update form field
	const updateField = (field: keyof PaymentFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear error
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	// Generate UPI link
	const generateUpiLink = () => {
		if (!validateForm()) {
			return;
		}

		// Create UPI deep link (basic version - Todo: enhance this with Setu API)
		const upiParams = new URLSearchParams();
		upiParams.append("pa", formData.vpa.trim());
		upiParams.append("am", formData.amount.trim());
		if (formData.note.trim()) {
			upiParams.append("tn", formData.note.trim());
		}
		upiParams.append("cu", "INR");

		const generatedLink = `upi://pay?${upiParams.toString()}`;
		setUpiLink(generatedLink);

		// Add to transaction history
		const newTransaction: Transaction = {
			id: Date.now().toString(),
			vpa: formData.vpa.trim(),
			amount: formData.amount.trim(),
			note: formData.note.trim() || "No note",
			timestamp: new Date().toLocaleString(),
		};

		setTransactions((prev) => [newTransaction, ...prev]);
		setShowOutput(true);

		setFormData({ vpa: "", amount: "", note: "" });
		setErrors({});
	};

	// Reset form
	const resetForm = () => {
		setFormData({ vpa: "", amount: "", note: "" });
		setErrors({});
		setUpiLink("");
		setShowOutput(false);
	};

	// Go back to form
	const goBackToForm = () => {
		setShowOutput(false);
	};

	return {
		// Form data
		formData,

		// UI state
		showOutput,
		upiLink,

		// Errors
		errors,

		// Transactions
		transactions,

		// Actions
		updateField,
		generateUpiLink,
		resetForm,
		goBackToForm,
	};
}
