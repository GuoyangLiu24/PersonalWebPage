function submitData() {
    const input = document.getElementById("userInput").value;
    const color = document.querySelector('input[name="color"]:checked').value;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute("id", color)
    li.appendChild(document.createTextNode(input));
    ul.appendChild(li)
    if (document.getElementById("list").childElementCount === 5) {
        document.getElementById("message").innerHTML = 'Thank you!'
    } 
    document.getElementById("userInput").value = ''
}