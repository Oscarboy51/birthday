document.addEventListener("DOMContentLoaded", () => {
    const timeEl = document.getElementById("lockTime");
    const dateEl = document.getElementById("lockDate");
    const lockScreen = document.getElementById("lockScreen");
    const envelope = document.getElementById("envelope");
    const typed = document.getElementById("typedLetter");
    const deleteKey = document.getElementById("deleteKey");
    const dots = document.querySelectorAll(".dot");
    const music = document.getElementById("birthdayMusic");

    const PASSCODE = "582000";
    let entered = "";
    let current = 0;

    const birthdayLetter = `Dear Sis,

Happy Birthday! ❤️

I know this isn't a gift wrapped in expensive paper, but every line of code here was written with love.

You deserve happiness, peace, good health, and every beautiful opportunity life has to offer.

Thank you for being an incredible sister.

No matter where life takes us, always remember that you'll never walk alone. You'll always have me.

I love you more than words can explain.

Happy Birthday ❤️

— Your Brother`;

    // Clock Logic
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

    // Typewriter
    function typeLetter() {
        if (current < birthdayLetter.length) {
            const char = birthdayLetter.charAt(current);
            typed.innerHTML += char === '\n' ? '<br>' : char;
            current++;
            setTimeout(typeLetter, 35);
        }
    }

    // Keypad Logic using direct onclick (Prevents double-clicking bugs)
    document.querySelectorAll(".key").forEach(key => {
        key.onclick = (e) => {
            e.preventDefault();
            
            if (key.classList.contains("empty") || entered.length >= 6) return;

            const digit = key.textContent.trim();
            if (!digit) return;

            entered += digit;

            // Fill exact dot index
            if (dots[entered.length - 1]) {
                dots[entered.length - 1].classList.add("filled");
            }

            // Start music on first tap so mobile browsers allow it
            if (music && music.paused) {
                music.play().catch(() => {});
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

    // Check Passcode
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

    // Unlock
    function unlockAnimation() {
        if (lockScreen) lockScreen.classList.add("hide");

        const hero = document.querySelector(".hero");
        if (hero) hero.classList.add("show");
    }

    // Envelope Tap
    if (envelope) {
        envelope.onclick = () => {
            envelope.classList.add("open");
            if (current === 0) {
                setTimeout(typeLetter, 600);
            }
        };
    }
});