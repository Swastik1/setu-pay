// Setu Base URL
const SETU_API_URL = "https://uat.api.setu.co/v2";

// Types

interface AuthTokenResponse {
	clientId: string;
	secret: string;
}

interface AuthTokenResponse {
	data?: {
		expiresIn: number;
		token?: string;
	};
	status: number;
	success: boolean;
}

interface CreatePaymentLinkRequest {
	amount: {
		currencyCode: string;
		value: number;
	};
	amountExactness: string;
	billerId: string;
	expiryDate: string;
	name: string;
	transactionNote?: string;
	settlement: {
		parts: Array<{
			account: {
				id: string;
				ifsc: string;
			};
			remarks: string;
			split: {
				unit: string;
				value: number;
			};
			primaryAccount: {
				id: string;
				ifsc: string;
			};
		}>;
	};
}

interface CreatePaymentLinkResponse {
	status: number;
	success: boolean;
	data?: {
		campaignId: string;
		name: string;
		paymentLink: {
			shortURL: string;
			upiId: string;
			upiLink: string;
		};
		platformBillID: string;
	};
}

interface GetPaymentStatusResponse {
	status: number;
	success: boolean;
	data?: {
		additionalInfo?: object;
		amountPaid?: {
			// Amount to be refunded details
		};
		billerBillID: string;
		campaignID: string;
		createdAt: string;
		cardBIN?: string; // First 6 characters of card number (Rupay only)
		paymentMode?: string; // Payment mode (Rupay only)
		expiresAt: string;
		name: string;
		payerVpa?: string;
		paymentLink: {
			shortURL: string;
			upiID: string;
			upiLink: string; // UPI deep link
		};
		platformBillID: string; // Unique identifier of bill in Setu
		receipt?: object;
		status:
			| "BILL_CREATED"
			| "PAYMENT_SUCCESSFUL"
			| "PAYMENT_FAILED"
			| "CREDIT_RECEIVED"
			| "SETTLEMENT_SUCCESSFUL"
			| "SETTLEMENT_FAILED"
			| "BILL_EXPIRED";
		transactionNote?: string;
	};
}

/**
 * Get authentication token from setu
 * @param clientId - Setu client ID
 * @param secret - Setu secret
 * @returns Authentication token
 */

export async function getAuthToken(
	clientID: string,
	secret: string
): Promise<string> {
	try {
		const response = await fetch(`${SETU_API_URL}/auth/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				clientID,
				secret,
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Authentication failed! status: ${response.status}`
			);
		}

		const result: AuthTokenResponse = await response.json();

		if (!result.success) {
			throw new Error("Authentication failed: " + result.status);
		}

		return String(result.data?.expiresIn || result.data?.token || "");
	} catch (error) {
		console.error("Failed to get auth token:", error);
		throw error;
	}
}
