export function formatDateTimeShort(date: Date): string {
	const year = date.getFullYear().toString().padStart(2, '0'); // Add leading zero for 2-digit years
	const month = date.getMonth() + 1; // Months are zero-indexed
	const day = date.getDate();
	const hours = date.getHours() % 12 || 12; // Convert to 12-hour format (12 for midnight)
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const meridian = date.getHours() >= 12 ? 'PM' : 'AM';

	// Month abbreviation with apostrophe
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const monthName = monthNames[month - 1];

	// Format with placeholders and replace later
	const formatted = `${day}-${monthName}' ${year.slice(-2)}  •  ${hours.toString().padStart(2, '0')}.${minutes} ${meridian}`;

	// Replace placeholders with dashes and a dot
	return formatted.replace(/-/g, ' ').replace('.', '•'); // Replace hyphens with spaces, dot with separator
}
