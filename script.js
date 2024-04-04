document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    generateCard(name);
});
document.getElementById('playButton').addEventListener('click', function() {
    var bgMusic = document.getElementById('bgMusic');
    bgMusic.play();
  });

function generateCard(name) {
    var card = document.createElement('div');
    card.classList.add('card');

    var image = new Image();
    image.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Calculate the dimensions to fit the image within the card
        var maxWidth = 350; // Maximum width of the card
        var maxHeight = 250; // Maximum height of the card
        var aspectRatio = image.width / image.height;

        var newWidth = Math.min(maxWidth, image.width);
        var newHeight = newWidth / aspectRatio;

        // If the new height exceeds the maximum height, adjust the width to fit within the maximum height
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }

        // Set canvas dimensions to fit the resized image
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the resized image
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        ctx.fillStyle = 'white'; // Set text color
        ctx.font = '15px Arial'; // Set font size and style
        var textX = canvas.width / 2; // X-coordinate for centering text horizontally
        var textY = canvas.height / 1.3; // Y-coordinate for centering text vertically
        ctx.textAlign = 'center'; // Align text horizontally to center
        ctx.textBaseline = 'middle'; // Align text vertically to middle
        ctx.fillText(name, textX, textY); // Write user's name

        card.innerHTML = ''; // Clear previous card content
        card.appendChild(canvas); // Append canvas to card

        var cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = ''; // Clear previous card
        cardContainer.appendChild(card); // Append card to card container

        var downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'block'; // Display download button
        downloadButton.onclick = function() {
            downloadCanvas(canvas, 'eid_card.png'); // Call downloadCanvas function when button is clicked
        };
    };

    image.src = 'eid.png'; // Set the image source
}

function downloadCanvas(canvas, filename) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
