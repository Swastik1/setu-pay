import { Input } from "@setu/components";
import { type LucideIcon, Info } from "lucide-react";

interface FormFieldProps {
	id: string;
	label: string;
	icon: LucideIcon;
	placeholder: string;
	type: "text" | "number" | "email";
	value: string;
	onChange: (value: string) => void;
	error?: string;
	required?: boolean;
	maxLength?: number;
	min?: number;
	step?: number;
}

export function FormField({
	id,
	label,
	icon: Icon,
	placeholder,
	type,
	value,
	onChange,
	error,
	required,
	maxLength,
	min,
	step,
}: FormFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="flex items-center space-x-2 text-sm font-medium text-gray-700"
			>
				<Icon className="h-4 w-4" />
				<span>
					{label}
					{required && <span className="text-black-500">*</span>}
				</span>
			</label>
			<Input
				id={id}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`bg-gray-50 border-gray-100 ${
					error ? "border-red-500" : ""
				}`}
				required={required}
				maxLength={maxLength}
				min={min}
				step={step}
			/>
			{error && (
				<div className="flex items-center space-x-2 text-sm text-red-500">
					<Info className="h-4 w-4" />
					<span>{error}</span>
				</div>
			)}

			{maxLength && (
				<p className="text-gray-500 text-xs mt-1">
					{value.length}/{maxLength}
				</p>
			)}
		</div>
	);
}
