const socket = io("http://localhost:8000/")
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Enter your login name : ')
socket.on('you-joined',data=>{
    appendMessage(`${data.name}:${data.message}`)
})

socket.emit('new-user',name)

socket.on('send-Message',data=>{
    appendMessage(`${data.name}:${data.message}`)
})

socket.on('user-connected',name=>{
    appendMessage(`${name}:connected`)
})

socket.on('disconnected',()=>{
    appendMessage(`${name}:disconnected`)
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`you: ${message}`)
    socket.emit('send-chatMessage',message)
    messageInput.value = ""
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}