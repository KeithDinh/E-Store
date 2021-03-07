const validators = (password) => {
  // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  // var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  var result = [];
  var regexLowercase = /^(?=.*[a-z]).+$/;
  var regexUppercase = /^(?=.*[A-Z]).+$/;
  var regexSpecialChar = /^(?=.*?[#?!@$%^&*-]).+$/; //(?=.*?[#?!@$%^&*-])
  var regexDigit = /^(?=.*?[0-9]).+$/;
  // Length
  if (password.length < 6) {
    result.push("Password must be at least 6 characters!");
  }
  // lowercase
  if (!regexLowercase.test(password)) {
    result.push("Password must contain at least 1 lowercase letter!");
  }
  // uppercase
  if (!regexUppercase.test(password)) {
    result.push("Password must contain at least 1 uppercase letter!");
  }
  // digit
  if (!regexDigit.test(password)) {
    result.push("Password must contain at least 1 digit!");
  }
  // special character
  if (!regexSpecialChar.test(password)) {
    result.push("Password must contain a special character!");
  }
  return result;
};

const errorDiv = (errors) => (
  <ul className="list-unstyled text-danger">
    {errors?.map((e, index) => (
      <li key={index}>{e}</li>
    ))}
  </ul>
);
export { validators, errorDiv };
