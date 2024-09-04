function generateRandomPassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = " ";
  for (let i = 0; i < 12; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

// Function to handle password reset request
function handleForgotPassword(event) {
  event.preventDefault();

  const emailOrPhone = document.querySelector('input[type="text"]').value;
  const messageElement = document.createElement("p");
  const passwordGeneratorDiv = document.createElement("div");

  const lastRequestTime = localStorage.getItem("lastPasswordResetRequest");
  const currentTime = new Date().getTime();
  const oneDayInMillis = 24 * 60 * 60 * 1000;

  if (lastRequestTime && currentTime - lastRequestTime < oneDayInMillis) {
    messageElement.textContent =
      " You can only request a password reset once per day.";
  } else {
    localStorage.setItem("lastPasswordResetRequest", currentTime.toString());
    messageElement.textContent =
      "Password reset link sent to your email/phone.";

    // Display password generator
    passwordGeneratorDiv.innerHTML = `
      <h3>Generate New Password</h3>
      <button id="generatePasswordBtn">Generate Password</button>
      <p id="generatedPassword"></p>
    `;
    document.body.appendChild(passwordGeneratorDiv);

    // Attach event listener to generate password button
    document
      .getElementById("generatePasswordBtn")
      .addEventListener("click", handleGeneratePassword);
  }

  // Display message
  document.querySelector(".Forgot").appendChild(messageElement);
}

// Function to generate and display a new password
function handleGeneratePassword() {
  const generatedPassword = generateRandomPassword();
  document.getElementById(
    "generatedPassword"
  ).textContent = `Your new password: ${generatedPassword}`;
}

// Attach event listener to form submission
document
  .querySelector(".Password")
  .addEventListener("submit", handleForgotPassword);
