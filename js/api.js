// Frontend demo data source. Data is kept in JavaScript (no JSON files / backend).
const AppData = {
  courses: [
    { id: 1, title: "Java Programming", category: "Programming", instructor: "Ananya Sharma", duration: "8 weeks", lessons: 24, progress: 72, status: "In progress", icon: "☕", theme: "purple", description: "Build a strong foundation in Java, object-oriented programming and problem solving." },
    { id: 2, title: "Cyber Security Fundamentals", category: "Security", instructor: "Rahul Mehta", duration: "6 weeks", lessons: 18, progress: 48, status: "In progress", icon: "🛡️", theme: "green", description: "Understand core security concepts, threats, risk and practical defensive techniques." },
    { id: 3, title: "Frontend Web Development", category: "Development", instructor: "Neha Kapoor", duration: "10 weeks", lessons: 30, progress: 100, status: "Completed", icon: "💻", theme: "orange", description: "Learn HTML, CSS and JavaScript to create responsive and interactive websites." },
    { id: 4, title: "Data Structures & Algorithms", category: "Programming", instructor: "Aarav Verma", duration: "9 weeks", lessons: 27, progress: 35, status: "In progress", icon: "🧩", theme: "dark", description: "Practice essential data structures, algorithms and problem-solving patterns." },
    { id: 5, title: "Database Management", category: "Database", instructor: "Ishita Rao", duration: "5 weeks", lessons: 15, progress: 100, status: "Completed", icon: "🗄️", theme: "green", description: "Explore relational databases, SQL queries and database design fundamentals." },
    { id: 6, title: "Cloud Computing Essentials", category: "Cloud", instructor: "Kabir Singh", duration: "7 weeks", lessons: 21, progress: 20, status: "In progress", icon: "☁️", theme: "purple", description: "Understand cloud service models, deployment models and cloud fundamentals." }
  ],
  assignments: [
    { id: 101, title: "Java OOP Practice", courseId: 1, dueDate: "2026-12-02", status: "Pending", score: null, feedback: "" },
    { id: 102, title: "Network Security Report", courseId: 2, dueDate: "2026-12-05", status: "Pending", score: null, feedback: "" },
    { id: 103, title: "Responsive Portfolio Page", courseId: 3, dueDate: "2026-11-18", status: "Graded", score: 92, feedback: "Excellent layout and responsive implementation." },
    { id: 104, title: "Linked List Implementation", courseId: 4, dueDate: "2026-12-08", status: "Pending", score: null, feedback: "" },
    { id: 105, title: "SQL Query Worksheet", courseId: 5, dueDate: "2026-11-20", status: "Graded", score: 86, feedback: "Good work. Review joins once more." },
    { id: 106, title: "Cloud Service Comparison", courseId: 6, dueDate: "2026-12-12", status: "Submitted", score: null, feedback: "" }
  ],
  notifications: [
    { id: 1, title: "New assignment added", message: "Java OOP Practice has been added to your assignments.", time: "Today", read: false },
    { id: 2, title: "Your grade is available", message: "Your Responsive Portfolio Page has been graded.", time: "Yesterday", read: false },
    { id: 3, title: "Course progress reminder", message: "Continue your Cyber Security Fundamentals course.", time: "2 days ago", read: true }
  ]
};

function getCourses() { return AppData.courses; }
function getAssignments() {
  const saved = Storage.get(STORAGE_KEYS.assignments, null);
  return saved || AppData.assignments;
}
function saveAssignments(items) { Storage.set(STORAGE_KEYS.assignments, items); }
function getNotifications() {
  return Storage.get(STORAGE_KEYS.notifications, AppData.notifications);
}
function saveNotifications(items) { Storage.set(STORAGE_KEYS.notifications, items); }
function getCourseById(id) { return getCourses().find(course => course.id === Number(id)); }
function getCourseName(id) { return getCourseById(id)?.title || "General"; }
function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
