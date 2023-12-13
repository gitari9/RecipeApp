// create and fetch all
import express from "express";
import studentModel from "../models/studentModel.js";

router.get('/student', (req, res) => {
    let student = [
        {
            firstName: 'Velma',
            lastName: 'damyan',
            grade: 'B+',
            dob: 16/5/2002
        },
        {
            firstName: 'Vivian',
            lastName: 'damyan',
            grade: 'A+',
            dob: 12/12/2004
        },
        {
            firstName: 'Veronica',
            lastName: 'damyan',
            grade: 'C-',
            dob: 21/1/2000
        },
        {
            firstName: 'Victoria',
            lastName: 'damyan',
            grade: 'B-',
            dob: 18/9/2007
        },
        {
            firstName: 'Victor',
            lastName: 'damyan',
            grade: 'D-',
            dob: 20/8/2011
        }
    ];

    res.send ({
        count: '5',
        student: student,
        grade: grade,
        dob: dob
    })
})

export default router;