const readline = require('readline');
const bcrypt = require('bcryptjs');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Simple function to get input without masking
function getInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

async function main() {
  try {
    const password = await getInput("Enter password: ");

    console.log(`\nYou entered: ${password}`);

    // Check password strength
    const feedback = validatePassword(password);
    if (feedback.isStrong) {
      console.log("✅ Password is strong!");
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(`Hashed password: ${hashedPassword}`);
    } else {
      console.log("❌ Password is not strong. Reasons:\n" + feedback.reasons.join("\n"));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close readline after usage
    rl.close();
  }
}

function validatePassword(password) {
  const feedback = {
    isStrong: true,
    reasons: [],
  };

  // Password length check
  if (password.length < 8) {
    feedback.isStrong = false;
    feedback.reasons.push("- Less than 8 characters");
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.isStrong = false;
    feedback.reasons.push("- Missing lowercase letter");
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.isStrong = false;
    feedback.reasons.push("- Missing uppercase letter");
  }

  // Digit check
  if (!/[0-9]/.test(password)) {
    feedback.isStrong = false;
    feedback.reasons.push("- Missing digit");
  }

  // Special character check
  if (!/[!@#$%^&*()\-\+]/.test(password)) {
    feedback.isStrong = false;
    feedback.reasons.push("- Missing special character (!@#$%^&*()-+)");
  }

  // Common password check
  const commonPasswords = ["123456", "password", "123456789", "12345678", "qwerty"];
  if (commonPasswords.includes(password)) {
    feedback.isStrong = false;
    feedback.reasons.push("- Password is too common");
  }

  return feedback;
}

// Run the program
main();