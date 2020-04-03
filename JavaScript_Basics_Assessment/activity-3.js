

let students = ['Mary', 'Adam', 'Kevin'];
for (let i = 0; i < 3; i++){
    const input = prompt('enter name');
    students.push(input);
}
for (let i = 0; i < 6; i++) {
    console.log(students[i]);
}
