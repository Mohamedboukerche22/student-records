document.addEventListener("DOMContentLoaded", function () {
    const studentList = document.getElementById("studentList");
    const searchForm = document.getElementById("searchForm");

    // عرض كل الطلاب عند تحميل الصفحة
    fetch("/get_students")
        .then(response => response.json())
        .then(students => {
            studentList.innerHTML = "";
            students.forEach(student => {
                const li = document.createElement("li");
                li.textContent = `Name: ${student.name} | Class: ${student.class} | Average: ${student.average}`;
                studentList.appendChild(li);
            });
        });

    // البحث عن طالب
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("searchName").value;

            fetch("/search_student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `search=${encodeURIComponent(name)}`
            })
            .then(response => response.json())
            .then(results => {
                studentList.innerHTML = "";
                if (results.length === 0) {
                    studentList.innerHTML = "<li>No student found.</li>";
                } else {
                    results.forEach(student => {
                        const li = document.createElement("li");
                        li.textContent = `Name: ${student.name} | Class: ${student.class} | Average: ${student.average}`;
                        studentList.appendChild(li);
                    });
                }
            });
        });
    }
});
