const data = [
    {
        id: 1,
        link: "./assets/images/bg1.jpg",
    },
    {
        id: 2,
        link: "./assets/images/bg2.jpg",
    },
    {
        id: 3,
        link: "./assets/images/bg3.jpg",
    },
    {
        id: 4,
        link: "./assets/images/bg4.jpeg",
    },
    {
        id: 5,
        link: "./assets/images/bg5.jpg",
    },
    {
        id: 6,
        link: "./assets/images/bg6.png",
    },
    {
        id: 7,
        link: "./assets/images/bg7.jpg",
    },
    {
        id: 8,
        link: "./assets/images/bg8.png",
    },
];

const slider = document.querySelector(".list-img");
const nextButton = document.querySelector("#next button");
const previousButton = document.querySelector("#previous button");
const listRadioButton = document.querySelector(".list-radio-button");
let position = 0;
let lengthData = data.length;
let distance = 100 / lengthData;

const listImg = function (list) {
    const data = list.map((item) => {
        return `
            <li><img src="${item.link}"/></li>
        `;
    });
    return data.join();
};

const handleChoose = function (listNode) {
    listNode.forEach((item) => {
        item.addEventListener("click", (e) => {
            let pos = item.getAttribute("id");
            slider.style.transform = `translateX(-${distance * pos}%)`;
            position = -(distance * pos);
        });
    });
};

const handleSetActiveButton = function (listNode) {
    // Set Default
    listNode[0].setAttribute("class", "active");
    // Set Active
    listNode.forEach((item) => {
        item.addEventListener("click", (e) => {
            listNode.forEach((child) => {
                child.classList.remove("active");
            });
            item.classList.add("active");
        });
    });
};
const handleActiveWhenClickNextBtn = function (listNode) {
    let address = 0;
    for (let i = 0; i < listNode.length; i++) {
        if (listNode[i].getAttribute("class").includes("active")) {
            address = i;
            break;
        }
    }
    listNode.forEach((item) => {
        item.classList.remove("active");
    });
    if (address >= listNode.length - 1) {
        address = 0;
    }
    listNode[address + 1].setAttribute("class", "active");
};
const handleActiveWhenClickPreviousBtn = function (listNode) {
    let address = 0;
    for (let i = 0; i < listNode.length; i++) {
        if (listNode[i].getAttribute("class").includes("active")) {
            address = i;
            break;
        }
    }
    listNode.forEach((item) => {
        item.classList.remove("active");
    });
    if (address <= 0) {
        address = listNode.length - 1;
    }
    listNode[address - 1].setAttribute("class", "active");
};

const renderRadioButton = function (len) {
    let id = 0;
    for (let i = 0; i < len; i++) {
        const li = document.createElement("li");
        li.setAttribute("id", id);
        listRadioButton.appendChild(li);
        id = id + 1;
    }
    const listButton = document.querySelectorAll(".list-radio-button li");
    handleChoose(listButton);
    handleSetActiveButton(listButton);
};
renderRadioButton(lengthData);

slider.innerHTML = listImg(data);
nextButton.addEventListener("click", (e) => {
    if (position > -(100 - distance)) {
        position = position - distance;
    } else {
        position = 0;
    }
    slider.style.transform = `translateX(${position}%)`;
    const listButton = document.querySelectorAll(".list-radio-button li");
    handleActiveWhenClickNextBtn(listButton);
});
previousButton.addEventListener("click", (e) => {
    if (position < 0) {
        position = position + distance;
    } else {
        position = -(100 - distance);
    }
    slider.style.transform = `translateX(${position}%)`;
    const listButton = document.querySelectorAll(".list-radio-button li");
    handleActiveWhenClickPreviousBtn(listButton);
});
