export class ValidationService {
  static passwordForbiddenCharactersValidator(control) {
    const charArray: any[] = control.value.split('');
    if (
      charArray.includes('i') ||
      charArray.includes('O') ||
      charArray.includes('I')
    ) {
      return { invalidCharacters: true };
    } else {
      return null;
    }
  }

  static passwordTwoNonOverlapingPairsValidator(control) {
    if (/(.)\1.*(.)\2/.test(control.value)) {
      return null;
    } else {
      return { overlapingPairs: true };
    }
  }

  static passwordIncreasingThreeLettersValidator(control) {
    const charArray = control.value.split('');
    for (let i = 0; i < charArray.length - 2; i++) {
      if (
        ((charArray[i].charCodeAt(0) >= 65 &&
          charArray[i].charCodeAt(0) <= 90) ||
          (charArray[i].charCodeAt(0) >= 97 &&
            charArray[i].charCodeAt(0) <= 122)) &&
        charArray[i].charCodeAt(0) + 2 === charArray[i + 1].charCodeAt(0) + 1 &&
        charArray[i].charCodeAt(0) + 2 === charArray[i + 2].charCodeAt(0)
      ) {
        return null;
      }
    }
    return { invalidIncreasingLetters: true };
  }
}
