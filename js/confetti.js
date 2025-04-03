function createConfetti() {
    const confettiContainer = document.createElement('canvas');
    confettiContainer.id = 'confetti-canvas';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);

    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    // Colors for confetti
    const colors = ['#ff7f29', '#ff9955', '#ffb380', '#ffccab', '#ffe6d5', '#ff6666', '#ffb3b3'];
    
    // Confetti pieces
    const confetti = [];
    const confettiCount = 150;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    
    // Shapes
    const shapes = ['circle', 'square', 'triangle', 'heart'];
    
    // Initialize confetti
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(Math.random() * colors.length)],
            dimensions: {
                x: Math.random() * 10 + 5,
                y: Math.random() * 10 + 5,
            },
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
            },
            rotation: Math.random() * 2 * Math.PI,
            scale: {
                x: 1,
                y: 1,
            },
            velocity: {
                x: Math.random() * 6 - 3,
                y: Math.random() * 3 + 2,
            },
            shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
    }
    
    // Update confetti position
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((confetto, index) => {
            // Apply gravity and drag
            confetto.velocity.x -= confetto.velocity.x * drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
            
            // Update position based on velocity
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;
            
            // Rotation
            confetto.rotation += 0.01;
            
            // Draw confetti
            ctx.save();
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);
            
            // Draw based on shape
            ctx.fillStyle = confetto.color;
            
            if (confetto.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, confetto.dimensions.x / 2, 0, 2 * Math.PI);
                ctx.fill();
            } else if (confetto.shape === 'square') {
                ctx.fillRect(-confetto.dimensions.x / 2, -confetto.dimensions.y / 2, 
                             confetto.dimensions.x, confetto.dimensions.y);
            } else if (confetto.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(-confetto.dimensions.x / 2, confetto.dimensions.y / 2);
                ctx.lineTo(confetto.dimensions.x / 2, confetto.dimensions.y / 2);
                ctx.lineTo(0, -confetto.dimensions.y / 2);
                ctx.closePath();
                ctx.fill();
            } else if (confetto.shape === 'heart') {
                // Heart shape
                const size = confetto.dimensions.x;
                ctx.beginPath();
                ctx.moveTo(0, size / 4);
                ctx.bezierCurveTo(size / 4, -size / 4, size, -size / 4, 0, -size);
                ctx.bezierCurveTo(-size, -size / 4, -size / 4, -size / 4, 0, size / 4);
                ctx.fill();
            }
            
            ctx.restore();
            
            // Reset if off screen
            if (confetto.position.y >= canvas.height) {
                confetti[index].position.y = -confetto.dimensions.y;
                confetti[index].position.x = Math.random() * canvas.width;
                confetti[index].velocity.y = Math.random() * 2 + 2;
            }
        });
        
        // Continue animation
        window.requestAnimationFrame(update);
    }
    
    // Start animation
    window.requestAnimationFrame(update);
}

// Listen for the game to reach the final stage
function checkGameStage() {
    if (window.STAGE === 4) {
        // Game has reached the final stage, but wait a moment for screen transition
        setTimeout(createConfetti, 7500); // Slightly after the screen transition in iHeartYou function
    }
}

// Check periodically if we've reached STAGE 4
if (typeof window.STAGE === 'undefined') {
    window.STAGE = 0;
}

// Game.js will handle triggering the animations when ready
