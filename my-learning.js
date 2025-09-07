document.addEventListener('DOMContentLoaded', () => {
    const allCoursesData = { '1': { id: 1, title: 'The Complete 2024 Web Development Bootcamp', subtitle: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!', author: 'Dr. Angela Yu', price: 19.99, rating: 4.8, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg', lastUpdated: '08/2023', curriculum: ['Introduction to Web Dev', 'HTML 5 Deep Dive', 'Advanced CSS and Sass', 'JavaScript for Beginners', 'The Document Object Model (DOM)', 'Advanced JavaScript', 'React + Redux', 'Node.js and Express', 'APIs and REST', 'Databases and MongoDB'] }, '2': { id: 2, title: 'JavaScript: The Advanced Concepts', subtitle: 'Learn modern advanced JavaScript practices and be in the top 10% of JavaScript developers.', author: 'Andrei Neagoie', price: 24.99, rating: 4.7, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg', lastUpdated: '11/2023', curriculum: ['JavaScript Engine and Runtime', 'Advanced Functions', 'Closures and Scope', 'Asynchronous JavaScript', 'Promises and Async/Await', 'Modules in JavaScript', 'Error Handling'] }, '3': { id: 3, title: 'React - The Complete Guide (incl Hooks, React Router)', subtitle: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!', author: 'Maximilian Schwarzmüller', price: 29.99, rating: 4.9, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg', lastUpdated: '12/2023', curriculum: ['Introduction to React', 'Components & Props', 'State and Lifecycle', 'Handling Events', 'Conditional Rendering', 'React Hooks (useState, useEffect)', 'React Router', 'Introduction to Redux'] }, '4': { id: 4, title: 'Modern CSS with Flexbox, Grid and Animations', subtitle: 'Learn and master modern CSS, including Flexbox, CSS Grid, responsive design, and so much more.', author: 'Jonas Schmedtmann', price: 14.99, rating: 4.7, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1026604_790b_2.jpg', lastUpdated: '06/2023', curriculum: ['CSS Fundamentals', 'Box Model Deep Dive', 'Responsive Design Principles', 'Mastering Flexbox', 'Unlocking CSS Grid', 'Cool CSS Animations & Transitions', 'Building a Real-World Project'] }, '5': { id: 5, title: 'Node.js, Express, MongoDB & More', subtitle: 'Master Node by building a real-world RESTful API and web app (with authentication, Node.js security, payments & more).', author: 'Jonas Schmedtmann', price: 29.99, rating: 4.8, thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg', lastUpdated: '10/2023', curriculum: ['Introduction to Node.js', 'NPM and Modules', 'Asynchronous Node.js', 'Building a RESTful API with Express', 'Connecting to MongoDB', 'Authentication & Security', 'Server-Side Rendering'] }, '6': { id: 6, title: 'The Ultimate Guide to Digital Marketing', subtitle: 'Master Digital Marketing: SEO, Social Media Marketing, Advertising, Email Marketing, and more!', author: 'Phil Ebiner', price: 19.99, rating: 4.6, thumbnail: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg', lastUpdated: '09/2023', curriculum: ['Marketing Fundamentals', 'Search Engine Optimization (SEO)', 'Social Media Strategy', 'Facebook & Instagram Ads', 'Google Ads (PPC)', 'Email Marketing Automation', 'Analyzing Your Results'] } };

    // --- NEW: Gets progress data from localStorage ---
    function getProgressData() {
        return JSON.parse(localStorage.getItem('courseProgress')) || {};
    }
    
    function getOwnedCourseIds() {
        return JSON.parse(localStorage.getItem('ownedCourses')) || [];
    }
    
    function displayOwnedCourses() {
        const ownedIds = getOwnedCourseIds();
        const progressData = getProgressData();
        const grid = document.getElementById('my-courses-grid');
        grid.innerHTML = ''; 

        if (ownedIds.length === 0) {
            grid.innerHTML = `<p>You haven't enrolled in any courses yet. <a href="index.html#courses">Explore courses</a>!</p>`;
            return;
        }

        ownedIds.forEach(id => {
            const course = allCoursesData[id];
            if (course) {
                // --- NEW: Calculate real progress ---
                const completedLessons = progressData[id] || [];
                const totalLessons = course.curriculum.length;
                const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

                const cardLink = document.createElement('a');
                cardLink.className = 'course-card-link';
                cardLink.href = `course-player.html?id=${course.id}`;

                cardLink.innerHTML = `
                    <div class="course-card">
                        <div class="course-thumbnail">
                            <img src="${course.thumbnail}" alt="${course.title}">
                        </div>
                        <div class="course-content">
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-author">By ${course.author}</p>
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                            </div>
                            <small style="color: var(--text-secondary); margin-top: 5px; display: block;">${progress}% Complete</small>
                        </div>
                    </div>
                `;
                grid.appendChild(cardLink);
            }
        });
    }

    displayOwnedCourses();
});