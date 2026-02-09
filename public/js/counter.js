document.addEventListener('DOMContentLoaded', () => {
	var header = document.querySelector('#headermain');
    var body = document.querySelector('body');
    const metricsSection = document.getElementById('metrics');
    const metricNumbers = document.querySelectorAll('.metric-number');
    let hasAnimated = false;

    const animateNumber = (element, target, addPlus = false) => {
		let start = 0;
        const duration = 4000; // 2 seconds
        const frameRate = 60;
        const increment = target / (duration / (1000 / frameRate));

        const updateCount = () => {
            start += increment;
            let displayValue;

            if (start < target) {
                displayValue = Math.floor(start).toLocaleString();
                element.textContent = displayValue + (addPlus ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                displayValue = target.toLocaleString();
                element.textContent = displayValue + (addPlus ? '+' : '');
            }
        };
        requestAnimationFrame(updateCount);
    };

	// page scroll
    const scrollpage = function(e) {
        // add fixid class
        if (window.pageYOffset > 0) {
            header.classList.add('fixid');
        } else {
            header.classList.remove('fixid');
        }
    };
    const startAnimations = () => {
        metricNumbers.forEach(numberElement => {
            const target = parseInt(numberElement.getAttribute('data-target'));
            // Check if this is the "90000" metric item
            //debugger;
            const addPlus = numberElement.getAttribute('data-addPlus');
			//alert(addPlus);
			//const isBeneficiaries = true;//numberElement.closest('.metric-item').querySelector('.metric-label').textContent.includes('beneficiaries');
            animateNumber(numberElement, target, addPlus);
        });
    };

	//binds event ----------------------------
   window.onbeforeunload = function(e) {
            // allways force page to scroll top on refresh
            window.scrollTo(0, 0);
        };


       /* window.addEventListener("scroll", (e) => {
            // scrollspy
            //scrolspy();
            // scroll window 
            scrollpage();
            // counter 
			startAnimations();
            //counternumber();
        });*/
		
		
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                startAnimations();
                hasAnimated = true; // Ensure animation runs only once
                observer.unobserve(metricsSection); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    //observer.observe(metricsSection);
    // scrollspy
            //scrolspy();
            // scroll window 
            scrollpage();
            // counter 
			startAnimations();
			
    // Smooth scroll for navigation
    /*document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });*/
});