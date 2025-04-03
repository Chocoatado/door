document.addEventListener('DOMContentLoaded', function() {
    // Set initial states - everything hidden
    gsap.set("#heartfelt_message .animate-item, .animate-special", { 
        opacity: 0,
        y: 20
    });

    // Create floating hearts for the background
    createFloatingHearts();

    // Function to start animations when screen_three is shown
    function startHeartfeltAnimations() {
        // Only run animation if we're on STAGE 4 (final screen)
        if (window.STAGE !== 4) return;
        
        // Animate the decorative frame
        animateFrame();
        
        // Animate sparkles
        animateSparkles();
        
        const tl = gsap.timeline({
            delay: 0.8,
            onComplete: function() {
                // Start confetti after the animations complete
                startConfetti();
            }
        });

        // Animate the heading with a special text effect
        tl.to("#heartfelt_message h1", {
            duration: 1.5, 
            opacity: 1, 
            y: 0,
            ease: "back.out(1.7)",
            textShadow: "0 0 10px rgba(255, 127, 41, 0.5)"
        });

        // Staggered animation for each paragraph
        tl.to("#heartfelt_message .animate-item:not(h1)", {
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            stagger: 0.4,
            ease: "power2.out"
        }, "-=0.7");

        // Special animation for the signature
        tl.to(".signature", {
            duration: 1.2, 
            opacity: 1, 
            y: 0,
            scale: 1.05,
            ease: "elastic.out(1, 0.3)", 
            onComplete: function() {
                // Heart pulse animation that repeats
                gsap.to(".signature", {
                    scale: 1.03,
                    duration: 0.6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }, "-=0.2");
    }
    
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartColors = ['#ff7f29', '#ff9955', '#ffb380', '#ffccab'];
        
        // Create 25 floating hearts
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // Random properties
            const size = 10 + Math.random() * 20;
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];
            const left = Math.random() * 100;
            const animDuration = 15 + Math.random() * 30;
            const animDelay = Math.random() * 15;
            
            heart.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                bottom: -20px;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" fill="${encodeURIComponent(color)}"/></svg>');
                opacity: ${0.2 + Math.random() * 0.6};
                z-index: 0;
                animation: floatHeart ${animDuration}s linear ${animDelay}s infinite;
            `;
            
            container.appendChild(heart);
        }
        
        // Add the animation to the stylesheet
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes floatHeart {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-${window.innerHeight}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    function animateFrame() {
        // Animate the frame corners
        gsap.fromTo('.frame-corner', 
            { scale: 0, opacity: 0 }, 
            { 
                scale: 1, 
                opacity: 1, 
                duration: 1.5, 
                ease: "elastic.out(1, 0.3)",
                stagger: 0.1
            }
        );
        
        // Animate the frame edges
        gsap.fromTo('.frame-edge.top, .frame-edge.bottom', 
            { scaleX: 0, opacity: 0 }, 
            { 
                scaleX: 1, 
                opacity: 1, 
                duration: 1.2, 
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.5
            }
        );
        
        gsap.fromTo('.frame-edge.left, .frame-edge.right', 
            { scaleY: 0, opacity: 0 }, 
            { 
                scaleY: 1, 
                opacity: 1, 
                duration: 1.2, 
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.7
            }
        );
    }
    
    function animateSparkles() {
        gsap.to('.sparkle', {
            rotate: 360,
            scale: 1.2,
            opacity: 0.8,
            duration: 3,
            repeat: -1,
            ease: "sine.inOut",
            stagger: 0.5,
            yoyo: true
        });
    }

    // We need to add a mutation observer to detect when we enter STAGE 4
    // This is needed because the game.js changes STAGE variable to control the game flow
    let lastStage = window.STAGE || 0;
    setInterval(function() {
        if (window.STAGE === 4 && lastStage !== 4) {
            // We just entered STAGE 4
            startHeartfeltAnimations();
        }
        lastStage = window.STAGE || 0;
    }, 500);
});

// When screen_three becomes visible (after iHeartYou function in game.js)
window.addEventListener('heartfelt-ready', startHeartfeltAnimations);

// Let's add confetti for even more visual appeal
function startConfetti() {
    createConfetti();
}
