(function matrixEffect() {
    // Create the canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-1"; // Places it below all content but above the background
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Adjust canvas size dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Matrix characters
    const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const characters = matrix.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize; // Number of columns for the rain
    const drops = Array(Math.floor(columns)).fill(1); // One drop per column

    // Function to get colors based on theme
    function getColors() {
        const theme = document.body.getAttribute("theme");
        if (theme === "dark") {
            return {
                backgroundColor: "rgba(13, 2, 8, 0.1)", // Dark background
                textColor: "rgba(0, 255, 0, 0.2)", // Green text for dark theme
            };
        } else {
            return {
                backgroundColor: "rgba(253, 242, 248, 0.1)", // Light background
                textColor: "rgba(71, 68, 68, 0.12)", // Gray text for light theme
            };
        }
    }

    // Drawing function
    function draw() {
        const { backgroundColor, textColor } = getColors();

        // Semi-transparent background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the matrix text
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top after falling off-screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment Y position for drop
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    // Watch for changes in the `theme` attribute
    const observer = new MutationObserver(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on theme change
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["theme"] });
})();
