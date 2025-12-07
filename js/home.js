document.addEventListener("DOMContentLoaded", () => {


    const bannerImage = document.getElementById("banner-trigger");
    const revealText = document.querySelector(".hidden-text.banner-text");

    // ===  banner is visible on screen ===
    const textObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible
                    revealText.classList.add("visible");
                } else {
                    // Remove visible
                    revealText.classList.remove("visible");
                }
            });
        },
        { threshold: 0.5 } 
    );

    textObserver.observe(bannerImage);

    
    // === Select the tree counter element and create a flag to avoid recounting ===
    const treeCounter = document.getElementById("tree-counter");
    let counted = false;


    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;

                    let count = 0;
                    const target = 10000;  // Final number to reach
                    const duration = 2000; // Duration 
                    const increment = Math.ceil(target / (duration / 20)); 

                    // ===  counter animation ===
                    const counterInterval = setInterval(() => {
                        count += increment;

                        if (count >= target) {
                            count = target;
                            clearInterval(counterInterval); // Stop animation when goal is reached
                        }

                        treeCounter.textContent = count.toLocaleString(); 
                    }, 20);
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the counter is visible
    );

    counterObserver.observe(treeCounter);
});
