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

/**
 * Create a new payment link using Setu API
 * @param data - Payment link creation data
 * @param accessToken - Valid access token from getAuthToken
 * @param productInstanceId - Your Setu product instance ID
 * @returns Created payment link response
 */

export async function createPaymentLink(
	data: {
		vpa: string;
		amount: number;
		note: string;
		billerBillID: string;
		primaryAccountId: string;
		primaryAccountIFSC: string;
	},
	accessToken: string,
	productInstanceId: string
): Promise<CreatePaymentLinkResponse> {
	try {
		const expiryDate = new Date(Date.now() + 60 + 60 * 1000).toISOString();
		const response = await fetch(`${SETU_API_URL}/payment-links`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
				"X-Setu-Product-Instance-ID": productInstanceId,
			},
			body: JSON.stringify({
				amount: {
					currencyCode: "INR",
					value: Math.round(data.amount * 100),
				},
				amountExactness: "EXACT",
				billerBillID: data.billerBillID,
				expiryDate: expiryDate,
				name: data.note || "Payment",
				transactionNote: data.note,
				settlement: {
					parts: [
						{
							account: {
								id: data.primaryAccountId,
								ifsc: data.primaryAccountIFSC,
							},
							remarks: "Payment settlement",
							split: {
								unit: "INR",
								value: Math.round(data.amount * 100),
							},
						},
					],
					primaryAccount: {
						id: data.primaryAccountId,
						ifsc: data.primaryAccountIFSC,
					},
				},
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to create payment link! status: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Failed to create payment link:", error);
		throw error;
	}
}

/**
 * Check payment status using Setu API
 * @param platformBillId - Platform bill ID from createPaymentLink response
 * @param accessToken - Valid access token from getAuthToken
 * @param productInstanceId - Your Setu product instance ID
 * @returns Payment status response
 */
export async function getPaymentStatus(
	platformBillId: string,
	accessToken: string,
	productInstanceId: string
): Promise<GetPaymentStatusResponse> {
	try {
		const response = await fetch(
			`${SETU_API_BASE}/payment-links/${platformBillId}`,
			{
				method: "GET",
				headers: {
					Authorization: accessToken,
					"X-Setu-Product-Instance-ID": productInstanceId,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to check payment status! status: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Failed to check payment status:", error);
		throw error;
	}
}

// ===== HELPER FUNCTIONS =====

/**
 * Format amount from paise to rupees with ₹ symbol
 * @param amount - Amount in paise
 * @returns Formatted amount string
 */
export function formatAmount(amount: number): string {
	return `₹${(amount / 100).toFixed(2)}`;
}

/**
 * Generate unique biller bill ID
 * @returns Unique bill identifier
 */
export function generateBillerBillID(): string {
	return `BILL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate and truncate transaction note to 80 characters
 * @param note - Transaction note
 * @returns Validated note or null if empty
 */
export function validateTransactionNote(note: string): string | null {
	if (!note) return null;
	if (note.length > 80) {
		return note.substring(0, 80);
	}
	return note;
}

/**
 * Check if payment status indicates success
 * @param status - Payment status from API
 * @returns True if payment is successful
 */
export function isPaymentSuccessful(status: string): boolean {
	return status === "PAYMENT_SUCCESSFUL" || status === "CREDIT_RECEIVED";
}

/**
 * Check if payment status indicates failure
 * @param status - Payment status from API
 * @returns True if payment failed
 */
export function isPaymentFailed(status: string): boolean {
	return status === "PAYMENT_FAILED" || status === "SETTLEMENT_FAILED";
}

/**
 * Check if bill has expired
 * @param status - Payment status from API
 * @returns True if bill expired
 */
export function isBillExpired(status: string): boolean {
	return status === "BILL_EXPIRED";
}
