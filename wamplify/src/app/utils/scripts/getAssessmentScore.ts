export default function getAssessmentScore(score : string) : number{
    let split = score.split('/')
    if (split.length == 2) {
        let a = parseInt(split[0])
        let b = parseInt(split[1])
        return (a/b)*100
    }
    split = score.split('%')
    let a = parseInt(split[0])
    return a;
}