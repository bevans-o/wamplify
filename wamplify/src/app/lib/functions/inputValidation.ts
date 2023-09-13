export function isValidScoreOutOf(score : string) {
    let slashSplit = score.split('/');
    if (slashSplit.length == 2) {
      let a = parseInt(slashSplit[0]);
      let b = parseInt(slashSplit[1]);
      if (isNaN(a) || isNaN(b)) {
        return false
      }
      if (a > b) {
        return false
      }
      return true
    } 
    return false;
}

export function isValidScorePercentage(score : string) {
    let percentageSplit = score.split('%');
    if (percentageSplit.length > 2) {
      return false;
    }
    if (percentageSplit.length == 2) {
      if (percentageSplit[1] != '') {
        return false
      }
      let a = parseInt(percentageSplit[0])
      if (isNaN(a)) {
        return false
      }
      if (a > 100 || a < 0) {
        return false
      }
      return true;
    }
    return false;
}

export function isValidScore(score : string) {
    let a = parseInt(score);
    if (isNaN(a) || a > 100 || a < 0) {
      return false;
    }
    return true;
}