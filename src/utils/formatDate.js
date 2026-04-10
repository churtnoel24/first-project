export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PH", {
        year: "numeric", month: "long", day: "numeric"
    });
    // Output: "April 2, 2025"
}