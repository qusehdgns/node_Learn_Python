const { Study } = require('./models/Study')
const { Quiz } = require('./models/Quiz')

// Mongo DB 연결
const db = require("./db");

const XLSX = require('xlsx');

async function saveStudy() {
    const studyfile = XLSX.readFile(__dirname + '/./files/study.xlsx');

    const studySheet = studyfile.SheetNames[0];          // @details 첫번째 시트 정보 추출

    const study = studyfile.Sheets[studySheet];

    const studies = XLSX.utils.sheet_to_json(study, { defval: "" });

    for await (let study of studies) {
        if (study.meterial === '' && study.code === '') {
            delete study.meterial;
            delete study.code;
        }

        let study_record = new Study(study);

        await study_record.save();
    }
}

async function saveQuiz() {
    const quizfile = XLSX.readFile(__dirname + '/./files/quiz.xlsx');

    const quizSheet = quizfile.SheetNames[0];          // @details 첫번째 시트 정보 추출

    const quiz = quizfile.Sheets[quizSheet];

    const quizs = XLSX.utils.sheet_to_json(quiz, { defval: "" });

    for await (let quiz of quizs) {

        await Study.findOne({ chapter: quiz.chapter, index: quiz.index }, { _id: 1 })
            .then(async result => {
                quiz.study_id = result._id

                if(quiz.input === ''){
                    delete quiz.input;
                }

                let quiz_record = new Quiz(quiz);

                await quiz_record.save();
            });
    }
}

async function saveData() {
    await saveStudy();
    await saveQuiz();

    console.log('DB 저장 완료');
}

saveData();