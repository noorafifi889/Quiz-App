# Technical Requirements

<hr> 

1. Create 3 Classes:

   * Question class: Holds question details (id, text, choice, correctAnswer) and includes a validation method for checking the answer.

   * Quiz class: Maintains an array of questions, allows adding questions, and includes a reset() method to restart the quiz.

   * Storage class: Handles storing answers in localStorage and includes methods getList(), saveList(), and clear().

2. Create Questions:

    Instantiate 10 Question objects and store them in the quiz.

3.  Render Questions:

    Display all questions using DOM manipulation.

    Use forEach to handle each question and connect it with localStorage.

4. Multiple Options:

    Each question should show multiple-choice or true/false options using radio buttons.

5. Answer Persistence:

    When the page is refreshed, previously selected answers should remain visible and stored in the browser.

6. Buttons with  Events:

    Include two buttons with specific actions: Submit and Reset.

7. Submit Button:

    On click, check all answers using forEach.

    Display the score and pass/fail status.

    Highlight correct answers in green and incorrect answers in red.
 8. Reset Button:

    On click, set all answers to null.

    Call the reset() method from the Quiz class to restart the quiz.
