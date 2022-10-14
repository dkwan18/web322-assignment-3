const fs = require('fs');
const { deepStrictEqual } = require('assert');

exports.students = [];
exports.programs = [];

exports.initialize = function() {
    return new Promise(function(resolve, reject) {
            fs.readFile('./data/students.json', 'utf8', (err, data) => {
                if (err) {
                    reject("Unable to read file");
                }
                exports.students = JSON.parse(data);
            });

            fs.readFile('./data/programs.json', 'utf8', (err, data) => {
                if (err) {
                    reject("Unable to read file");
                }
                exports.programs = JSON.parse(data);
            })
            resolve("The operation was a success");
    });
}

exports.getAllStudents = function() {
    return new Promise(function(resolve, reject) {
        if (exports.students.length == 0) {
            module.exports.initialize();
        }
        if (exports.students.length == 0) {
            reject("No results returned.");
        }
        resolve(exports.students);
    })
}

exports.getInternationalStudents = function() {
    let intlstudents = [];
    return new Promise(function(resolve, reject) {
        exports.initialize();
        for (let a = 0; a < exports.students.length; a++) {
            if (exports.students[a].isisInternationalStudent == true) {
                intlstudents.push(exports.students[a]);
            }
        }
        if(intlstudents.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(intlstudents);
        }
    })
}

exports.getPrograms = function() {
    return new Promise(function(resolve, reject) {
        exports.initialize();
        if(exports.programs.length == 0) {
            reject("There are no results.");
        }
        resolve(exports.programs);
    })
}
//P3 step3
exports.addStudent = function(studentData) {
    return new Promise(function (resolve, reject) {
        if(exports.students == undefined) {
            exports.initialize();
        }
        if(studentData === undefined) {
            reject("There are no results.");
        }
        if(studentData.isInternationalStudent == undefined) {
            studentData.isInternationalStudent = false;
        }
        studentData.studentNum = exports.students.length + 1;
        module.exports.students.push(studentData);
        resolve();
    })
}
//P5
exports.getStudentByStatus = function(status) {
    return new Promise(function (resolve, reject) {
        let stuStatus = [];
        for (let a = 0; a < exports.students.length; a++) {
            if (JSON.stringify(exports.students[a].status) == status) {
                stuStatus.push(exports.students[a]);
            }
        }
        if (stuStatus.length == 0) {
            reject("There are no results.");
        }
        resolve(stuStatus);
    })
}

exports.getStudentByProgram = function(program) {
    return new Promise(function (resolve, reject) {
        let stuDep = [];
        for (let a = 0; a < exports.students.length; a++) {
            if(exports.students[a].program == program) {
                stuDep.push(exports.students[a]);
            }
        }
        if (stuDep.length == 0) {
            reject("There are no results.");
        }
        resolve(stuDep);
    })
}


exports.getStudentsByExpectedCredential = function(expectedCredential) {
    return new Promise(function (resolve, reject) {
        let credential = [];
        for (let a = 0; a < exports.students.length; a++) {
            if(exports.students[a].expectedCredential == credential) {
                programCode.push(exports.students[a]);
            }
        }
        if (expectedCredential.length == 0) {
            reject("There are no results.");
        }
        resolve(credential);
    })
}

exports.getStudentById = function(number) {
    return new Promise(function (resolve, reject) {
        let stuId;
        for (let a = 0; a < exports.students.length; a++) {
            if(exports.students[a].studentNum == number) {
                stuId = exports.students[a];
            }
        }
        if (stuId.length == 0) {
            reject("There are no results.");
        }
        resolve(stuId);
    })
}

exports.updateStudent = function(student) {
    return new Promise(function (resolve, reject) {
        let temp;
        console.log(student);
        for(let a = 0; a < exports.students.length; a++) {
            if(exports.students[a].studentNum == student.studentNum) {
                console.log(exports.students[a]);;
                exports.students[a] = student;
                console.log(exports.students[a]);
            }
        }
        resolve();
    })
}