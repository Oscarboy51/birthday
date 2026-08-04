document.addEventListener("DOMContentLoaded", () => {
    const timeEl = document.getElementById("lockTime");
    const dateEl = document.getElementById("lockDate");
    const lockScreen = document.getElementById("lockScreen");
    const envelope = document.getElementById("envelope");
    const typed = document.getElementById("typedLetter");
    const deleteKey = document.getElementById("deleteKey");
    const dots = document.querySelectorAll(".dot");
    const music = document.getElementById("birthdayMusic");
    const beginBtn = document.getElementById("beginBtn");
    const surpriseBtn = document.getElementById("surpriseBtn");
    const finaleOverlay = document.getElementById("finaleOverlay");
    const closeFinaleBtn = document.getElementById("closeFinaleBtn");

    const PASSCODE = "582000";
    let entered = "";
    let current = 0;

    const birthdayLetter = `Dear Sis,

Happy Birthday ❤️

This may not be wrapped in fancy paper, but every click, every animation, and every line of code here was written thinking about you.

Thank you for always being my sister, my supporter, and someone I'll always be proud of.

I pray this new year brings you joy, good health, peace, success, and countless reasons to smile.

Never forget how loved you are.

Happy Birthday. Enjoy your special day. ❤️

— Oscar`;

    // Live Date & Time
    function updateClock() {
        if (!timeEl || !dateEl) return;
        const now = new Date();

        timeEl.textContent = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        dateEl.textContent = now.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Auto-Fading Profile Slider
    function startPhotoSlider() {
        const images = document.querySelectorAll("#photoSlider .profile-photo");
        if (images.length < 2) return;
        let idx = 0;

        setInterval(() => {
            images[idx].classList.remove("active");
            idx = (idx + 1) % images.length;
            images[idx].classList.add("active");
        }, 4000);
    }
    startPhotoSlider();

    // Floating Words Generator
    const memories = ["❤️ Beautiful", "😊 Amazing", "🌹 Blessed", "✨ Loved", "👑 Queen"];
    function spawnFloatingWord() {
        const card = document.createElement("div");
        card.className = "floating-card";
        card.textContent = memories[Math.floor(Math.random() * memories.length)];
        card.style.left = (15 + Math.random() * 70) + "vw";
        card.style.top = (20 + Math.random() * 60) + "vh";
        
        document.body.appendChild(card);

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(-20px)";
        }, 100);

        setTimeout(() => {
            card.style.opacity = "0";
            setTimeout(() => card.remove(), 1000);
        }, 3500);
    }

    // Typewriter
    function typeLetter() {
        if (current < birthdayLetter.length) {
            const char = birthdayLetter.charAt(current);
            typed.innerHTML += char === '\n' ? '<br>' : char;
            current++;
            setTimeout(typeLetter, 35);
        } else {
            const surpriseWrapper = document.getElementById("surpriseWrapper");
            if (surpriseWrapper) surpriseWrapper.style.display = "block";
        }
    }

    // Keypad Logic
    document.querySelectorAll(".key").forEach(key => {
        key.onclick = (e) => {
            e.preventDefault();

            if (key.classList.contains("empty") || entered.length >= 6) return;

            const digit = key.textContent.trim();
            if (!digit) return;

            entered += digit;

            if (dots[entered.length - 1]) {
                dots[entered.length - 1].classList.add("filled");
            }

            if (entered.length === 6) {
                setTimeout(checkPasscode, 150);
            }
        };
    });

    // Delete Button
    if (deleteKey) {
        deleteKey.onclick = (e) => {
            e.preventDefault();
            if (entered.length === 0) return;

            if (dots[entered.length - 1]) {
                dots[entered.length - 1].classList.remove("filled");
            }
            entered = entered.slice(0, -1);
        };
    }

    // Verify Passcode
    function checkPasscode() {
        if (entered === PASSCODE) {
            unlockAnimation();
        } else {
            const keypad = document.querySelector(".keypad");
            if (keypad) {
                keypad.classList.add("shake");
                setTimeout(() => keypad.classList.remove("shake"), 400);
            }
            entered = "";
            dots.forEach(dot => dot.classList.remove("filled"));
        }
    }

    // Unlock Animation
    function unlockAnimation() {
        const wallpaper = document.querySelector(".wallpaper img");
        if (wallpaper) {
            wallpaper.style.transition = "1.2s ease";
            wallpaper.style.filter = "blur(0px)";
            wallpaper.style.transform = "scale(1)";
        }

        if (lockScreen) lockScreen.classList.add("hide");

        const hero = document.querySelector(".hero");
        if (hero) hero.classList.add("show");

        // Audio Fade-In
        if (music) {
            music.volume = 0;
            music.play().catch(err => console.log("Audio playback blocked:", err));

            let vol = 0;
            const fadeInterval = setInterval(() => {
                vol += 0.05;
                if (vol >= 0.5) {
                    music.volume = 0.5;
                    clearInterval(fadeInterval);
                } else {
                    music.volume = vol;
                }
            }, 120);
        }

        // Start Floating Words
        setInterval(spawnFloatingWord, 8000);
    }

    // "Begin Your Birthday Journey" Button
    if (beginBtn) {
        beginBtn.addEventListener("click", () => {
            const letterSection = document.getElementById("letterSection");
            if (letterSection) {
                letterSection.classList.add("show");
                letterSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Envelope Tap Listener
    if (envelope) {
        envelope.onclick = () => {
            envelope.classList.add("open");
            if (current === 0) {
                setTimeout(typeLetter, 600);
            }
        };
    }

    // Grand Finale Trigger
    if (surpriseBtn && finaleOverlay) {
        surpriseBtn.onclick = () => {
            finaleOverlay.classList.add("active");
        };
    }

    if (closeFinaleBtn && finaleOverlay) {
        closeFinaleBtn.onclick = () => {
            finaleOverlay.classList.remove("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }
});