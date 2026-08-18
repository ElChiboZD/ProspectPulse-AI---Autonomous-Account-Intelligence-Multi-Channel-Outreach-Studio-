document.addEventListener("DOMContentLoaded", () => {
    // Inject floating button and modal
    const html = `
        <button id="beta-feedback-btn" class="beta-feedback-btn">
            💬 Beta Feedback
        </button>

        <div id="beta-feedback-modal" class="beta-modal" style="display: none;">
            <div class="beta-modal-content">
                <span class="beta-close">&times;</span>
                <h2>Beta Feedback</h2>
                <div class="beta-form-group">
                    <label>Rating:</label>
                    <div class="beta-stars">
                        <span data-value="1">★</span>
                        <span data-value="2">★</span>
                        <span data-value="3">★</span>
                        <span data-value="4">★</span>
                        <span data-value="5">★</span>
                    </div>
                </div>
                <div class="beta-form-group">
                    <label>Category:</label>
                    <div class="beta-pills">
                        <span class="beta-pill active" data-type="praise">Praise</span>
                        <span class="beta-pill" data-type="feature_request">Feature Request</span>
                        <span class="beta-pill" data-type="bug">Bug</span>
                    </div>
                </div>
                <div class="beta-form-group">
                    <label>Message:</label>
                    <textarea id="beta-message" placeholder="What's on your mind?"></textarea>
                </div>
                <div class="beta-form-group">
                    <button id="beta-submit" class="beta-submit-btn">Submit Feedback</button>
                </div>
                <div id="beta-toast" class="beta-toast" style="display: none;">
                    🎉 Thank you for your feedback!
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    const btn = document.getElementById("beta-feedback-btn");
    const modal = document.getElementById("beta-feedback-modal");
    const closeBtn = modal.querySelector(".beta-close");
    const stars = modal.querySelectorAll(".beta-stars span");
    const pills = modal.querySelectorAll(".beta-pill");
    const submitBtn = document.getElementById("beta-submit");
    const textarea = document.getElementById("beta-message");
    const toast = document.getElementById("beta-toast");

    let currentRating = 5;
    let currentType = "praise";

    function updateStars() {
        stars.forEach(s => {
            if (parseInt(s.getAttribute("data-value")) <= currentRating) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }
        });
    }
    updateStars();

    btn.addEventListener("click", () => {
        modal.style.display = "flex";
        textarea.value = "";
        toast.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    stars.forEach(s => {
        s.addEventListener("click", () => {
            currentRating = parseInt(s.getAttribute("data-value"));
            updateStars();
        });
    });

    pills.forEach(p => {
        p.addEventListener("click", () => {
            pills.forEach(pill => pill.classList.remove("active"));
            p.classList.add("active");
            currentType = p.getAttribute("data-type");
        });
    });

    submitBtn.addEventListener("click", async () => {
        const message = textarea.value.trim();
        if (!message) {
            alert("Please enter a message!");
            return;
        }

        const diagnostic_info = {
            os: navigator.platform,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
            preset: window.CURRENT_PRESET || "generic"
        };

        const email = window.USER_EMAIL || "beta_tester@example.com";

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    feedback_type: currentType,
                    rating: currentRating,
                    message,
                    diagnostic_info
                })
            });

            if (response.ok) {
                toast.style.display = "block";
                setTimeout(() => {
                    modal.style.display = "none";
                }, 2000);
            } else {
                alert("Error submitting feedback.");
            }
        } catch (e) {
            alert("Error submitting feedback: " + e.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Feedback";
        }
    });
});
