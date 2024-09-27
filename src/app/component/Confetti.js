// src/Confetti.js
import React, { useEffect } from 'react';

const Confetti = () => {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const maxConfetti = 150;
    const particles = [];
    const possibleColors = [
        "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue",
        "LightBlue", "Gold", "Violet", "PaleGreen", "SteelBlue",
        "SandyBrown", "Chocolate", "Crimson"
    ];

    const randomFromTo = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);

    const confettiParticle = function() {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = randomFromTo(11, 33);
        this.d = Math.random() * maxConfetti + 11;
        this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function(context) {
            context.beginPath();
            context.lineWidth = this.r / 2;
            context.strokeStyle = this.color;
            context.moveTo(this.x + this.tilt + this.r / 3, this.y);
            context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
            return context.stroke();
        };
    };

    const Draw = (context) => {
        context.clearRect(0, 0, W, H);

        for (let i = 0; i < maxConfetti; i++) {
            const particle = particles[i];
            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) {
                particle.draw(context);
            }

            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                particle.x = Math.random() * W;
                particle.y = -30;
                particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
        }

        requestAnimationFrame(() => Draw(context));
    };

    useEffect(() => {
        const canvas = document.getElementById("confettiCanvas");
        const context = canvas.getContext("2d");

        // Set canvas size
        canvas.width = W;
        canvas.height = H;

        // Initialize particles
        for (let i = 0; i < maxConfetti; i++) {
            particles.push(new confettiParticle());
        }

        // Draw the confetti
        Draw(context);

        // Handle window resize
        const handleResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        };

        window.addEventListener("resize", handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas id="confettiCanvas" style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default Confetti;
