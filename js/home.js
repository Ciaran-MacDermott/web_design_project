document.addEventListener("DOMContentLoaded", () => {

    const bannerImage = document.getElementById("banner-trigger");
    const revealText = document.querySelector(".hidden-text.banner-text");

    const textObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealText.classList.add("visible");
                } else {
                    revealText.classList.remove("visible");
                }
            });
        },
        { threshold: 0.5 } 
    );

    textObserver.observe(bannerImage);

    
    const treeCounter = document.getElementById("tree-counter");
    let counted = false;

    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    let count = 0;
                    const target = 10000; 
                    const duration = 2000; 
                    const increment = Math.ceil(target / (duration / 20));

                    const counterInterval = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            count = target;
                            clearInterval(counterInterval);
                        }
                        treeCounter.textContent = count.toLocaleString();
                    }, 20);
                }
            });
        },
        { threshold: 0.5 } 
    );

    counterObserver.observe(treeCounter);
});
