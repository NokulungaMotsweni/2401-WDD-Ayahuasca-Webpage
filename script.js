function rotateImage() {
    const img = document.getElementById('rotatingImage'); // Get the image element
    img.style.transform = 'rotate(360deg)'; // Apply rotation transform
}

// Event listener to rotate the image when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(rotateImage, 1000); // Rotate image after a delay (e.g., 1 second)
});
