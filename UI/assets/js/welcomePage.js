var chatMessages = [];

function processInput() {

    var userInput = document.getElementById('large-input').value; // Getting the value



    var outputResult = "You typed: " + userInput;  // Perform some processing



    document.getElementById('output-box').value = outputResult;// show the result in the output-box



    addToChatHistory(outputResult); // update the the message to the history



    document.getElementById('large-input').value = "";// Clear the large-input

}
//-------------------------------------------------------------------

function clearInputAndOutput() { // Clear both the large-input and output-box textareas

    document.getElementById('large-input').value = "";
    document.getElementById('output-box').value = "";
}

function addToChatHistory(message) {

    chatMessages.push(message); //         update the the message to the history


    if (chatMessages.length > 3) {  // only the last three messages
        chatMessages.shift(); // Remove the oldest message
    }


    updateChatHistory();   // Update the chat
}
//----------------------------------------------------------------------

function clearChatHistory() {

    chatMessages = [];   // Clear the chat messages array


    updateChatHistory();
}
//-----------------------------------------------------------------

function updateChatHistory() {

    var chatHistoryContainer = document.getElementById('chat-history');  // Get the chat history container


    chatHistoryContainer.innerHTML = "<h2>Chat History</h2>";  // Clear existing messages


    for (var i = Math.max(chatMessages.length - 3, 0); i < chatMessages.length; i++) {// Add the latest three messages
        var chatHistoryDiv = document.createElement('div');
        chatHistoryDiv.textContent = chatMessages[i];
        chatHistoryContainer.appendChild(chatHistoryDiv);
    }
}