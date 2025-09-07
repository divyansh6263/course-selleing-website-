document.addEventListener('DOMContentLoaded', () => {
    // --- Data and State ---
    const allCoursesData = {
        '1': {
            id: 1,
            title: 'The Complete 2024 Web Development Bootcamp',
            author: 'Dr. Angela Yu',
            sections: [
                {
                    title: "Section 1: Introduction",
                    lessons: [
                        { title: "Welcome to the Course", duration: "2:30" },
                        { title: "Course Files and Setup", duration: "5:15" },
                        { title: "How to Get Help", duration: "3:01" },
                    ]
                },
                {
                    title: "Section 2: HTML 5 Deep Dive",
                    lessons: [
                        { title: "The Structure of a Web Page", duration: "10:05" },
                        { title: "Text and List Elements", duration: "15:45" },
                        { title: "Image and Link Tags", duration: "12:10" },
                    ]
                },
                {
                    title: "Section 3: Advanced CSS",
                    lessons: [
                        { title: "Introduction to Flexbox", duration: "25:11" },
                        { title: "Mastering CSS Grid", duration: "35:50" },
                    ]
                }
            ]
        },
    };

    let currentCourse = null;
    let currentLesson = { sectionIndex: 0, lessonIndex: 0 };
    let completedLessons = []; // Will store strings like "s0-l1" for Section 0, Lesson 1

    // --- Helper Functions (LocalStorage, etc.) ---
    function getProgressForCourse(courseId) {
        const allProgress = JSON.parse(localStorage.getItem('courseProgress')) || {};
        return allProgress[courseId] || [];
    }

    function saveProgressForCourse(courseId, completedArray) {
        const allProgress = JSON.parse(localStorage.getItem('courseProgress')) || {};
        allProgress[courseId] = completedArray;
        localStorage.setItem('courseProgress', JSON.stringify(allProgress));
    }

    // --- UI Building and Rendering ---
    function buildPlayerUI() {
        if (!currentCourse) {
            document.getElementById('player-container').innerHTML = `<h2>Access Denied</h2>`;
            return;
        }

        const playerContainer = document.getElementById('player-container');
        playerContainer.innerHTML = `
            <header class="player-header">
                <a href="my-learning.html" class="back-link"><i class="fas fa-arrow-left"></i> Back to Dashboard</a>
                <div class="course-title-header">${currentCourse.title}</div>
                <div class="player-header-controls">
                    <button id="theater-btn" title="Theater Mode"><i class="fas fa-compress-alt"></i></button>
                    <button id="fullscreen-btn" title="Fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            </header>
            <div class="player-body">
                <main class="player-main">
                    <div class="player-video" id="video-placeholder"></div>
                    <div class="player-lesson-info">
                        <h2 class="player-title" id="lesson-title"></h2>
                        <div class="player-nav-buttons">
                            <button id="prev-btn"><i class="fas fa-chevron-left"></i> Prev</button>
                            <button id="complete-btn">Mark as Complete</button>
                            <button id="next-btn">Next <i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </main>
                <aside class="player-sidebar" id="player-sidebar"></aside>
            </div>
        `;
        buildSidebar();
        renderLesson();
        setupEventListeners();
    }

    function buildSidebar() {
        const sidebar = document.getElementById('player-sidebar');
        let html = '';
        currentCourse.sections.forEach((section, sIndex) => {
            html += `<h3 class="sidebar-section-title">${section.title}</h3>`;
            html += `<ul class="player-curriculum-list">`;
            section.lessons.forEach((lesson, lIndex) => {
                const lessonId = `s${sIndex}-l${lIndex}`;
                const isCompleted = completedLessons.includes(lessonId);
                html += `
                    <li class="player-curriculum-item ${isCompleted ? 'completed' : ''}" data-section="${sIndex}" data-lesson="${lIndex}">
                        <i class="lesson-icon fas ${isCompleted ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                        <span class="lesson-title">${lesson.title}</span>
                        <span class="lesson-duration">${lesson.duration}</span>
                    </li>
                `;
            });
            html += `</ul>`;
        });
        sidebar.innerHTML = html;
    }
    
    function renderLesson() {
        const lesson = currentCourse.sections[currentLesson.sectionIndex].lessons[currentLesson.lessonIndex];
        const lessonId = `s${currentLesson.sectionIndex}-l${currentLesson.lessonIndex}`;

        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('video-placeholder').textContent = `(Video: ${lesson.title})`;
        
        // Update active lesson in sidebar
        document.querySelectorAll('.player-curriculum-item.active').forEach(el => el.classList.remove('active'));
        document.querySelector(`[data-section="${currentLesson.sectionIndex}"][data-lesson="${currentLesson.lessonIndex}"]`).classList.add('active');

        // Update button states
        const isCompleted = completedLessons.includes(lessonId);
        const completeBtn = document.getElementById('complete-btn');
        completeBtn.disabled = isCompleted;
        completeBtn.innerHTML = isCompleted ? '<i class="fas fa-check"></i> Completed' : 'Mark as Complete';
        document.getElementById('prev-btn').disabled = (currentLesson.sectionIndex === 0 && currentLesson.lessonIndex === 0);
        
        const lastSectionIndex = currentCourse.sections.length - 1;
        const lastLessonIndex = currentCourse.sections[lastSectionIndex].lessons.length - 1;
        document.getElementById('next-btn').disabled = (currentLesson.sectionIndex === lastSectionIndex && currentLesson.lessonIndex === lastLessonIndex);
    }

    // --- Event Handlers ---
    function setupEventListeners() {
        document.getElementById('player-sidebar').addEventListener('click', e => {
            const item = e.target.closest('.player-curriculum-item');
            if (item) {
                currentLesson.sectionIndex = parseInt(item.dataset.section);
                currentLesson.lessonIndex = parseInt(item.dataset.lesson);
                renderLesson();
            }
        });

        document.getElementById('complete-btn').addEventListener('click', () => {
            const lessonId = `s${currentLesson.sectionIndex}-l${currentLesson.lessonIndex}`;
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                saveProgressForCourse(currentCourse.id, completedLessons);
                // Visually update the sidebar item without a full rebuild
                const item = document.querySelector(`[data-section="${currentLesson.sectionIndex}"][data-lesson="${currentLesson.lessonIndex}"]`);
                item.classList.add('completed');
                item.querySelector('.lesson-icon').className = 'lesson-icon fas fa-check-circle';
                renderLesson(); // Re-render to update button state
            }
        });
        
        document.getElementById('next-btn').addEventListener('click', () => {
             if (currentLesson.lessonIndex < currentCourse.sections[currentLesson.sectionIndex].lessons.length - 1) {
                currentLesson.lessonIndex++;
            } else if (currentLesson.sectionIndex < currentCourse.sections.length - 1) {
                currentLesson.sectionIndex++;
                currentLesson.lessonIndex = 0;
            }
            renderLesson();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentLesson.lessonIndex > 0) {
                currentLesson.lessonIndex--;
            } else if (currentLesson.sectionIndex > 0) {
                currentLesson.sectionIndex--;
                currentLesson.lessonIndex = currentCourse.sections[currentLesson.sectionIndex].lessons.length - 1;
            }
            renderLesson();
        });

        document.getElementById('theater-btn').addEventListener('click', () => {
            document.getElementById('player-container').classList.toggle('theater-mode');
        });

        document.getElementById('fullscreen-btn').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }

    // --- Initialization ---
    function init() {
        const courseId = new URLSearchParams(window.location.search).get('id');
        const ownedCourses = JSON.parse(localStorage.getItem('ownedCourses')) || [];
        
        if (courseId && ownedCourses.includes(courseId) && allCoursesData[courseId]) {
            currentCourse = allCoursesData[courseId];
            completedLessons = getProgressForCourse(courseId);
            buildPlayerUI();
        } else {
            document.getElementById('player-container').innerHTML = `<h2>Error: Course not found or not owned.</h2>`;
        }
    }

    init();
});