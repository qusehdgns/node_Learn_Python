const { User } = require('./models/User')
const { Study } = require('./models/Study')
const { Quiz } = require('./models/Quiz')
const { Compiler } = require('./models/Compiler')
const { Wiki } = require('./models/Wiki')
const { Solve } = require('./models/Solve')
const { QandA } = require('./models/QandA')
const { QandAReply } = require('./models/QandAReply')

let user_data = { email: "test@test.com", passward: "test123", name: "test", phone: "010-0000-0000" }

let user = new User(user_data)

user.save((err, user) => {
    console.log(user)

    let compiler_data = {user_id: user._id, code: "testing"}

    let compiler = new Compiler(compiler_data)

    compiler.save((err, compiler) => console.log(compiler))

    let study_data = { chapter: 1, index: 1, base_material: "testing" }

    let study = new Study(study_data)

    study.save((err, study) => {
        console.log(study)

        let wiki_data = {study_id: study._id, user_id: user._id, tag: 0, explanation: "testing"}

        let wiki = new Wiki(wiki_data)

        wiki.save((err, wiki) => console.log(wiki))

        let quiz_data = { study_id: study._id, quiz: "testing" }

        let quiz = new Quiz(quiz_data)

        quiz.save((err, quiz) => {
            console.log(quiz)

            let solve_data = {quiz_id: quiz._id, user_id: user._id, answer: "testing"}

            let solve = new Solve(solve_data)

            solve.save((err, solve) => console.log(solve))

            let qanda_data = {user_id: user._id, title: "testing", value: "tesing", quiz_id: quiz._id}

            let qanda = new QandA(qanda_data)

            qanda.save((err, qanda) => {
                console.log(qanda)

                let qandareply_data = {qanda_id: qanda._id, user_id: user._id, reply: "testing"}

                let qandareply = new QandAReply(qandareply_data)

                qandareply.save((err, qandareply) => console.log(qandareply))
            })
        })
    })
})
