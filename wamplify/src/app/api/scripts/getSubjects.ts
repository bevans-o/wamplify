import * as fs from 'fs';

interface Subject {
    code: string,
    name: string,
}

function getSubjects() {
    const filePath = './scripts/subjectLists'
    let subjectMap = new Map<string, Subject>();
    let data;

    let files = fs.readdirSync(filePath)

        
    files.forEach(file => {
        let contents = fs.readFileSync(filePath + '/' + file, 'utf8')
        const subjects : Array<Subject> = JSON.parse(contents)
        for (let i = 0; i < subjects.length; i++) {
            subjectMap.set(subjects[i]["code"], { code: subjects[i]["code"], name: subjects[i]["name"]})
        }
    })
    

    data = JSON.stringify(Array.from(subjectMap.values()))
    
    fs.writeFile('Subjects_2023.json', data, function(err) {
        if (err) throw err;
        console.log('complete');
        console.log(subjectMap.size);
        }
    );

}


getSubjects()



