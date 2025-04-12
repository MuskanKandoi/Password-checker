#include <iostream>
#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool strongPasswordCheckerII(string p) {
        if (p.length() < 8) return false;

        bool low = false, upper = false, digit = false, special = false;
        string specialChars = "!@#$%^&*()-+";

        for (char c : p) {
            if (islower(c)) low = true;
            else if (isupper(c)) upper = true;
            else if (isdigit(c)) digit = true;
            else if (specialChars.find(c) != string::npos) special = true;
        }

        for (int i = 0; i + 1 < p.length(); i++) {
            if (p[i] == p[i + 1]) return false;
        }

        return low && upper && digit && special;
    }
};

int main() {
    Solution sol;
    string testPassword;

    while (true) {
        cout << "Enter a password to check (or type 'exit' to quit): ";
        cin >> testPassword;

        if (testPassword == "exit") break;

        if (sol.strongPasswordCheckerII(testPassword)) {
            cout << "✅ Password is strong!" << endl;
        } else {
            cout << "❌ Password is not strong. Try again!" << endl;
        }

        cout << endl;
    }

    cout << "Exited password checker. Bye!" << endl;
    return 0;
}
