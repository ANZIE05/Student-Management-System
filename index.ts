#! /usr/bin/env node

import inquirer from "inquirer";

class student {
 id: string;
 name: string;
 coursesEnrolled: string[];
 feeAmount: number;

 constructor(id: string, name: string, coursesEnrolled: string[], feeAmount: number){
    this.id = id
    this.name = name
    this.coursesEnrolled = coursesEnrolled
    this.feeAmount = feeAmount
 }
}

let baseId = 10000
let studentId: string = "";
let continueEnrolment = true;

let students: student[] = []


do{
    let action = await inquirer.prompt({
        type: 'list',
        name: 'ans',
        message: 'Please select one option:\n',
        choices: ['Enroll a student', 'Show student status']
    })
       if(action.ans === 'Enroll a student'){
let studentName = await inquirer.prompt({
    type: "input",
    name: "ans",
    message: "Please Enter your name:"
})

let trimedStudentName = (studentName.ans).trim().toLowerCase()
let studentNameCheck = students.map(obj => obj.name)

if(studentNameCheck.includes(trimedStudentName) === false ){
    if(trimedStudentName !== ""){
        baseId++
        studentId = "STID" + baseId
    
        console.log("\n\tYour acount has been created");
        console.log(`Welcome, ${trimedStudentName}!`);

        let course = await inquirer.prompt({
            type: "list",
            name: "ans",
            message: "Please select a course",
            choices: ["English", "Math", "Urdu"]
        })

        let courseFee = 0;
        switch(course.ans) {
            case "English":
            courseFee = 9000;
            break;

            case "Math":
            courseFee = 7000;
            break;

            case "Uru":
            courseFee = 5000;
            break;
        }

        let courseConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do you want to enroll in this course"
        })

        if(courseConfirm.ans === true){
            let Student = new student(studentId, trimedStudentName, [course.ans], courseFee) 
       
            students.push(Student)

            console.log("You have enrolled in this course");
        }

      }else{
        console.log("Invalid Name");
      }
   }else{
    console.log("This name has taken by another person");
   }

 }
else if(action.ans === "Show student status"){
    if(students.length !== 0){
        let studentNamesCheck = students.map(e => e.name)

            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select a name",
                choices: studentNamesCheck
        })

        let foundStudent = students.find(person => person.name === selectedStudent.ans)
   
       console.log("Student Information");
       console.log(foundStudent);
       console.log("\n");
    
    }else{
        console.log("Record is empty");
    }
}

let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?"
})

if(userConfirm.ans === false){
    continueEnrolment = false
}
}while(continueEnrolment)