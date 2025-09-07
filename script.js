document.addEventListener('DOMContentLoaded', () => {

    // Initialize Animate on Scroll library
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
    });

    // --- MOCK BACKEND API ---
    // In a real application, this data would come from your server.
    const mockCourses = [
        {
            id: 1,
            title: 'The Complete 2024 Web Development Bootcamp',
            author: 'Dr. Angela Yu',
            price: 19.99,
            rating: 4.8,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg'
        },
        {
            id: 2,
            title: 'JavaScript: The Advanced Concepts',
            author: 'Andrei Neagoie',
            price: 24.99,
            rating: 4.7,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg'
        },
        {
            id: 3,
            title: 'React - The Complete Guide (incl Hooks, React Router)',
            author: 'Maximilian Schwarzmüller',
            price: 29.99,
            rating: 4.9,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
        },
         {
            id: 4,
            title: 'Modern CSS with Flexbox, Grid and Animations',
            author: 'Jonas Schmedtmann',
            price: 14.99,
            rating: 4.7,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1026604_790b_2.jpg'
        },
        {
            id: 5,
            title: 'Node.js, Express, MongoDB & More',
            author: 'Jonas Schmedtmann',
            price: 29.99,
            rating: 4.8,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg'
        },
        {
            id: 6,
            title: 'The Ultimate Guide to Digital Marketing',
            author: 'Phil Ebiner',
            price: 19.99,
            rating: 4.6,
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg'
        }
    ];

    /**
     * THIS IS WHERE YOU CONNECT TO YOUR BACKEND
     * 
     * This function simulates fetching data from an API.
     * To connect to a real backend, you would replace the inside of this function
     * with a `fetch` call to your API endpoint.
     */
    async function fetchCourses() {
        console.log('Fetching courses...');
        // Simulate a network delay
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Courses fetched!');
                resolve(mockCourses);
            }, 1500); // 1.5 second delay to show the loader
        });

        /* 
        // --- REAL BACKEND EXAMPLE ---
        try {
            const response = await fetch('https://your-api.com/api/courses');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            return []; // Return empty array on error
        }
        */
    }

    /**
     * Renders the course data into the DOM.
     * @param {Array} courses - An array of course objects.
     */
    function displayCourses(courses) {
        const courseGrid = document.getElementById('course-grid');
        
        // Clear the loader
        courseGrid.innerHTML = ''; 

        if (courses.length === 0) {
            courseGrid.innerHTML = '<p>No courses found.</p>';
            return;
        }

        // --- UPDATED SECTION START ---
        // We now create an anchor (<a>) tag for each card to make it clickable.
        courses.forEach((course, index) => {
            const cardLink = document.createElement('a');
            cardLink.className = 'course-card-link'; // Added for styling
            cardLink.href = `course-detail.html?id=${course.id}`; // Links to detail page with course ID
        cardLink.setAttribute('data-aos','fade-up');
        cardLink.setAttribute('data-aos-delay','index*100');
            // The entire card structure is now the inner HTML of the anchor tag.
            // The animation attributes are on the visual div, not the link itself.
            cardLink.innerHTML = `
                <div class="course-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="course-thumbnail">
                        <img src="${course.thumbnail}" alt="${course.title}">
                    </div>
                    <div class="course-content">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-author">By ${course.author}</p>
                        <div class="course-footer">
                            <span class="course-price">$${course.price}</span>
                            <span class="course-rating">⭐ ${course.rating}</span>
                        </div>
                    </div>
                </div>
            `;
            courseGrid.appendChild(cardLink);
        });
        // --- UPDATED SECTION END ---
    }

    // --- Initial Load ---
    async function init() {
        const courses = await fetchCourses();
        displayCourses(courses);
    }

    init();
});