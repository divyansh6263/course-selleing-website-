document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATABASE (You should already have this) ---
    const allCoursesData = {
        '1': { id: 1, title: 'The Complete 2024 Web Development Bootcamp', subtitle: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!', author: 'Dr. Angela Yu', price: 19.99, rating: 4.8, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg', lastUpdated: '08/2023', curriculum: ['Introduction to Web Dev', 'HTML 5 Deep Dive', 'Advanced CSS and Sass', 'JavaScript for Beginners', 'The Document Object Model (DOM)', 'Advanced JavaScript', 'React + Redux', 'Node.js and Express', 'APIs and REST', 'Databases and MongoDB'] },
        '2': { id: 2, title: 'JavaScript: The Advanced Concepts', subtitle: 'Learn modern advanced JavaScript practices and be in the top 10% of JavaScript developers.', author: 'Andrei Neagoie', price: 24.99, rating: 4.7, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg', lastUpdated: '11/2023', curriculum: ['JavaScript Engine and Runtime', 'Advanced Functions', 'Closures and Scope', 'Asynchronous JavaScript', 'Promises and Async/Await', 'Modules in JavaScript', 'Error Handling'] },
        '3': { id: 3, title: 'React - The Complete Guide (incl Hooks, React Router)', subtitle: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!', author: 'Maximilian Schwarzmüller', price: 29.99, rating: 4.9, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg', lastUpdated: '12/2023', curriculum: ['Introduction to React', 'Components & Props', 'State and Lifecycle', 'Handling Events', 'Conditional Rendering', 'React Hooks (useState, useEffect)', 'React Router', 'Introduction to Redux'] },
        '4': { id: 4, title: 'Modern CSS with Flexbox, Grid and Animations', subtitle: 'Learn and master modern CSS, including Flexbox, CSS Grid, responsive design, and so much more.', author: 'Jonas Schmedtmann', price: 14.99, rating: 4.7, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1026604_790b_2.jpg', lastUpdated: '06/2023', curriculum: ['CSS Fundamentals', 'Box Model Deep Dive', 'Responsive Design Principles', 'Mastering Flexbox', 'Unlocking CSS Grid', 'Cool CSS Animations & Transitions', 'Building a Real-World Project'] },
        '5': { id: 5, title: 'Node.js, Express, MongoDB & More', subtitle: 'Master Node by building a real-world RESTful API and web app (with authentication, Node.js security, payments & more).', author: 'Jonas Schmedtmann', price: 29.99, rating: 4.8, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg', lastUpdated: '10/2023', curriculum: ['Introduction to Node.js', 'NPM and Modules', 'Asynchronous Node.js', 'Building a RESTful API with Express', 'Connecting to MongoDB', 'Authentication & Security', 'Server-Side Rendering'] },
        '6': { id: 6, title: 'The Ultimate Guide to Digital Marketing', subtitle: 'Master Digital Marketing: SEO, Social Media Marketing, Advertising, Email Marketing, and more!', author: 'Phil Ebiner', price: 19.99, rating: 4.6, thumbnail: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg', lastUpdated: '09/2023', curriculum: ['Marketing Fundamentals', 'Search Engine Optimization (SEO)', 'Social Media Strategy', 'Facebook & Instagram Ads', 'Google Ads (PPC)', 'Email Marketing Automation', 'Analyzing Your Results'] }
    };

    // --- NEW: Functions to manage purchases using localStorage ---
    
    /**
     * Checks if a course is owned by looking in localStorage.
     * @param {string} courseId - The ID of the course.
     * @returns {boolean}
     */
    function isCourseOwned(courseId) {
        const ownedCourses = JSON.parse(localStorage.getItem('ownedCourses')) || [];
        return ownedCourses.includes(courseId);
    }

    /**
     * Simulates purchasing a course and saves it to localStorage.
     * @param {string} courseId - The ID of the course.
     */
    function purchaseCourse(courseId) {
        let ownedCourses = JSON.parse(localStorage.getItem('ownedCourses')) || [];
        if (!ownedCourses.includes(courseId)) {
            ownedCourses.push(courseId);
            localStorage.setItem('ownedCourses', JSON.stringify(ownedCourses));
        }
    }

    // --- The rest of the file is updated to use these functions ---

    function getCourseIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    async function fetchCourseDetails(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const course = allCoursesData[id];
                resolve(course);
            }, 500); // Faster load time for detail page
        });
    }

    /**
     * Renders the course details and dynamically changes the buy button.
     * @param {object} course - The course data object.
     */
    function displayCourseDetails(course) {
        const contentArea = document.getElementById('course-detail-content');
        if (!course) {
            contentArea.innerHTML = '<h2>Course not found.</h2>';
            return;
        }
        
        document.title = `${course.title} | SkillUp`;
        const curriculumHtml = course.curriculum.map(item => `<li class="curriculum-item">${item}</li>`).join('');
        
        // --- NEW: Check ownership and create the correct button ---
        const owned = isCourseOwned(course.id.toString());
        const buyBoxHtml = owned 
            ? `<a href="course-player.html?id=${course.id}" class="btn-primary">Go to Course</a>
               <p class="owned-text">You have access to this course.</p>`
            : `<p class="buy-box-price">$${course.price}</p>
               <a href="#" id="buy-now-btn" class="btn-primary">Buy Now</a>`;

        contentArea.innerHTML = `
            <div class="detail-layout">
                <div class="course-main-content">
                    <h1 class="course-title-main">${course.title}</h1>
                    <p class="course-subtitle-main">${course.subtitle}</p>
                    <div class="course-meta">
                        <span>By: <strong>${course.author}</strong></span>
                        <span>Last updated: <strong>${course.lastUpdated}</strong></span>
                        <span>⭐ <strong>${course.rating}</strong> Rating</span>
                    </div>
                    <div class="curriculum-section">
                        <h3>What you'll learn</h3>
                        <ul class="curriculum-list">${curriculumHtml}</ul>
                    </div>
                </div>
                <div class="course-sidebar">
                    <div class="buy-box">
                        <div class="buy-box-thumbnail">
                            <img src="${course.thumbnail}" alt="${course.title}">
                        </div>
                        <div class="buy-box-content" id="buy-box-content">
                            ${buyBoxHtml}
                        </div>
                    </div>
                </div>
            </div>`;
        
        // --- NEW: Add event listener if the "Buy Now" button exists ---
        if (!owned) {
            document.getElementById('buy-now-btn').addEventListener('click', (e) => {
                e.preventDefault();
                handlePurchase(course);
            });
        }
    }

    /**
     * Handles the purchase simulation and updates the UI instantly.
     * @param {object} course - The course being purchased.
     */
    function handlePurchase(course) {
        purchaseCourse(course.id.toString());
        alert(`Congratulations! You've successfully enrolled in "${course.title}".`);

        // Update the buy box content without reloading the page
        const buyBoxContent = document.getElementById('buy-box-content');
        buyBoxContent.innerHTML = `
            <a href="course-player.html?id=${course.id}" class="btn-primary">Go to Course</a>
            <p class="owned-text">You have access to this course.</p>
        `;
    }

    async function init() {
        const courseId = getCourseIdFromURL();
        if (courseId) {
            const course = await fetchCourseDetails(courseId);
            displayCourseDetails(course);
        } else {
            displayCourseDetails(null);
        }
    }
    
    init();
});