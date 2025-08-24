// const inputData = [];

let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector("#closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#up");
const downBtn = document.querySelector("#down");
// Whole form
const form = document.querySelector("form");

// Input fields
const imageUrl = document.querySelector("#imageUrl");
const fullName = document.querySelector("#fullName");
const homeTown = document.querySelector("#homeTown");
const purpose = document.querySelector("#purpose");

// Category radio group
const categories = document.querySelectorAll("input[name='category']");

// Individual category radios
const emergency = document.querySelector("#emergency");
const important = document.querySelector("#important");
const urgent = document.querySelector("#urgent");
const norush = document.querySelector("#norush");

// Buttons
const createBtn = document.querySelector(".create");
const closeBtn = document.querySelector("#closeForm");


//Code starts here
addNote.addEventListener("click", () => {
    formContainer.style.display = "block";
});
closeForm.addEventListener("click", () => {
    formContainer.style.display = "none";
})

function saveToLocalStorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let selected = false;

    categories.forEach((cat) => {
        if (cat.checked) {
            selected = cat.value;
        }
    })
    const imgUrl = imageUrl.value.trim();
    const fName = fullName.value.trim();
    const hmwTown = homeTown.value.trim();
    const prps = purpose.value.trim();

    if (imgUrl === "") {
        alert("Please enter Image Url");
        return;
    }
    if (fName === "") {
        alert("Please enter Your Name");
        return;
    }
    if (hmwTown === "") {
        alert("Please enter Home Town");
        return;
    }
    if (prps.length < 4 || prps.length > 25) {
        alert("Please enter Purpose");
        return;
    }

    // check radio group
    if (!selected) {
        alert("Please select Categories")
    }

    saveToLocalStorage({
        imgUrl,
        fName,
        hmwTown,
        prps,
        selected,
    });
    form.reset();
    formContainer.style.display = "none";
    showCards();
});

function showCards() {
    stack.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (allTasks.length === 0) {
        // Default fallback card
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="profile-img"><img src="https://via.placeholder.com/50" alt="Default"></div>
            <h2>Guest User</h2>
            <div class="info">
                <p><span>Home Town:</span> Unknown</p>
                <p><span>Bookings:</span> None</p>
            </div>
            <div class="buttons">
                <button class="call">&#128222; Call</button>
                <button class="message">Message</button>
            </div>
        `;
        stack.appendChild(card);
    } else {
        allTasks.forEach(function (task) {
        // Create main card container
        let card = document.createElement("div");
        card.classList.add("card");

        // Profile image wrapper
        let profileImg = document.createElement("div");
        profileImg.classList.add("profile-img");

        let img = document.createElement("img");
        img.src = task.imgUrl;
        img.alt = task.fName;

        // Append img inside profile wrapper
        profileImg.appendChild(img);

        // Name heading
        let h2 = document.createElement("h2");
        h2.textContent = task.fName;

        // Info div
        let info = document.createElement("div");
        info.classList.add("info");

        let p1 = document.createElement("p");
        p1.innerHTML = `<span>Home Town:</span>   ${task.hmwTown}`;

        let p2 = document.createElement("p");
        p2.innerHTML = `<span>Purpose:</span> ${task.prps}`;

        // Append paragraphs to info
        info.appendChild(p1);
        info.appendChild(p2);

        // Buttons container
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");

        let callBtn = document.createElement("button");
        callBtn.classList.add("call");
        callBtn.innerHTML = "&#128222; Call";

        let msgBtn = document.createElement("button");
        msgBtn.classList.add("message");
        msgBtn.textContent = "Message";

        // Append buttons
        buttons.appendChild(callBtn);
        buttons.appendChild(msgBtn);

        // Put everything inside card
        card.appendChild(profileImg);
        card.appendChild(h2);
        card.appendChild(info);
        card.appendChild(buttons);

        // Finally append card to body (or some container)
        document.querySelector(".stack").appendChild(card);

    })
    }
}
showCards();

function updateStack() {
    const cards = document.querySelectorAll(".stack .card");
    for(let i = 0; i<3; i++){
        card.style.zIndex = 3 - i;
        card.style.transform = `translateY(${i * 10}px) scale(${1 - (i * 0.02)})`;
        card.style.opacity = `${1 - (i * 0.02)}`;
    }
}

upBtn.addEventListener("click", function () {
    let lastChild = stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild)
    }
    updateStack();
});
downBtn.addEventListener("click", function () {
    let firstChild = stack.firstElementChild;
    if (firstChild) {
        stack.appendChild(firstChild);
    }
    updateStack();
});
