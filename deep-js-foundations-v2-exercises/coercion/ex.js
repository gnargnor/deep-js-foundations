// TODO: write the validation functions
function isValidName(name) {
  console.log("--------")
  if (typeof name == "string") {
    return name.trim().length > 2;
  }
  if (!name) {
    return false;
  }
}

function hoursAttended(attended, length) {
  console.log("-------");
  console.log("Type of attended:", typeof attended);
  console.log("Type of length:", typeof length);

  if (
    typeof attended != "string" || typeof attended != "number"
    || typeof length != "string" || typeof length != "number"
    ) {
      return false;
  }

  if (typeof attended == "string" || typeof length == "string") {
    attended = Number(attended);
    length = Number(length);
  }

  if (
    typeof attended == "number" && typeof length == "number" &&
    attended >= 0 && length >= 0
    && Number.isInteger(attended) && Number.isInteger(length)) {
      return attended <= length
  } 


  return false;
}




// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
