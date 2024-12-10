// تخزين البيانات باستخدام localStorage
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const studentClass = document.getElementById('class').value;
    const average = document.getElementById('average').value;

    // تخزين البيانات في localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, studentClass, average });
    localStorage.setItem('students', JSON.stringify(students));

    // إعادة تحميل قائمة الطلاب
    displayStudents();
});

// البحث عن طالب
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchName = document.getElementById('searchName').value.toLowerCase();
    const students = JSON.parse(localStorage.getItem('students')) || [];

    const foundStudent = students.find(student => student.name.toLowerCase() === searchName);

    if (foundStudent) {
        alert(`Found Student: ${foundStudent.name}, Class: ${foundStudent.studentClass}, Average: ${foundStudent.average}`);
    } else {
        alert('Student not found');
    }
});

// عرض قائمة الطلاب
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name} (Class: ${student.studentClass}, Average: ${student.average})`;
        studentList.appendChild(li);
    });
}

// عرض الطلاب عند تحميل الصفحة
displayStudents();
