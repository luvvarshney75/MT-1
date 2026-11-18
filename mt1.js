
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Initial three courses
let courses = [
    {
        id: 1,
        courseName: "Data Structures",
        courseCode: "CSE201",
        department: "CSE-DS-A"
    },
    {
        id: 2,
        courseName: "FSD Workshop-1",
        courseCode: "CSE202",
        department: "CSE-DS-A"
    },
    {
        id: 3,
        courseName: "Operating Systems",
        courseCode: "CSE203",
        department: "CSE-DS-A"
    }
];


// READ
app.get("/courses", (req, res) => {
    res.json(courses);
});


// CREATE
app.post("/courses", (req, res) => {
    const { courseName, courseCode, department } = req.body;

    const newCourse = {
        id: Date.now(),
        courseName,
        courseCode,
        department
    };

    courses.push(newCourse);

    res.status(201).json({
        message: "Course created successfully",
        data: newCourse
    });
});



// UPDATE
app.put("/courses/:id", (req, res) => {
    const id = Number(req.params.id);

    const course = courses.find(item => item.id === id);

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    const { courseName, courseCode, department } = req.body;

    course.courseName = courseName;
    course.courseCode = courseCode;
    course.department = department;

    res.json({
        message: "Course updated successfully",
        data: course
    });
});

// DELETE
app.delete("/courses/:id", (req, res) => {

    const id = Number(req.params.id);

    courses = courses.filter((course) => course.id !== id);

    res.json({
        message: "Course deleted successfully"
    });

});

// SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
