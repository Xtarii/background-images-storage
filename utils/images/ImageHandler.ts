/**
 * Converts Image blob to Base64 data
 *
 * @param blob Image Blob Data
 * @returns Image as Base64 string
 */
export async function convertBlobToBase64(blob: Blob) : Promise<string> {
    const reader = new FileReader();

    let result = '';
    reader.readAsDataURL(blob);

    // Fixes Result Data
    await new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
            result = reader.result?.toString().split(',')[1] || '';
            resolve();
        };
        reader.onerror = reject;
    });
    return `data:${blob.type};base64,${result}`; // Fully converted Base64 Image
}
